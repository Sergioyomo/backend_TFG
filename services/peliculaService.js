// Import the model layer for handling database interactions related to components
const peliculaModel = require('../models/peliculaModel');
const { logMensaje } = require('../utils/logger');

class PeliculaService {

    // Listado sin parametrizar, que mostrará todos los registros de una tabla
    async getAllPelicula() {
        try {
            const data = await peliculaModel.getAllPelicula();
            return data;
        } catch (err) {
            throw err;
        }
    }
    async getAllPeliculaTaquillera() {
        try {
            const data = await peliculaModel.getAllPeliculaTaquillera();
            return data;
        } catch (err) {
            throw err;
        }
    }

        async getAllPeliculaEstreno() {
        try {
            const data = await peliculaModel.getAllPeliculaEstreno();
            return data;
        } catch (err) {
            throw err;
        }
    }

            async getAllPeliculaCine(id_cine) {
        try {
            const data = await peliculaModel.getAllPeliculaCine(id_cine);
            return data;
        } catch (err) {
            throw err;
        }
    }

    // Consulta a partir de la clave primaria para buscar un registro 
    async getPeliculaById(idPelicula) {
        try {
            const result = await peliculaModel.getPeliculaById(idPelicula);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Alta de registros
    async createPelicula(peliculaData) {
        try {
            const result = await peliculaModel.createPelicula(peliculaData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Actualización de registros
    async updatePelicula(idPelicula, datos) {
        try {
            const updated = await peliculaModel.updatePelicula(datos,idPelicula);
            return updated;
        } catch (err) {
            throw err;
        }
    }

    // Borrado a partir de la clave primaria u otro campo 
    async deletePelicula(idPelicula) {
        try {
            const result = await peliculaModel.deletePelicula(idPelicula);
            return result.affectedRows; // Number of affected rows
        } catch (err) {
            throw err;
        }
    }

    // Additional service methods can be implemented here...
}

module.exports = new PeliculaService();
