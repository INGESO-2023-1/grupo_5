import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './chat.css';
import SocketConnection from './SocketConnection';


const socket = new SocketConnection();

function Chat() {
    const token = sessionStorage.getItem('token');
    const {user} = useParams();
    const [userData,setUserData] = useState(null);
    const [inputData,setInputData] = useState("");
    const [messages, setMessages] = useState([]);


    const getFriends = (callback) => {
        axios.get('/api/followed',{
            headers:{
                Authorization: sessionStorage.getItem('token')
            }
        }).then(callback);
    };

    const downScroll = () => {
        let scroll = document.getElementById('body-chat');
        scroll.scrollTo(0,scroll.scrollHeight) 
    };

    const handleSendSubmit = (event) => {
        event.preventDefault();
        socket.sendMsg(token,user,inputData,(response) => {
            console.log(response);
            setMessages(prev => [...prev,response.data])
            setInputData("");
            downScroll();
        })
    };

    useEffect(() => {
        getFriends((response) => {
            let userDataResponse = response.data.friends.find(element => element.id == user);
            setUserData(userDataResponse);
        });
        axios.get(`/api/message/${user}`,{
            headers:{
                Authorization: sessionStorage.getItem('token')
            }
        }).then((response) => {
            let msg = [];
            for(const element of response.data.message){
                msg.push({
                    message_id: element.message_id,
                    sender_id: element.sender_id,
                    message: element.message_text
                })
            }
            setMessages(msg);
            downScroll();
        });
        socket.connectChat(token,user,(response) => {
            console.log(response);
        });
        socket.waitMsg((response) => {
            setMessages(prev => [...prev,response])
            downScroll();
        });
        
    },[]);
    useEffect(downScroll);


    const handleChangeInput = (event) => {
        const {value} = event.target;
        setInputData(value);
    };


    return (
        <div className="container-chat">
            <div className="header-chat">
                <div className="foto-name-chat">
                        <div>
                            <img src="https://picsum.photos/200/310" alt="" className="user-foto-chat" />
                        </div>
                    <div className="user-item__name-chat">{userData?userData.username:''}</div>
                </div>
            </div>
            <div className="body-chat" id="body-chat">
                {
                    messages.map((msg) => {
                        console.log(msg.sender_id,user);
                        if(msg.sender_id != user)
                            return <p className="message message-user" key={msg.message_id}>{msg.message}</p>
                        return <p className="message" key={msg.message_id}>{msg.message}</p>;
                    })
                }
            </div>
            <div className="footer-chat">
                <form className="chat" onSubmit={handleSendSubmit}>
                    <input type="text" className="input-chat" placeholder="Escribe un mensaje..." name="inputData" value={inputData} onChange={handleChangeInput}></input>
                    <button className="button">Enviar</button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
