const express =  require('express');
const config =  require('./../config');
const user =  require('./components/user/user.routes');
const bodyParser =  require('body-parser');
const auth = require('./components/auth/login.routes');
const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());
//Router
app.use('/api/user', user);
app.use('/api/auth', auth);

app.use(errors);

app.listen(config.api.port, () => {
    console.log('Escuchando puerto', config.api.port)
})