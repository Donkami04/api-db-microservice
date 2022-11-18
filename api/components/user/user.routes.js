const express = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const secure = require('./secure');

const router = express.Router();

// router.get('/', function (req, res, next) {
//     Controller.list()
//         .then((users) => {
//             response.success(req, res, users, 200)
//         })
//         .catch(next)
// });

// router.get('/:id', function (req, res, next) {
//     Controller.get(req.params.id)
//         .then((oneUser) => {
//             response.success(req, res, oneUser, 200)
//         })
//         .catch(next)
// });

// router.post('/', function (req, res, next) {
//     Controller.upsert(req.body)
//         .then((user) => {
//             response.success(req, res, user, 200)
//         })
//         .catch(next)
// });

// router.put('/', 
//     checkAuth('update'),
//     function (req, res, next) {
//         Controller.upsert(req.body)
//             .then((userUpdated) => {
//                 response.success(req, res, userUpdated, 200)
//             })
//             .catch(next)
//     }
// ); 



// router.delete('/:id', function (req, res, next) {
//     Controller.remove(req.params.id)
//         .then((userRemoved) => {
//             response.success(req, res, userRemoved, 200)
//         })
//         .catch(next)
// });

// module.exports = router;

// Routes


router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', upsert);

// Internal functions
function list(req, res, next) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
}

function get(req, res, next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
}

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
}


module.exports = router;