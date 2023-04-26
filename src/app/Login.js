import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
      {isLogin ? (
        <form>
          <label>
            Correo electrónico:
            <input type="email" name="email" value={loginFormData.email} onChange={handleLoginChange} />
          </label>
          <br />
          <label>
            Contraseña:
            <input type="password" name="password" value={loginFormData.password} onChange={handleLoginChange} />
          </label>
          <br />
          <button type="submit">Iniciar sesión</button>
          <br />
          <button type="button" onClick={handleSwitchAuthMode}>Registrarse</button>
        </form>
      ) : (
        <form>
          <label>
            Nombre:
            <input type="text" name="name" value={registerFormData.name} onChange={handleRegisterChange} />
          </label>
          <br />
          <label>
            Correo electrónico:
            <input type="email" name="email" value={registerFormData.email} onChange={handleRegisterChange} />
          </label>
          <br />
          <label>
            Contraseña:
            <input type="password" name="password" value={registerFormData.password} onChange={handleRegisterChange} />
          </label>
          <br />
          <label>
            Confirmar contraseña:
            <input type="password" name="confirmPassword" value={registerFormData.confirmPassword} onChange={handleRegisterChange} />
          </label>
          <br />
          <button type="submit">Registrarse</button>
          <br />
          <button type="button" onClick={handleSwitchAuthMode}>Iniciar sesión</button>
        </form>
      )}
    </div>
  );
}

export default Login;
