// componenteRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getAllUsuario);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);
router.post('/login', usuarioController.login);
router.post('/signup', usuarioController.signup);
router.post('/logout', usuarioController.logout);



module.exports = router;
