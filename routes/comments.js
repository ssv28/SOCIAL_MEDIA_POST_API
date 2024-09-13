let express = require('express');
let router = express.Router();

let CommentController = require("../Controller/Comment")
let UserController = require("../Controller/User")



//CREATE DATA
router.post('/create', UserController.secure, CommentController.CommentCreate);


//ALL DATA FIND
router.get('/find', UserController.secure, CommentController.FindData);


// //FIND ONE
router.get('/findid/:id', UserController.secure, CommentController.FindId);


//DELETE DATA
router.delete('/delete/:id', UserController.secure, CommentController.CommentDelete);


//UPDATE DATA
router.patch('/update/:id', UserController.secure, CommentController.CommentUpdate);


module.exports = router;
