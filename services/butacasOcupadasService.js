// Import the model layer for handling database interactions related to components
const butacasOcupadasModel = require('../models/butacasOcupadasModel');
const { logMensaje } = require('../utils/logger');

class ButacasOcupadasService {

    // Listado sin parametrizar, que mostrará todos los registros de una tabla
    async getAllButacasOcupadas() {
        try {
            const data = await butacasOcupadasModel.getAllButacasOcupadas();
            return data;
        } catch (err) {
            throw err;
        }
    }

    async getAllButacasOcupadasSesion(id_sesion, id_sala) {
        try {
            const data = await butacasOcupadasModel.getAllButacasOcupadasSesion(id_sesion, id_sala);
            return data;
        } catch (err) {
            throw err;
        }
    }
    // Consulta a partir de la clave primaria para buscar un registro 
    async getButacasOcupadasById(idButacasOcupadas) {
        try {
            const result = await butacasOcupadasModel.getButacasOcupadasById(idButacasOcupadas);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Alta de registros
    async createButacasOcupadas(butacasOcupadasData) {
        try {
            const result = await butacasOcupadasModel.createButacasOcupadas(butacasOcupadasData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Actualización de registros
    async updateButacasOcupadas(idButacasOcupadas, datos) {
        try {
            const updated = await butacasOcupadasModel.updateButacasOcupadas(datos,idButacasOcupadas);
            return updated;
        } catch (err) {
            throw err;
        }
    }

    // Borrado a partir de la clave primaria u otro campo 
    async deleteButacasOcupadas(idButacasOcupadas) {
        try {
            const result = await butacasOcupadasModel.deleteButacasOcupadas(idButacasOcupadas);
            return result.affectedRows; // Number of affected rows
        } catch (err) {
            throw err;
        }
    }

    // Additional service methods can be implemented here...
}

module.exports = new ButacasOcupadasService();
