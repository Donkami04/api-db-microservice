const mysql = require('mysql');

const config = require('../config');

//getting the env variables from config file
const dbconf= {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let connection;

//Read the documentatio of mysql npm for get the functions

//This function create the connection with the remote DB, need host, user and password.

function handleCon() {
    connection = mysql.createConnection(dbconf);

    //If the conecction has some arror:
    connection.connect((err) => {
        if(err){
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!!');
        };
    });

    //if during the connection has an error:
    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        };
    });
};

handleCon();

//Performing queries:

//Get the users
function list(table) {
    return new Promise ((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

//Get One User:
function get(table, id) {
    return new Promise ((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

//Create new User:
function insert(table, data) {
    return new Promise ((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
};

function update(table, data) {
    return new Promise ((resolve, reject) => {
        connection.query(`UPDATE TABLE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
};

function query(table, query) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
};

function upsert (table, data) {
    if (data && data.id) {
        return update(table, data);
    } else {
        return insert (table, data)
    }
}
module.exports = { list, get, upsert, update, query, insert }