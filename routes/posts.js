let express = require('express');
let router = express.Router();

let PostController = require("../Controller/Post")
let UserController = require("../Controller/User")


const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

//CREATE DATA
router.post('/create', upload.single("imageUrl"), UserController.secure, PostController.PostCreate);


//ALL DATA FIND
router.get('/find', UserController.secure, PostController.FindData);


// //FIND ONE
router.get('/findid/:id', UserController.secure, PostController.FindId);


//DELETE DATA
router.delete('/delete/:id', UserController.secure, PostController.PostDelete);


//UPDATE DATA
router.patch('/update/:id', upload.single("imageUrl"), UserController.secure, PostController.PostUpdate);


module.exports = router;
