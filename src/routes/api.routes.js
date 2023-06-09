const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const util = require('util');
const db = require('../db.js');
const fs = require('fs');
const path = require('node:path');

const query = util.promisify(db.query).bind(db);
const privateKey = fs.readFileSync(path.join(__dirname, '../../' + process.env.JWT_PRIVATE_KEY));
const publicKey = fs.readFileSync(path.join(__dirname, '../../' + process.env.JWT_PUBLIC_KEY));

// Register
router.post('/register', async(req, res) => {
    const{email, username, password, passwordConfirmation} = req.body;

    if(!email || !username || !password || !passwordConfirmation)
        return res.status(400).json({status:false,message: 'Datos faltantes.'});
    
        // Validar datos del formulario
    if(!validator.isEmail(email))
        return res.status(400).json({status:false,message: 'El email es inválido.'});
    if(!validator.isLength(password, {min: 6}))
        return res.status(400).json({status:false,message: 'La contraseña debe contener al menos 6 caracteres.'});
    if(password != passwordConfirmation)
        return res.status(400).json({status:false,message: 'Las contraseñas no coinciden.'})


    try{
        // Validar con base de datos
        const existingUser = await query('SELECT * FROM user WHERE email = ?', [email]);
        if(existingUser.length > 0)
            return res.status(409).json({status:false,message: 'Ya existe un usuario con este email.'});

        const existingUsername = await query('SELECT * FROM user WHERE username = ?', [username]);
        if (existingUsername.length > 0) 
            return res.status(409).json({status:false,message: 'Ya existe un usuario con este nombre de usuario.' });

        // Cifrado de contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Inserción en BD
        await query('INSERT INTO user SET ?', {email, username, password: passwordHash});

        // Token de autenticación
        //const token = jwt.sign({email, username}, privateKey, {expiresIn: '30d', algorithm: 'RS256'});
       
        res.json({status: true,message: 'Usuario registrado exitosamente.'});

    }catch(error){
        console.error("Error 500 Register.");
        res.status(500).json({message: 'Error al registrar el usuario.'});
    }


});

// Login
router.post('/login', async(req, res) => {
    const{email, password} = req.body;

    if(!email || !password)
        return res.status(400).json({status:false,message: 'Datos faltantes.'});
        
    // Validar email y contraseña en BD
    const existingMail = await query('SELECT * FROM user WHERE email = ?', [email]);
    if(existingMail.length == 0)
        return res.status(409).json({status:false,message: 'Ese mail no está registrado a una cuenta.'});
    const validPassword = await bcrypt.compare(password,existingMail[0].password);
    if(validPassword === false)
        return res.status(400).json({status: false,message: 'Constraseña invalida.'});
    const token = jwt.sign({id: existingMail[0].id,email, username: existingMail[0].username}, privateKey, {expiresIn: '30d', algorithm: 'RS256'});
    return res.json({status: true,message: 'Usuario ingresó exitosamente.',username: existingMail[0].username,token: `Bearer ${token}`});
});

// Validación de Token
const tokenValidation = (req, res, next) => {
    if(!req.headers.authorization || req.headers.authorization.split(" ").length < 2)
        return res.status(401).json({status:false, message: 'Token inválido.' });

    const token = req.headers.authorization.split(" ")[1];

    if(!token)
        return res.status(401).json({status:false, message: 'Token no proporcionado.'});

    try{    
        const decoded = jwt.verify(token, publicKey)
        req.user = decoded;
        next();
    }catch(error){
        console.error(error);
        return res.status(401).json({status:false, message: 'Token inválido.' });
    }
}

// Buscador de usuarios
router.get('/users', tokenValidation, async(req, res) => {
    const user_id = req.user.id;
    const {searchQuery} = req.query;

    if(!searchQuery){
        return res.status(400).json({message: 'Falta parámetro de búsqueda.'})
    }

    try{
        const searchedUsers = await query('SELECT id,username FROM user WHERE username LIKE ? AND id != ?', [`%${searchQuery}%`,user_id]);
        res.json({status: true, users: searchedUsers});
    }catch(error){
        console.error(error);
        res.status(500).json({status:false, message: 'Error al realizar la búsqueda.'});
    }
});

