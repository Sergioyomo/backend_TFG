// componenteRoutes.js
const express = require('express');
const router = express.Router();
const sesionController = require('../controllers/sesionController');

router.get('/', sesionController.getAllSesion);
router.get('/por-pelicula-sala/:idsala/:idpelicula', sesionController.getAllSesionByPeliculaSala);
router.get('/entrada/:id', sesionController.getSesionEntradaById);
router.get('/:id', sesionController.getSesionById);
router.post('/', sesionController.createSesion);
router.put('/:id', sesionController.updateSesion);
router.delete('/:id', sesionController.deleteSesion);


module.exports = router;
