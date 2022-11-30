const express = require('express')
const router = express.Router()
const userController =   require('../controllers/user.controller');
const uploader          = require('../middleware/multer.js');
// Retrieve all song
router.get('/all', userController.findAll);
// Retrieve a single song with id
router.get('/find/:id', userController.findById);
// Update a song with id
router.put('/update/:id', uploader.single("foto_perfil"), userController.update);
// Delete a song with id
router.delete('/delete/:id', userController.delete);
module.exports = router