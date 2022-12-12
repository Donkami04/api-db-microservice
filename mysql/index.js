const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config')
const routerMySQL = require('./routes')
const app = express();

app.use(bodyParser.json());

//RUTAS
app.use('/', routerMySQL);


app.listen(config.mysqlService.port, () => {
    console.log('Mysql service on Port ', config.mysqlService.port)
});