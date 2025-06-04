// componenteRoutes.js
const express = require('express');
const router = express.Router();
const entradaController = require('../controllers/entradaController');

router.get('/', entradaController.getAllEntrada);
router.get('/:id', entradaController.getEntradaById);
router.post('/', entradaController.createEntrada);
router.put('/:id', entradaController.updateEntrada);
router.delete('/:id', entradaController.deleteEntrada);


module.exports = router;
