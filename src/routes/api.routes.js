const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const util = require('util');
const db = require('../db.js');

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

    // Validar con base de datos
    const existingUser = await user.findOne({email});
    if(existingUser){
        return res.status(409).json({message: 'Ya existe un usuario con este email.'})
    }

});

// Ruta raíz
router.get('/',(req,res) => {
    res.send("API");
})

module.exports = router;