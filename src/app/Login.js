import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import './login.css';

function Login() {
  const navigate = useNavigate();


  const [isLogin, setIsLogin] = useState(true);

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/login',loginFormData)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Felicidades',
          text: response.data.message
        });
        sessionStorage.setItem('token',response.data.token);
        sessionStorage.setItem('username',response.data.username);
        navigate('/chat');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      });

  }

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/register',registerFormData)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Felicidades',
          text: response.data.message
        });
        handleSwitchAuthMode();
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      });
  
  }

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSwitchAuthMode = () => {
    setIsLogin(prevState => !prevState);
  }

  return (
    <div className='container'>
      <div className='screen'>
        <h2 className='my-title'>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
        {isLogin ? (
          <form className='my-form'>
            <label>
              <input type="email" name="email" value={loginFormData.email} onChange={handleLoginChange} placeholder='Correo electrónico' className='my-input' />
            </label>
            <label style={{marginBottom: "30px"}}>
              <input type="password" name="password" value={loginFormData.password} onChange={handleLoginChange} placeholder='Contraseña' className='my-input'/>
            </label>
            <button type="submit" className='my-button' onClick={handleLoginSubmit}>Iniciar sesión</button>
            <button type="button" className='my-button' onClick={handleSwitchAuthMode}>Registrarse</button>
          </form>
        ) : (
          <form className='my-form'>
            <label>
              <input type="text" name="username" value={registerFormData.name} onChange={handleRegisterChange} placeholder='Nombre de usuario' className='my-input'/>
            </label>
            <label>
              <input type="email" name="email" value={registerFormData.email} onChange={handleRegisterChange} placeholder='Correo electrónico' className='my-input' />
            </label>
            <label>
              <input type="password" name="password" value={registerFormData.password} onChange={handleRegisterChange} placeholder='Contraseña' className='my-input'/>
            </label>
            <label style={{marginBottom: "30px"}}>
              <input type="password" name="passwordConfirmation" value={registerFormData.confirmPassword} onChange={handleRegisterChange} placeholder='Confirmar contraseña' className='my-input'/>
            </label>
            <button type="submit" className='my-button' onClick={handleRegisterSubmit}>Registrarse</button>
            <button type="button" className='my-button' onClick={handleSwitchAuthMode}>Iniciar sesión</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
