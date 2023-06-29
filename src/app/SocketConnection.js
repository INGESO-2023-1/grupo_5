import io from 'socket.io-client';


//socket.emit('send-message', message)

function SocketConnection(){
    let socket = null;
    
    this.connectChat = (token,receiver_id,callback) => {
        socket = io("http://localhost:3000");
        socket.emit("join-room",token,receiver_id,callback);
    };

    this.sendMsg = (token,receiver_id,message,callback) => {
        socket.emit("send-message", token,receiver_id,message,callback);
    };

    this.waitMsg = (callback) => {
        socket.on(`receive-message`,callback);
    };

}

export default SocketConnection;


