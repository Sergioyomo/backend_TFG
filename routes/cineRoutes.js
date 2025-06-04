// componenteRoutes.js
const express = require('express');
const router = express.Router();
const cineController = require('../controllers/cineController');

router.get('/', cineController.getAllCine);
router.get('/:id', cineController.getCineById);
router.post('/', cineController.createCine);
router.put('/:id', cineController.updateCine);
router.delete('/:id', cineController.deleteCine);


module.exports = router;
