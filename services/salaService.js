// Import the model layer for handling database interactions related to components
const salaModel = require('../models/salaModel');
const { logMensaje } = require('../utils/logger');

class SalaService {

    // Listado sin parametrizar, que mostrará todos los registros de una tabla
    async getAllSala() {
        try {
            const data = await salaModel.getAllSala();
            return data;
        } catch (err) {
            throw err;
        }
    }

    // Consulta a partir de la clave primaria para buscar un registro 
    async getSalaById(idSala) {
        try {
            const result = await salaModel.getSalaById(idSala);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Alta de registros
    async createSala(salaData) {
        try {
            const result = await salaModel.createSala(salaData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Actualización de registros
    async updateSala(idSala, datos) {
        try {
            const updated = await salaModel.updateSala(datos,idSala);
            return updated;
        } catch (err) {
            throw err;
        }
    }

    // Borrado a partir de la clave primaria u otro campo 
    async deleteSala(idSala) {
        try {
            const result = await salaModel.deleteSala(idSala);
            return result.affectedRows; // Number of affected rows
        } catch (err) {
            throw err;
        }
    }

    // Additional service methods can be implemented here...
}

module.exports = new SalaService();
