import React, { useState } from 'react';
import axios from 'axios';
import './chat.css';


function Chat() {

return (
    <div>
        <div className="header">
            <h1 className="title-friends">Hola {sessionStorage.getItem('username')}</h1>
            <div className="header__actions">
                <button className="button-friends">Cerrar Sesión</button>
            </div>
        </div>
        <div className="container-chat">
            <div class="header-chat">
                <div className="foto-name-chat">
                        <div>
                            <img src="https://picsum.photos/200/310" alt="" className="user-foto-chat" />
                        </div>
                    <div className="user-item__name-chat">Carlos Lagos</div>
                </div>
            </div>
            <div class="body-chat">
                <p class="message">Hola</p>
                <p class="message message-user">Hola, como estás?</p>
                <p class="message">Bien y tu ?</p>


                <p class="message message-user">Bien y tu ?</p>
                <p class="message">Bien y tu ?</p>
                <p class="message message-user">Bien y tu ?</p>
                <p class="message">Bien y tu ?</p>
                <p class="message message-user">Bien y tu ?</p>
                <p class="message">Bien y tu ?</p>
                <p class="message message-user">Bien y tu ?</p>
                <p class="message">Bien y tu ?</p>
                <p class="message message-user">Bien y tu ?</p>
                <p class="message">Bien y tu ?</p>
                <p class="message message-user">Bien y tu ?</p>
                <p class="message">Bien y tu ?</p>
                <p class="message message-user">Bien y tu ?</p>
                <p class="message">Bien y tu ?</p>
                <p class="message message-user">Bien y tu ?</p>
                <p class="message">Bien y tu ?</p>
                <p class="message message-user">Bien y tu ?</p>
                <p class="message">Bien y tu ?</p>
                <p class="message message-user">Bien y tu ?</p>
                <p class="message">Bien y tu ?</p>

            </div>
            <div class="footer-chat">
                <form>
                    <input type="text" class="input-chat" placeholder="Escribe un mensaje..."></input>
                    <button class="button">Enviar</button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default Chat;
