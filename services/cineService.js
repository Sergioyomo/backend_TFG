// Import the model layer for handling database interactions related to components
const cineModel = require('../models/cineModel');
const { logMensaje } = require('../utils/logger');

class CineService {

    // Listado sin parametrizar, que mostrará todos los registros de una tabla
    async getAllCine() {
        try {
            const data = await cineModel.getAllCine();
            return data;
        } catch (err) {
            throw err;
        }
    }

    // Consulta a partir de la clave primaria para buscar un registro 
    async getCineById(idCine) {
        try {
            const result = await cineModel.getCineById(idCine);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Alta de registros
    async createCine(cineData) {
        try {
            const result = await cineModel.createCine(cineData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Actualización de registros
    async updateCine(idCine, datos) {
        try {
            const updated = await cineModel.updateCine(datos,idCine);
            return updated;
        } catch (err) {
            throw err;
        }
    }

    // Borrado a partir de la clave primaria u otro campo 
    async deleteCine(idCine) {
        try {
            const result = await cineModel.deleteCine(idCine);
            return result.affectedRows; // Number of affected rows
        } catch (err) {
            throw err;
        }
    }

    // Additional service methods can be implemented here...
}

module.exports = new CineService();
