// const fetch = require('node-fetch');

function createRemoteDB(host, port) {
    const URL = `http://${host}:${port}`;

    async function list(table) {
    const response = await fetch(`${URL}/${table}`);
        const data1 = await response.json();
        return data1;
    }

    async function get(table, id) {
        const response = await fetch(`${URL}/${table}/${id}`);
        const data2 = await response.json();
        return data2;

    }

    async function upsert(table, data) {
        const body = data;
        console.log('REMOTE: a ver si da el usuario y el passw  ',data)
        const response = await fetch(`${URL}/${table}`, 
        {   method: 'post', 
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
        const data3 = await response.json();

        return data3;
    }


    function update(table, data) {
        return req('PUT', table, data)
    }

    // function upsert(table, data) {
    //     if(data.id) {
    //         return update('PUT', table, data)            
    //     }
    // }

    // function query(table, query, join) {
    //     return req('POST', table + '/query', { query, join})
    // }

    async function query(table, data) {
        const body = data;
        const response = await fetch(`${URL}/${table}`, {
            method: 'POST', 
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
        const data3 = await response.json();
        console.log('Aqui se esta imprimiendo la data en query-remote', data3)
        return data3;
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