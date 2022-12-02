const express = require('express')
const router = express.Router()
const songController =   require('../controllers/song.controller');
const uploader          = require('../middleware/multer.js');
// Retrieve all song
router.get('/all', songController.findAll);
// Create a new song
router.post('/create', uploader.single("imagen_cancion"), songController.create);
// Retrieve a single song with id
router.get('/find/:id', songController.findById);
// Update a song with id
router.put('/update/:id', songController.update);
// Delete a song with id
router.delete('/delete/:id', songController.delete);
module.exports = router