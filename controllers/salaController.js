// Import the service layer for handling component-related operations
const salaService = require("../services/salaService");
const { logMensaje } = require("../utils/logger");
const Respuesta = require("../utils/respuesta");

class SalaController {
  // Handles retrieval of all sala based on query parameters
  async getAllSala(req, res) {
    try {
        const data = await salaService.getAllSala();
        res.json(Respuesta.exito(data, "Datos de Sala recuperados"));
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

  // Handles retrieval of a single sala by its ID
  async getSalaById(req, res) {
    try {
      const idSala = req.params.id; // Extract component ID from the request URL

      // Fetch only the sensei without related data
      const sala = await salaService.getSalaById(
        idSala
      );
      if (!sala) {
        // Handle case where the component is not found
        res
          .status(404)
          .json(
            Respuesta.error(null, `Sala no encontrado: ${idSala}`)
          );
      } else {
        res.json(Respuesta.exito(sala, "Sala recuperado"));
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

  // Handles creation of a new sala
  async createSala(req, res) {
    try {
      const salaData = req.body; // Extract the component data from the request body
      const result = await salaService.createSala(salaData); // Call service to create the sensei
      res
        .status(201)
        .json(
          Respuesta.exito(
            { insertId: result.insertId },
            "Sala dado de alta"
          )
        );
    } catch (err) {
      // Handle errors during the creation process
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al insertar el Sala: ${req.originalUrl}`
          )
        );
    }
  }

  // Handles updating of a sala by its ID
  async updateSala(req, res) {
    try {
        const { id } = req.params;
        const { id_cine, nombre } = req.body;
        const data = await salaService.updateSala(id, { id_cine, nombre });
        res.json(Respuesta.exito(data, "Sala actualizado correctamente"));
    } catch (err) {
        res.status(500).json(Respuesta.error(null, `Error al actualizar el Sala: ${req.originalUrl}`));
    }
  }

  // Handles deletion of a sala by its ID
  async deleteSala(req, res) {
    try {
      const idSala = req.params.id; // Extract component ID from the request URL
      await salaService.deleteSala(idSala); // Call service to delete the component
      res.status(204).end(); // 204: No Content indicates successful deletion with no response body
    } catch (err) {
      // Handle errors during the deletion process
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = new SalaController();
