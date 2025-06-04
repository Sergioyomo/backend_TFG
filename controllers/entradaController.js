// Import the service layer for handling component-related operations
const entradaService = require("../services/entradaService");
const { logMensaje } = require("../utils/logger");
const Respuesta = require("../utils/respuesta");

class EntradaController {
  // Handles retrieval of all entrada based on query parameters
  async getAllEntrada(req, res) {
    try {
        const data = await entradaService.getAllEntrada();
        res.json(Respuesta.exito(data, "Datos de Entrada recuperados"));
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

  // Handles retrieval of a single entrada by its ID
  async getEntradaById(req, res) {
    try {
      const idEntrada = req.params.id; // Extract component ID from the request URL

      // Fetch only the sensei without related data
      const entrada = await entradaService.getEntradaById(
        idEntrada
      );
      if (!entrada) {
        // Handle case where the component is not found
        res
          .status(404)
          .json(
            Respuesta.error(null, `Entrada no encontrado: ${idEntrada}`)
          );
      } else {
        res.json(Respuesta.exito(entrada, "Entrada recuperado"));
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

  // Handles creation of a new entrada
  async createEntrada(req, res) {
    try {
      const entradaData = req.body; // Extract the component data from the request body
      const result = await entradaService.createEntrada(entradaData); // Call service to create the sensei
      res
        .status(201)
        .json(
          Respuesta.exito(
            { insertId: result.insertId },
            "Entrada dado de alta"
          )
        );
    } catch (err) {
      // Handle errors during the creation process
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al insertar el Entrada: ${req.originalUrl}`
          )
        );
    }
  }

  // Handles updating of a entrada by its ID
  async updateEntrada(req, res) {
    try {
        const { id } = req.params;
        const { id_usuario, id_sesion, cantidad } = req.body;
        const data = await entradaService.updateEntrada(id, { id_usuario, id_sesion, cantidad });
        res.json(Respuesta.exito(data, "Entrada actualizado correctamente"));
    } catch (err) {
        res.status(500).json(Respuesta.error(null, `Error al actualizar el Entrada: ${req.originalUrl}`));
    }
  }

  // Handles deletion of a entrada by its ID
  async deleteEntrada(req, res) {
    try {
      const idEntrada = req.params.id; // Extract component ID from the request URL
      await entradaService.deleteEntrada(idEntrada); // Call service to delete the component
      res.status(204).end(); // 204: No Content indicates successful deletion with no response body
    } catch (err) {
      // Handle errors during the deletion process
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = new EntradaController();
