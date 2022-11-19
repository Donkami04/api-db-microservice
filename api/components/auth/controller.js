const TABLA = 'auth';
const auth = require('../../../auth')
const bcrypt = require('bcrypt')


module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        const data = await store.query(TABLA, {username: username});
        console.log('******** CONTROLLER/AUTH/LOGIN',data)

        return bcrypt.compare(password, data.body.password)
            .then(areEqual => {
                if (areEqual === true) {
                    return auth.sign({...data})
                } else {
                    throw new Error('Bad Information')
                }
            })
    }

    async function insert(data) {

        const authData = {
            id: data.id
        }

        if(data.username) {
            authData.username = data.username;
        }

        if(data.password) {
            authData.password = await bcrypt.hash(data.password, 10);
        }

        return store.insert(TABLA, authData);
    }

    return { insert, login }
}