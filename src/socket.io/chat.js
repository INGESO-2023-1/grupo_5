const db = require('../db.js');
const io = require('socket.io')(3000, {
    cors: {
        origin: ["http://localhost:5000"],
    }
});
const jwt = require('jsonwebtoken');
const util = require('util');
const fs = require('fs');
const path = require('node:path');

const query = util.promisify(db.query).bind(db);
const privateKey = fs.readFileSync(path.join(__dirname, '../../' + process.env.JWT_PRIVATE_KEY));
const publicKey = fs.readFileSync(path.join(__dirname, '../../' + process.env.JWT_PUBLIC_KEY));

io.on('connection', socket => {
    console.log("Se conectó al socket");
    socket.on('send-message', (token, receiver_id, message, callback) => {
        if(!token) return;
        token = token.split(" ");
        if(token.length !== 2){
            callback({status: false,message: "Error de token."});
            return;
        }
        token = token[1];

        try{
            const decoded = jwt.verify(token, publicKey)
            db.query('INSERT INTO messages (sender_id, receiver_id, message_text) VALUES (?,?,?);', [decoded.id, receiver_id, message], (err, result) => {
                if(err){
                    callback({status: false,message:"Error al guardar el mensaje."});
                    return;
                }
                socket.to(`room-${Math.min(decoded.id, receiver_id)}-${Math.max(decoded.id, receiver_id)}`)
                    .emit(`receive-message`, {
                        message_id: result.insertId,
                        sender_id: decoded.id,
                        message: message
                    });
                callback({status: true,message: "Mensaje enviado con exito.",data:{
                    message_id: result.insertId,
                    sender_id: decoded.id,
                    message: message
                }});
            })
            
        }catch{
            callback({status: false,message: "Error de token. Intenta cerrar sesión."});
        }
    })

    socket.on('join-room', (token, receiver_id, callback) =>{
        if(!token) return;
        token = token.split(" ");
        if(token.length !== 2){
            callback({status: false,message: "Error de token."});
            return;
        }
        token = token[1];
        try{
            const decoded = jwt.verify(token, publicKey)
            socket.join(`room-${Math.min(decoded.id, receiver_id)}-${Math.max(decoded.id, receiver_id)}`);
            callback({status: true,message: "Entraste a la sala."});
        }catch{
            callback({status: false,message: "Error de token."});
        }
    })
})

