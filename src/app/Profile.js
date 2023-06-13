import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Obtener los datos del perfil del usuario al cargar el componente
    axios.get('/api/profile', {
      headers: {
        Authorization: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del perfil: ', error);
      });
  }, []);

  return (
    <div className="profile-container">
      {userData ? (
        <>
          <div className="profile-header">
            <h1 className="profile-title">Perfil de {userData.username}</h1>
            <div className="profile-actions">
              <button className="profile-button">Cerrar Sesión</button>
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-item">
              <div className="profile-item__label">Nombre:</div>
              <div className="profile-item__value">{userData.name}</div>
            </div>
            <div className="profile-item">
              <div className="profile-item__label">Correo Electrónico:</div>
              <div className="profile-item__value">{userData.email}</div>
            </div>
          </div>
        </>
      ) : (
        <div className="profile-loading">Cargando perfil...</div>
      )}
    </div>
  );
}

export default Profile;