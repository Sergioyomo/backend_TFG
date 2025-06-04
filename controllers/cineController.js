// Import the service layer for handling component-related operations
const cineService = require("../services/cineService");
const { logMensaje } = require("../utils/logger");
const Respuesta = require("../utils/respuesta");

class CineController {
  // Handles retrieval of all cine based on query parameters
  async getAllCine(req, res) {
    try {
        const data = await cineService.getAllCine();
        res.json(Respuesta.exito(data, "Datos de Cine recuperados"));
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

  // Handles retrieval of a single cine by its ID
  async getCineById(req, res) {
    try {
      const idCine = req.params.id; // Extract component ID from the request URL

      // Fetch only the sensei without related data
      const cine = await cineService.getCineById(
        idCine
      );
      if (!cine) {
        // Handle case where the component is not found
        res
          .status(404)
          .json(
            Respuesta.error(null, `Cine no encontrado: ${idCine}`)
          );
      } else {
        res.json(Respuesta.exito(cine, "Cine recuperado"));
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

  // Handles creation of a new cine
  async createCine(req, res) {
    try {
      const cineData = req.body; // Extract the component data from the request body
      const result = await cineService.createCine(cineData); // Call service to create the sensei
      res
        .status(201)
        .json(
          Respuesta.exito(
            { insertId: result.insertId },
            "Cine dado de alta"
          )
        );
    } catch (err) {
      // Handle errors during the creation process
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al insertar el Cine: ${req.originalUrl}`
          )
        );
    }
  }

  // Handles updating of a cine by its ID
  async updateCine(req, res) {
    try {
        const { id } = req.params;
        const { nombre, ubicacion, precioentrada } = req.body;
        const data = await cineService.updateCine(id, { nombre, ubicacion, precioentrada });
        res.json(Respuesta.exito(data, "Cine actualizado correctamente"));
    } catch (err) {
        res.status(500).json(Respuesta.error(null, `Error al actualizar el Cine: ${req.originalUrl}`));
    }
  }

  // Handles deletion of a cine by its ID
  async deleteCine(req, res) {
    try {
      const idCine = req.params.id; // Extract component ID from the request URL
      await cineService.deleteCine(idCine); // Call service to delete the component
      res.status(204).end(); // 204: No Content indicates successful deletion with no response body
    } catch (err) {
      // Handle errors during the deletion process
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = new CineController();
