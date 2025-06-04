// Import the model layer for handling database interactions related to components
const butacasModel = require('../models/butacasModel');
const { logMensaje } = require('../utils/logger');

class ButacasService {

    // Listado sin parametrizar, que mostrará todos los registros de una tabla
    async getAllButacas() {
        try {
            const data = await butacasModel.getAllButacas();
            return data;
        } catch (err) {
            throw err;
        }
    }

    // Consulta a partir de la clave primaria para buscar un registro 
    async getButacasById(idButacas) {
        try {
            const result = await butacasModel.getButacasById(idButacas);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getButacasByIdSala(idButacas) {
        try {
            const result = await butacasModel.getButacasByIdSala(idButacas);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Alta de registros
    async createButacas(butacasData) {
        try {
            const result = await butacasModel.createButacas(butacasData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async crearButacasMultiple(butacasData) {
        try {
            const result = await butacasModel.createButacasMultiple(butacasData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async borrarButacasMultiple(butacasData) {
        try {
            const result = await butacasModel.deleteButacasMultiple(butacasData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Actualización de registros
    async updateButacas(idButacas, datos) {
        try {
            const updated = await butacasModel.updateButacas(datos,idButacas);
            return updated;
        } catch (err) {
            throw err;
        }
    }

    // Borrado a partir de la clave primaria u otro campo 
    async deleteButacas(idButacas) {
        try {
            const result = await butacasModel.deleteButacas(idButacas);
            return result.affectedRows; // Number of affected rows
        } catch (err) {
            throw err;
        }
    }

    // Additional service methods can be implemented here...
}

module.exports = new ButacasService();
