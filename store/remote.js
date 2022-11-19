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

    async function insert(table, data) {
        const body = data;
        const response = await fetch(`${URL}/${table}`, 
        {   method: 'post', 
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
        const data3 = await response.json();

        return data3;
    }


    async function update(table, data, id) {
        const body = data;
        console.log('REMOTE UPDATE: a ver si da el usuario y el passw  ',data, id)
        const response = await fetch(`${URL}/${table}/${id}`, 
        {   method: 'POST', 
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
        const data4 = await response.json();
        console.log('RETMOTE: AQUI ESTA LA DATA DE UPDATE',data4)

        return data4;
    }

    async function query(table, data) {
        const body = data;
        const response = await fetch(`${URL}/${table}`, {
            method: 'put', 
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
        insert,
        update,
        query,
    }

};

module.exports = createRemoteDB;