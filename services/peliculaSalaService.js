// Import the model layer for handling database interactions related to components
const pelicula_salaModel = require('../models/peliculaSalaModel');
const { logMensaje } = require('../utils/logger');

class PeliculaSalaService {

    // Listado sin parametrizar, que mostrará todos los registros de una tabla
    async getAllPelicula_Sala() {
        try {
            const data = await pelicula_salaModel.getAllPelicula_Sala();
            return data;
        } catch (err) {
            throw err;
        }
    }

    // Consulta a partir de la clave primaria para buscar un registro 
    async getPelicula_SalaById(idPelicula_Sala) {
        try {
            const result = await pelicula_salaModel.getPelicula_SalaById(idPelicula_Sala);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Alta de registros
    async createPelicula_Sala(pelicula_salaData) {
        try {
            const result = await pelicula_salaModel.createPelicula_Sala(pelicula_salaData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Actualización de registros
    async updatePelicula_Sala(idPelicula_Sala, datos) {
        try {
            const updated = await pelicula_salaModel.updatePelicula_Sala(datos,idPelicula_Sala);
            return updated;
        } catch (err) {
            throw err;
        }
    }

    // Borrado a partir de la clave primaria u otro campo 
    async deletePelicula_Sala(idPelicula_Sala) {
        try {
            const result = await pelicula_salaModel.deletePelicula_Sala(idPelicula_Sala);
            return result.affectedRows; // Number of affected rows
        } catch (err) {
            throw err;
        }
    }

    // Additional service methods can be implemented here...
}

module.exports = new PeliculaSalaService();
