// componenteRoutes.js
const express = require('express');
const router = express.Router();
const butacasController = require('../controllers/butacasController');

router.get('/', butacasController.getAllButacas);
router.get('/:id', butacasController.getButacasById);
router.get('/sala/:id', butacasController.getButacasByIdSala);
router.post('/', butacasController.createButacas);
router.post('/sala', butacasController.modificarButacasMultiple);
router.put('/:id', butacasController.updateButacas);
router.delete('/:id', butacasController.deleteButacas);


module.exports = router;
