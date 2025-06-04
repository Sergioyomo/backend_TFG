// Import the model layer for handling database interactions related to components
const entradaModel = require('../models/entradaModel');
const { logMensaje } = require('../utils/logger');

class EntradaService {

    // Listado sin parametrizar, que mostrará todos los registros de una tabla
    async getAllEntrada() {
        try {
            const data = await entradaModel.getAllEntrada();
            return data;
        } catch (err) {
            throw err;
        }
    }

    // Consulta a partir de la clave primaria para buscar un registro 
    async getEntradaById(idEntrada) {
        try {
            const result = await entradaModel.getEntradaById(idEntrada);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Alta de registros
    async createEntrada(entradaData) {
        try {
            const result = await entradaModel.createEntrada(entradaData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Actualización de registros
    async updateEntrada(idEntrada, datos) {
        try {
            const updated = await entradaModel.updateEntrada(datos,idEntrada);
            return updated;
        } catch (err) {
            throw err;
        }
    }

    // Borrado a partir de la clave primaria u otro campo 
    async deleteEntrada(idEntrada) {
        try {
            const result = await entradaModel.deleteEntrada(idEntrada);
            return result.affectedRows; // Number of affected rows
        } catch (err) {
            throw err;
        }
    }

    // Additional service methods can be implemented here...
}

module.exports = new EntradaService();
