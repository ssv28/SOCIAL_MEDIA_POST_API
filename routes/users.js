let express = require('express');
let router = express.Router();

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

//SIGN UP
router.post('/signup', upload.single("profilePicture"), UserController.UserSignup);


//LOG IN
router.post('/login', UserController.UserLogin);


//ALL DATA FIND
router.get('/find', UserController.secure, UserController.FindData);


//FIND ONE
router.get('/findid/:id', UserController.secure, UserController.FindId);


//DELETE DATA
router.delete('/delete/:id', UserController.secure, UserController.UserDelete);


//UPDATE DATA
router.patch('/update/:id', upload.single("profilePicture"), UserController.secure, UserController.UserUpdate);


module.exports = router;
