// componenteRoutes.js
const express = require('express');
const router = express.Router();
const peliculaSalaController = require('../controllers/peliculaSalaController');

router.get('/', peliculaSalaController.getAllPelicula_Sala);
router.get('/:id', peliculaSalaController.getPelicula_SalaById);
router.post('/', peliculaSalaController.createPelicula_Sala);
router.put('/:id', peliculaSalaController.updatePelicula_Sala);
router.delete('/:id', peliculaSalaController.deletePelicula_Sala);


module.exports = router;
