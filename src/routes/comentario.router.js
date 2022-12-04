const express = require('express')
const router = express.Router()
const commentController =   require('../controllers/comentario.controller');
// Retrieve all comentarios
router.get('/all', commentController.findAll);
// Create a new comentario
router.post('/create', commentController.create);
// Retrieve a single comentario by id
router.get('/find/:id', commentController.findById);
// Retrieve a single comentario by id
router.get('/findbyreview/:id', commentController.findById);
// Update a comentario with id
router.put('/update/:id/:id_usuario', commentController.update);
// Delete a comentario with id
router.delete('/delete/:id', commentController.delete);
module.exports = router