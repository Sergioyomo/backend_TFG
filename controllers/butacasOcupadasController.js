// Import the service layer for handling component-related operations
const butacasOcupadasService = require("../services/butacasOcupadasService");
const { logMensaje } = require("../utils/logger");
const Respuesta = require("../utils/respuesta");

class ButacasOcupadasController {
  // Handles retrieval of all butacasOcupadas based on query parameters
  async getAllButacasOcupadas(req, res) {
    try {
        const data = await butacasOcupadasService.getAllButacasOcupadas();
        res.json(Respuesta.exito(data, "Datos de ButacasOcupadas recuperados"));
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

 async getAllButacasOcupadasSesion(req, res) {
    try {
      const id_sesion = req.params.id_sesion; // Extract component ID from the request URL
      const id_sala = req.params.id_sala; // Extract component ID from the request URL
        const data = await butacasOcupadasService.getAllButacasOcupadasSesion(id_sesion, id_sala);
        res.json(Respuesta.exito(data, "Datos de ButacasOcupadas recuperados"));
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
  // Handles retrieval of a single butacasOcupadas by its ID
  async getButacasOcupadasById(req, res) {
    try {
      const idButacasOcupadas = req.params.id; // Extract component ID from the request URL

      // Fetch only the sensei without related data
      const butacasOcupadas = await butacasOcupadasService.getButacasOcupadasById(
        idButacasOcupadas
      );
      if (!butacasOcupadas) {
        // Handle case where the component is not found
        res
          .status(404)
          .json(
            Respuesta.error(null, `ButacasOcupadas no encontrado: ${idButacasOcupadas}`)
          );
      } else {
        res.json(Respuesta.exito(butacasOcupadas, "ButacasOcupadas recuperado"));
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

  // Handles creation of a new butacasOcupadas
  async createButacasOcupadas(req, res) {
    try {
      const butacasOcupadasData = req.body; // Extract the component data from the request body
      const result = await butacasOcupadasService.createButacasOcupadas(butacasOcupadasData); // Call service to create the sensei
      res
        .status(201)
        .json(
          Respuesta.exito(
            { insertId: result.insertId },
            "ButacasOcupadas dado de alta"
          )
        );
    } catch (err) {
      // Handle errors during the creation process
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al insertar el ButacasOcupadas: ${req.originalUrl}`
          )
        );
    }
  }

  // Handles updating of a butacasOcupadas by its ID
  async updateButacasOcupadas(req, res) {
    try {
        const { id } = req.params;
        const { id_sesion, id_butacas } = req.body;
        const data = await butacasOcupadasService.updateButacasOcupadas(id, { id_sesion, id_butacas });
        res.json(Respuesta.exito(data, "ButacasOcupadas actualizado correctamente"));
    } catch (err) {
        res.status(500).json(Respuesta.error(null, `Error al actualizar el ButacasOcupadas: ${req.originalUrl}`));
    }
  }

  // Handles deletion of a butacasOcupadas by its ID
  async deleteButacasOcupadas(req, res) {
    try {
      const idButacasOcupadas = req.params.id; // Extract component ID from the request URL
      await butacasOcupadasService.deleteButacasOcupadas(idButacasOcupadas); // Call service to delete the component
      res.status(204).end(); // 204: No Content indicates successful deletion with no response body
    } catch (err) {
      // Handle errors during the deletion process
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = new ButacasOcupadasController();
