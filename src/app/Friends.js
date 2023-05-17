import React, { useState } from 'react';
import './friends.css';

function Friends(){

    return (
        <div>
            <div class="header">
                <h1 class="title-friends">Hola Usuario</h1>
                <div class="header__actions">
                    <button class="button-friends">Cerrar Sesión</button>
                </div>
            </div>


            <form class="form-friends" action="#">
                <input type="text" placeholder="Buscar Usuario" class="my-input" />
                <button class="button-friends">Buscar</button>
            </form>

            <div class="user-list">
                <div class="title-list">Lista de Contactos</div>

                <div class="user-item">
                    <div class="foto-name">
                        <div>
                            <img src="https://picsum.photos/200/310" alt="" class="user-foto" />
                        </div>
                        <div class="user-item__name">Nombre</div>
                    </div>
                    <div class="user-item__actions">
                        <button class="button-friends">Eliminar</button>
                        <button class="button-friends">Bloquear</button>
                    </div>
                </div>

                <div class="user-item">
                    <div class="foto-name">
                        <div>
                            <img src="https://picsum.photos/200/311" alt="" class="user-foto" />
                        </div>
                        <div class="user-item__name">Nombre</div>
                    </div>
                    <div class="user-item__actions">
                        <button class="button-friends">Eliminar</button>
                        <button class="button-friends">Bloquear</button>
                    </div>
                </div>

                <div class="user-item">
                    <div class="foto-name">
                        <div>
                            <img src="https://picsum.photos/200/312" alt="" class="user-foto" />
                        </div>
                        <div class="user-item__name">Nombre</div>
                    </div>
                    <div class="user-item__actions">
                        <button class="button-friends">Eliminar</button>
                        <button class="button-friends">Bloquear</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Friends;