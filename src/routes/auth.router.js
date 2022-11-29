const express           = require('express')
const router            = express.Router()
const authController    =   require('../controllers/auth.controller');
const userMiddleware    = require('../middleware/users.js');
const cloudinary        = require("../../cloudinary");
const uploader          = require('../middleware/multer.js');
// login
router.post('/login', authController.login);
// register
router.post('/register', userMiddleware.validateRegister, uploader.single("foto_perfil"), authController.signUp);
module.exports = router