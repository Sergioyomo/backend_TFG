const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // usa memoria para el archivo
const peliculaController = require('../controllers/peliculaController');

router.get('/', peliculaController.getAllPelicula);
router.get('/taquillera', peliculaController.getAllPeliculaTaquillera);
router.get('/:id', peliculaController.getPeliculaById);
router.post('/', upload.single('portada'), peliculaController.createPelicula);
router.put('/:id', upload.single('portada'), peliculaController.updatePelicula); // <- este es el cambio
router.delete('/:id', peliculaController.deletePelicula);

module.exports = router;
