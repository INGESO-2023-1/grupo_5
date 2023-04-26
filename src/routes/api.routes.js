const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const util = require('util');
const db = require('../db.js');
const uuid = require('uuid');

const query = util.promisify(db.query).bind(db);

// Register
router.post('/register', async(req, res) => {
    const{email, username, password, passwordConfirmation} = req.body;

    // Validar datos del formulario
    if(!validator.isEmail(email)){
        return res.status(400).json({message: 'El email es inválido.'});
    }
    if(!validator.isLength(password, {min: 6})){
        return res.status(400).json({message: 'La contraseña debe contener al menos 6 caracteres.'});
    }
    if(password != passwordConfirmation){
        return res.status(400).json({message: 'Las contraseñas no coinciden.'})
    }
    try{
        // Validar con base de datos
        const existingUser = await query('SELECT * FROM users WHERE email = ?', [email]);
        if(existingUser){
            return res.status(409).json({message: 'Ya existe un usuario con este email.'})
        }
        const existingUsername = await query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUsername.length > 0) {
            return res.status(409).json({message: 'Ya existe un usuario con este nombre de usuario.' });
        }

        // Cifrado de contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Generación ID de usuario
        const userId = uuid.v4();

        // Inserción en BD
        await query('INSERT INTO users SET ?', {userId, email, username, password: passwordHash});

        // Token de autenticación
        const token = jwt.sign({email, username}, 'charlesLakesEsUnPro', {expiresIn: '30d'});

        res.json({message: 'Usuario registrado exitosamente.', token});

    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error al registrar el usuario.'});
    }


});

// Ruta raíz
router.get('/',(req,res) => {
    res.send("API");
})

module.exports = router;