const express = require('express')
const router = express.Router()
const reviewController =   require('../controllers/review.controller');
const reviewMiddleware = require('../middleware/reviews.js');
// Retrieve all song
router.get('/all', reviewController.findAll);
// Create a new song
router.post('/create', reviewMiddleware.validateReviewToCreate, reviewController.create);
// Retrieve a single song with id
router.get('/findbyuser/:id', reviewController.findByUserId);
// Update a song with id
router.put('/update/:id/:id_usuario', reviewController.update);
// Delete a song with id
router.delete('/delete/:id', reviewController.delete);
module.exports = router