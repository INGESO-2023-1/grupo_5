const express = require('express');
const morgan = require('morgan');
const path = require('node:path');
const app = express();

// Configuraciones
app.set('port',process.env.PORT || 8000)

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api',require('./routes/api.routes.js'));

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// React
app.get('*', (req,res) => res.sendFile(path.join(__dirname+'/public/index.html')))

// Inicio server
app.listen(app.get('port'),()=>{
    console.log('Server on port 5000');
});