const TABLA = 'user';
const auth = require('../auth');


module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    };
    
    function get(id) {
        return store.get(TABLA, id)
    };

    async function insert(body) {
        const user = {
            
            id: body.id,
            name: body.name,
            username: body.username,
        };
        
        if (body.password || body.username) {
            await auth.insert ({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }
        return store.insert(TABLA, user)
    }

    async function update(body, id) {
        const userid = id;
        const user = {
            name: body.name,
            username: body.username,
        };


        return store.update(TABLA, user, userid)
    }

    function remove(id) {
        return store.remove(TABLA, userid)
    };

    return {
        list,
        get,
        insert,
        remove,
        update,
        
    }
}
