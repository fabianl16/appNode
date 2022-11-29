const express           = require('express')
const router            = express.Router()
const authController    = require('../controllers/auth.controller');
const uploader          = require('../middleware/multer.js');
// login
router.post('/login', authController.login);
// register
router.post('/register', uploader.single("foto_perfil"), authController.signUp);
module.exports = router