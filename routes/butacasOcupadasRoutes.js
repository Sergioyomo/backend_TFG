// componenteRoutes.js
const express = require('express');
const router = express.Router();
const butacasOcupadasController = require('../controllers/butacasOcupadasController');

router.get('/', butacasOcupadasController.getAllButacasOcupadas);
router.get('/:id', butacasOcupadasController.getButacasOcupadasById);
router.get('/sesion/:id_sesion/:id_sala', butacasOcupadasController.getAllButacasOcupadasSesion);
router.post('/', butacasOcupadasController.createButacasOcupadas);
router.put('/:id', butacasOcupadasController.updateButacasOcupadas);
router.delete('/:id', butacasOcupadasController.deleteButacasOcupadas);


module.exports = router;