// Agregar amigo
router.post('/follow',tokenValidation,(req, res) => {
    const follower = req.user.id;
    const {followed}  = req.body;
  
    // Insertar los valores en la tabla follow
    const query = 'INSERT INTO follow (follower, followed) VALUES (?, ?)';
    db.query(query, [follower, followed], (err, result) => {
      if (err) {
        console.error('Error al agregar amigo: ', err);
        res.status(500).send({status:false, message: 'Error al agregar amigo.'});
        return;
      }
  
      res.status(200).send({status: true, message: 'Amigo agregado correctamente.'});
    });
});

// Ruta para eliminar un seguido
router.delete('/delete/:followed',tokenValidation,(req, res) => {
    const follower = req.user.id;
    const followed  = req.params.followed;
    console.log(followed);
    // Eliminar el seguido de la tabla seguidos
    const query = 'DELETE FROM follow WHERE follower = ? AND followed = ?';
    db.query(query, [follower, followed], (err, result) => {
      if (err) {
        console.error('Error al eliminar amigo: ', err);
        res.status(500).send({status:false, message: 'Error al eliminar amigo'});
        return;
      }
  
      res.status(200).send({status:true, message: 'Amigo eliminado correctamente.'});
    });
});

// Ruta para obtener la lista de amigos
router.get('/followed', tokenValidation, (req, res) => {
    const follower = req.user.id;
  
    // Consultar la tabla de seguidos para obtener la lista de amigos
    const query = 'SELECT user.id,user.username FROM follow INNER JOIN user ON follow.followed = user.id WHERE follow.follower = ?';
    db.query(query, [follower], (err, results) => {
      if (err) {
        console.error('Error al obtener la lista de amigos: ', err);
        res.status(500).send({ status: false, message: 'Error al obtener la lista de amigos' });
        return;
      }
  
      const friends = results;
      console.log(friends);
      res.status(200).send({ status: true, friends });
    });
});

// Ruta para obtener los datos del perfil de usuario
router.get('/profile', tokenValidation, (req, res) => {
    const userId = req.user.id;
  
    // Obtener los datos del perfil del usuario desde la base de datos
    const query = 'SELECT username, email FROM user WHERE id = ?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error al obtener los datos del perfil: ', err);
        res.status(500).send({ status: false, message: 'Error al obtener los datos del perfil' });
        return;
      }
  
      if (result.length === 0) {
        res.status(404).send({ status: false, message: 'Usuario no encontrado' });
        return;
      }
  
      const userData = {
        username: req.user.username,
        name: result[0].name,
        email: result[0].email
      };
  
      res.status(200).send(userData);
    });
});
  
// Obtener historial de mensajes
router.get('/message/:chatterId',tokenValidation ,(req, res) => {
    const userId = req.user.id;
    const chatterId = req.params.chatterId;

    const query = "SELECT message_id, sender_id, message_text FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)";
    db.query(query, [userId, chatterId, chatterId, userId], (err, results) => {
        if (err) {
            console.error('Error al obtener historial de mensajes: ', err);
            res.status(500).send({ status: false, message: 'Error al obtener historial de mensajes' });
            return;
        }
    
        const message = results;
        console.log(message);
        res.status(200).send({ status: true, message });
    })
})


  
// Ruta raíz
router.get('/',(req,res) => {
    res.send("API");
})

module.exports = router;


// Eliminar mi propia cuenta
router.delete('/delete_my', tokenValidation, (req, res) => {
    const userId = req.user.id;

    // Eliminar la cuenta de usuario de la base de datos
    const query = 'DELETE FROM user WHERE id = ?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error al eliminar la cuenta de usuario: ', err);
        res.status(500).send({ status: false, message: 'Error al eliminar la cuenta de usuario' });
        return;
      }
      res.status(200).send({ status: true, message: 'Cuenta de usuario eliminada correctamente' });
    });
}
);
