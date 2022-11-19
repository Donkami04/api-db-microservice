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
        const userid = id
        const user = {
            name: body.name,
            username: body.username,
        };
  // por ahora dejamos esto comentado, primero que actualice los users      
        // if (body.password || body.username) {
        //     await auth.update ({
        //         username: user.username,
        //         password: user.password,
        //     })
        // }
        console.log('ENTROO la infor a CONTROLLER/UPDATE', user)
        return store.update(TABLA, user, userid)
    }

    function remove(id) {
        return store.remove(TABLA, id)
    };

    return {
        list,
        get,
        insert,
        remove,
        update,
        
    }
}
