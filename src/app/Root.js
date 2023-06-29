import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import './root.css'

function Root(){
    const navigate = useNavigate();

    const handleClearData = () => {
        sessionStorage.clear();
        navigate('/');
    };

    if(!sessionStorage.getItem('token') || !sessionStorage.getItem('username'))
        return <div><Outlet /></div>;
    return(
        <div>
            <div className="header">
                <h1 className="title-friends">Hola {sessionStorage.getItem('username')}</h1>
                <div className="header__actions">
                    <button className="button-friends" onClick={() => navigate('/profile')}>Ver Perfil</button>
                    <button className="button-friends" onClick={() => navigate('/friends')}>Lista de amigos</button>
                    <button className="button-friends" onClick={() => handleClearData()}>Cerrar Sesión</button>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Root;