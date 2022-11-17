// const fetch = require('node-fetch');
const request = require('request')

function createRemoteDB(host, port) {
    const URL = `http://${host}:${port}`;

    async function list(table) {
        const response = await fetch(`${URL}/${table}`);
        const data = await response.json();
        return data;
    }

    async function get(table, id) {
        const response = await fetch(`${URL}/${table}/${id}`);
        const data = await response.json();
        return data;

    }

    function update(table, data) {
        return req('PUT', table, data)
    }

    function upsert(table, data) {
        if(data.id) {
            return update('PUT', table, data)            
        }
    }
    function query(table, query, join) {
        return req('POST', table + '/query', { query, join})
    }

    // function req(method, table, data) {
    //     let url = URL + '/' + table;
    //     body = '';

    //     return new Promise((resolve, reject) => {
    //         request({
    //             method,
    //             headers: {
    //                 'content-type': 'application/json'
    //             },
    //             url,
    //             body,
    //         }, (err, req, body) => {
    //             if(err) {
    //                 console.error('Error in the Remote DB', err);
    //                 return reject(err.message);
    //             }
    //             const resp = JSON.parse(body);
    //             return resolve(resp.body);
    //         })
    //     })
    // }

    return {
        list,
        get,
        upsert,
        update,
        query,
    }

};

module.exports = createRemoteDB;