// Import the service layer for handling component-related operations
const butacasService = require("../services/butacasService");
const { logMensaje } = require("../utils/logger");
const Respuesta = require("../utils/respuesta");

class ButacasController {
  // Handles retrieval of all butacas based on query parameters
  async getAllButacas(req, res) {
    try {
        const data = await butacasService.getAllButacas();
        res.json(Respuesta.exito(data, "Datos de Butacas recuperados"));
    } catch (err) {
      // Handle errors during the service call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  // Handles retrieval of a single butacas by its ID
  async getButacasById(req, res) {
    try {
      const idButacas = req.params.id; // Extract component ID from the request URL

      // Fetch only the sensei without related data
      const butacas = await butacasService.getButacasById(
        idButacas
      );
      if (!butacas) {
        // Handle case where the component is not found
        res
          .status(404)
          .json(
            Respuesta.error(null, `Butacas no encontrado: ${idButacas}`)
          );
      } else {
        res.json(Respuesta.exito(butacas, "Butacas recuperado"));
      }
      
    } catch (err) {
      // Handle errors during the service call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  async getButacasByIdSala(req, res) {
    try {
      const idButacas = req.params.id; // Extract component ID from the request URL

      // Fetch only the sensei without related data
      const butacas = await butacasService.getButacasByIdSala(
        idButacas
      );
      if (!butacas) {
        // Handle case where the component is not found
        res
          .status(404)
          .json(
            Respuesta.error(null, `Butacas no encontrado: ${idButacas}`)
          );
      } else {
        res.json(Respuesta.exito(butacas, "Butacas recuperado"));
      }
      
    } catch (err) {
      // Handle errors during the service call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos: ${req.originalUrl}`
          )
        );
    }
  }


  // Handles creation of a new butacas
  async createButacas(req, res) {
    try {
      const butacasData = req.body; // Extract the component data from the request body
      const result = await butacasService.createButacas(butacasData); // Call service to create the sensei
      res
        .status(201)
        .json(
          Respuesta.exito(
            { insertId: result.insertId },
            "Butacas dado de alta"
          )
        );
    } catch (err) {
      // Handle errors during the creation process
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al insertar el Butacas: ${req.originalUrl}`
          )
        );
    }
  }

  async modificarButacasMultiple(req, res) {
    try {
      const { butacasnuevas, butacaseliminadas } = req.body;
      if (butacasnuevas.length>0){
      const resultNueva = await butacasService.crearButacasMultiple(butacasnuevas); 
      }
      if (butacaseliminadas.length>0){
      const resultBorrar = await butacasService.borrarButacasMultiple(butacaseliminadas);
      }
      res
        .status(201)
        .json(
          Respuesta.exito(
            { },
            "Butacas de la sala actualizadas"
          )
        );
    } catch (err) {
      // Handle errors during the creation process
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al insertar el Butacas: ${req.originalUrl}`
          )
        );
    }
  }


  // Handles updating of a butacas by its ID
  async updateButacas(req, res) {
    try {
        const { id } = req.params;
        const { id_sala, fila, numero } = req.body;
        const data = await butacasService.updateButacas(id, { id_sala, fila, numero });
        res.json(Respuesta.exito(data, "Butacas actualizado correctamente"));
    } catch (err) {
        res.status(500).json(Respuesta.error(null, `Error al actualizar el Butacas: ${req.originalUrl}`));
    }
  }

  // Handles deletion of a butacas by its ID
  async deleteButacas(req, res) {
    try {
      const idButacas = req.params.id; // Extract component ID from the request URL
      await butacasService.deleteButacas(idButacas); // Call service to delete the component
      res.status(204).end(); // 204: No Content indicates successful deletion with no response body
    } catch (err) {
      // Handle errors during the deletion process
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = new ButacasController();
