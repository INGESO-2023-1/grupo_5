import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './chat.css';


function Chat() {

    const {user} = useParams();
    const [userData,setUserData] = useState(null);
    const [inputData,setInputData] = useState("");
    const [message, setMessage] = useState([
        {
            id: 1,
            type: 0,
            content: "Hola como estas"
        },{
            id: 2,
            type: 1,
            content: "bien y tu?"
        }
    ]);

    const getFriends = (callback) => {
        axios.get('/api/followed',{
            headers:{
                Authorization: sessionStorage.getItem('token')
            }
        }).then(callback);
    };

    useEffect(() => {
        getFriends((response) => {
            let userDataResponse = response.data.friends.find(element => element.id == user);
            setUserData(userDataResponse);
        });
    },[]);


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
            <div className="body-chat">
                {
                    message.map((msg) => {
                        if(msg.type)
                            return <p className="message" key={msg.id}>{msg.content}</p>;
                        return <p className="message message-user" key={msg.id}>{msg.content}</p>
                    })
                }
            </div>
            <div className="footer-chat">
                <form className="chat">
                    <input type="text" className="input-chat" placeholder="Escribe un mensaje..." name="inputData" value={inputData} onChange={handleChangeInput}></input>
                    <button className="button">Enviar</button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
