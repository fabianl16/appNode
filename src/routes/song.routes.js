const express = require('express')
const router = express.Router()
const songController =   require('../controllers/song.controller');
// Retrieve all employees
router.get('/', songController.findAll);
// Create a new employee
router.post('/', songController.create);
// Retrieve a single employee with id
router.get('/:id', songController.findById);
// Update a employee with id
router.put('/:id', songController.update);
// Delete a employee with id
router.delete('/:id', songController.delete);
module.exports = router