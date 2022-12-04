const express = require('express')
const router = express.Router()
const reviewController =   require('../controllers/review.controller');
const reviewMiddleware = require('../middleware/reviews.js');
// Retrieve all song
router.get('/all', reviewController.findAll);
// Create a new song
router.post('/create', reviewMiddleware.validateReviewToCreate, reviewController.create);
// Retrieve a single reviewwith id
router.get('/findbyuser/:id', reviewController.findByUserId);
// Retrieve a single reviewwith id
router.get('/findbysong/:id', reviewController.findBySongId);
// Update a review with id
router.put('/update/:id/:id_usuario', reviewController.update);
// Delete a review with id
router.delete('/delete/:id', reviewController.delete);
module.exports = router