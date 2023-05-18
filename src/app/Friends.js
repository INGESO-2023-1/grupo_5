import React, { useState } from 'react';
import axios from 'axios';
import './friends.css';

function Friends(){
    const [searchData,setSearchData] = useState({
        searchQuery: ''
    });

    const [resultData,setResultData] = useState({
        users: undefined
    });

    const handleSearchChange = (event) => {
        const {name,value} = event.target;
        setSearchData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        //console.log(searchData);
        axios.get(`/api/users?searchQuery=${searchData.searchQuery}`,{
            headers:{
                Authorization: sessionStorage.getItem('token')
            }
        }).then((response) => {
            setResultData({users: response.data.users});
        });

    };

    const handleAddFriends = (followed) => {
        axios.post('/api/follow',{followed},{
            headers:{
                Authorization: sessionStorage.getItem('token')
            }
        });
    };

    return (
        <div>
            <div className="header">
                <h1 className="title-friends">Hola {sessionStorage.getItem('username')}</h1>
                <div className="header__actions">
                    <button className="button-friends">Cerrar Sesión</button>
                </div>
            </div>


            <form className="form-friends" onSubmit={handleSearchSubmit}>
                <input type="text" placeholder="Buscar Usuario" className="my-input" name="searchQuery" onChange={handleSearchChange} />
                <button className="button-friends">Buscar</button>
            </form>

            { resultData.users ? (
                <div className="user-list">
                    <div className="title-list">Resultados:</div>
                    {
                        resultData.users.map(dataUser => {
                            return (
                                <div className="user-item">
                                    <div className="foto-name">
                                        <div>
                                            <img src="https://picsum.photos/200/310" alt="" className="user-foto" />
                                        </div>
                                        <div className="user-item__name">{dataUser.username}</div>
                                    </div>
                                    <div className="user-item__actions">
                                        <button className="button-friends" onClick={() => handleAddFriends(dataUser.id)}>Añadir</button>
                                        <button className="button-friends">Bloquear</button>
                                    </div>
                                </div>
                        )})
                    }
                    
                </div>
            ) :''}

            <div className="user-list">
                <div className="title-list">Lista de Contactos</div>

                <div className="user-item">
                    <div className="foto-name">
                        <div>
                            <img src="https://picsum.photos/200/310" alt="" className="user-foto" />
                        </div>
                        <div className="user-item__name">Nombre</div>
                    </div>
                    <div className="user-item__actions">
                        <button className="button-friends">Eliminar</button>
                        <button className="button-friends">Bloquear</button>
                    </div>
                </div>

                <div className="user-item">
                    <div className="foto-name">
                        <div>
                            <img src="https://picsum.photos/200/311" alt="" className="user-foto" />
                        </div>
                        <div className="user-item__name">Nombre</div>
                    </div>
                    <div className="user-item__actions">
                        <button className="button-friends">Eliminar</button>
                        <button className="button-friends">Bloquear</button>
                    </div>
                </div>

                <div className="user-item">
                    <div className="foto-name">
                        <div>
                            <img src="https://picsum.photos/200/312" alt="" className="user-foto" />
                        </div>
                        <div className="user-item__name">Nombre</div>
                    </div>
                    <div className="user-item__actions">
                        <button className="button-friends">Eliminar</button>
                        <button className="button-friends">Bloquear</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Friends;