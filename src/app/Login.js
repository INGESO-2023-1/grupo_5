import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log(loginFormData);
    // Aquí podrías enviar los datos del formulario de inicio de sesión a tu servidor para procesar el inicio de sesión

  }

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    console.log(registerFormData);
    // Aquí podrías enviar los datos del formulario de registro a tu servidor para procesar el registro
  
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
            <br />
            <label>
              <input type="password" name="password" value={loginFormData.password} onChange={handleLoginChange} placeholder='Contraseña' className='my-input'/>
            </label>
            <br />
            <button type="submit" className='my-button'>Iniciar sesión</button>
            <br />
            <button type="button" className='my-button' onClick={handleSwitchAuthMode}>Registrarse</button>
          </form>
        ) : (
          <form className='my-form'>
            <label>
              <input type="text" name="name" value={registerFormData.name} onChange={handleRegisterChange} placeholder='Nombre de usuario' className='my-input'/>
            </label>
            <br />
            <label>
              <input type="email" name="email" value={registerFormData.email} onChange={handleRegisterChange} placeholder='Correo electrónico' className='my-input' />
            </label>
            <br />
            <label>
              <input type="password" name="password" value={registerFormData.password} onChange={handleRegisterChange} placeholder='Contraseña' className='my-input'/>
            </label>
            <br />
            <label>
              <input type="password" name="confirmPassword" value={registerFormData.confirmPassword} onChange={handleRegisterChange} placeholder='Confirmar contraseña' className='my-input'/>
            </label>
            <br />
            <button type="submit" className='my-button'>Registrarse</button>
            <br />
            <button type="button" className='my-button' onClick={handleSwitchAuthMode}>Iniciar sesión</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
