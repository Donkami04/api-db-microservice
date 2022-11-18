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

    async function upsert(body) {
        const user = {
            isNew: body.isNew,
            id: body.id,
            name: body.name,
            username: body.username,
        };
        
        if (body.password || body.username) {
            await auth.upsert ({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }
        return store.upsert(TABLA, user)
    }

    function remove(id) {
        return store.remove(TABLA, id)
    };

    return {
        list,
        get,
        upsert,
        remove,
        
    }
}
