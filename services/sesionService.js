// Import the model layer for handling database interactions related to components
const sesionModel = require('../models/sesionModel');
const { logMensaje } = require('../utils/logger');

class SesionService {

    // Listado sin parametrizar, que mostrará todos los registros de una tabla
    async getAllSesion() {
        try {
            const data = await sesionModel.getAllSesion();
            return data;
        } catch (err) {
            throw err;
        }
    }

    // Consulta a partir de la clave primaria para buscar un registro 
    async getSesionById(idSesion) {
        try {
            const result = await sesionModel.getSesionById(idSesion);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getSesionEntradaById(idSesion) {
        try {
            const result = await sesionModel.getSesionEntradaById(idSesion);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getAllSesionByPeliculaSala(idsala, idpelicula) {
        try {
            const result = await sesionModel.getAllSesionByPeliculaSala(idsala, idpelicula);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Alta de registros
    async createSesion(sesionData) {
        try {
            const result = await sesionModel.createSesion(sesionData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Actualización de registros
    async updateSesion(idSesion, datos) {
        try {
            const updated = await sesionModel.updateSesion(datos,idSesion);
            return updated;
        } catch (err) {
            throw err;
        }
    }

    // Borrado a partir de la clave primaria u otro campo 
    async deleteSesion(idSesion) {
        try {
            const result = await sesionModel.deleteSesion(idSesion);
            return result.affectedRows; // Number of affected rows
        } catch (err) {
            throw err;
        }
    }

    // Additional service methods can be implemented here...
}

module.exports = new SesionService();
