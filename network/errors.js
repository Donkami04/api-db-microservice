const response = require('./response');

//This function will define all will happen when an error apears.

function errors(err, req, res, next) {
    console.error('error', err)

    const message = err.message || 'Intern Error';
    const status = err.statusCode || 500;  

    response.error(req, res, message, status);

};

module.exports = errors;