const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const util = require('util');
const db = require('../db.js');
const fs = require('fs');
const path = require('node:path');

const query = util.promisify(db.query).bind(db);
const privateKey = fs.readFileSync(path.join(__dirname, '../../' + process.env.JWT_PRIVATE_KEY));

// Register
router.post('/register', async(req, res) => {
    const{email, username, password, passwordConfirmation} = req.body;

    if(!email || !username || !password || !passwordConfirmation)
        return res.status(400).json({status:false,message: 'Datos faltantes.'});
    
        // Validar datos del formulario
    if(!validator.isEmail(email))
        return res.status(400).json({status:false,message: 'El email es inválido.'});
    if(!validator.isLength(password, {min: 6}))
        return res.status(400).json({status:false,message: 'La contraseña debe contener al menos 6 caracteres.'});
    if(password != passwordConfirmation)
        return res.status(400).json({status:false,message: 'Las contraseñas no coinciden.'})


    try{
        // Validar con base de datos
        const existingUser = await query('SELECT * FROM user WHERE email = ?', [email]);
        if(existingUser.length > 0)
            return res.status(409).json({status:false,message: 'Ya existe un usuario con este email.'});

        const existingUsername = await query('SELECT * FROM user WHERE username = ?', [username]);
        if (existingUsername.length > 0) 
            return res.status(409).json({status:false,message: 'Ya existe un usuario con este nombre de usuario.' });

        // Cifrado de contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Inserción en BD
        await query('INSERT INTO user SET ?', {email, username, password: passwordHash});

        // Token de autenticación
        const token = jwt.sign({email, username}, privateKey, {expiresIn: '30d', algorithm: 'RS256'});
        console.log(token);
        res.json({status: true,message: 'Usuario registrado exitosamente.', token});

    }catch(error){
        console.error("Error 500 Register.");
        res.status(500).json({message: 'Error al registrar el usuario.'});
    }


});

// Ruta raíz
router.get('/',(req,res) => {
    res.send("API");
})

module.exports = router;