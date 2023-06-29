import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './friends.css';

function Friends(){
    const navigate = useNavigate();

    const [searchData,setSearchData] = useState({
        searchQuery: ''
    });

    const [resultData,setResultData] = useState({
        users: undefined
    });

    const [friends,setFriends] = useState(false);

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
        }).then((response) => {
            getFriends();
        });
    };

    const handleDeleteFriends = (followed) => {
        axios.delete(`/api/delete/${followed}`,{
            headers:{
                Authorization: sessionStorage.getItem('token')
            }
        }).then(response => {
            getFriends();
        });
    };

    const handleChatFriends = (followed) => {
        navigate(`/chat/${followed}`);
    };

    const getFriends = () => {
        axios.get('/api/followed',{
            headers:{
                Authorization: sessionStorage.getItem('token')
            }
        }).then(response => {
            setFriends(response.data.friends);
        });
    };

    useEffect(() => {
        if(friends === false) getFriends();
    },[friends]);

    return (
        <div>
            <form className="form-friends" onSubmit={handleSearchSubmit}>
                <input type="text" placeholder="Buscar Usuario" className="my-input" name="searchQuery" onChange={handleSearchChange} />
                <button className="button-friends">Buscar</button>
            </form>

            { resultData.users ? (
                <div className="user-list">
                    <div className="title-list">Resultados:</div>
                    {
                        resultData.users.map(dataUser => {
                            let flag = true;
                            friends.forEach(element => {if(element.id === dataUser.id) flag = false;})
                            if(!flag) return '';
                            return (
                                <div className="user-item" key={dataUser.key}>
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
                {
                    friends === false?'':(friends.map((row) => {

                        return (
                        <div className="user-item" key={row.id}>
                            <div className="foto-name">
                                <div>
                                    <img src="https://picsum.photos/200/310" alt="" className="user-foto" />
                                </div>
                                <div className="user-item__name">{row.username}</div>
                            </div>
                            <div className="user-item__actions">
                                <button className="button-friends" onClick={() => {handleChatFriends(row.id)}}>Chatear</button>
                                <button className="button-friends" onClick={() => {handleDeleteFriends(row.id)}}>Eliminar</button>
                            </div>
                        </div>
                        );
                    }))
                }
                
            </div>
        </div>
    )
}

export default Friends;