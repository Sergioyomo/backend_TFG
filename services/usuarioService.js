// Import the model layer for handling database interactions related to components
const usuarioModel = require('../models/usuarioModel');
const { logMensaje } = require('../utils/logger');

class UsuarioService {

    // Listado sin parametrizar, que mostrará todos los registros de una tabla
    async getAllUsuario() {
        try {
            const data = await usuarioModel.getAllUsuario();
            return data;
        } catch (err) {
            throw err;
        }
    }

    // Consulta a partir de la clave primaria para buscar un registro 
    async getUsuarioById(idUsuario) {
        try {
            const result = await usuarioModel.getUsuarioById(idUsuario);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Alta de registros
    async createUsuario(usuarioData) {
        try {
            const result = await usuarioModel.createUsuario(usuarioData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Actualización de registros
    async updateUsuario(idUsuario, datos) {
        try {
            const updated = await usuarioModel.updateUsuario(datos,idUsuario);
            return updated;
        } catch (err) {
            throw err;
        }
    }

    // Borrado a partir de la clave primaria u otro campo 
    async deleteUsuario(idUsuario) {
        try {
            const result = await usuarioModel.deleteUsuario(idUsuario);
            return result.affectedRows; // Number of affected rows
        } catch (err) {
            throw err;
        }
    }

    async login(usuarioData) {
        try {
            const result = await usuarioModel.login(usuarioData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async signup(usuarioData) {
        try {
            const result = await usuarioModel.signup(usuarioData);
            return result;
        } catch (err) {
            throw err;
        }
    }


    // Additional service methods can be implemented here...
}

module.exports = new UsuarioService();
