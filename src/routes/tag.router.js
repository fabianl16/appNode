const express = require('express')
const router = express.Router()
const tagController =   require('../controllers/tag.controller');
// Retrieve all song
router.get('/all', tagController.findAll);
// Create a new song
router.post('/create', tagController.create);
// Retrieve a single song with id
router.get('/find/:id', tagController.findById);
// Update a song with id
router.put('/update/:id', tagController.update);
// Delete a song with id
router.delete('/delete/:id', tagController.delete);
module.exports = router