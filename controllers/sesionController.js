// Import the service layer for handling component-related operations
const sesionService = require("../services/sesionService");
const { logMensaje } = require("../utils/logger");
const Respuesta = require("../utils/respuesta");

class SesionController {
  // Handles retrieval of all sesion based on query parameters
  async getAllSesion(req, res) {
    try {
        const data = await sesionService.getAllSesion();
        res.json(Respuesta.exito(data, "Datos de Sesion recuperados"));
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

  // Handles retrieval of a single sesion by its ID
  async getSesionById(req, res) {
    try {
      const idSesion = req.params.id; // Extract component ID from the request URL

      // Fetch only the sensei without related data
      const sesion = await sesionService.getSesionById(
        idSesion
      );
      if (!sesion) {
        // Handle case where the component is not found
        res
          .status(404)
          .json(
            Respuesta.error(null, `Sesion no encontrado: ${idSesion}`)
          );
      } else {
        res.json(Respuesta.exito(sesion, "Sesion recuperado"));
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

async getSesionEntradaById(req, res) {
    try {
      const idSesion = req.params.id; // Extract component ID from the request URL

      // Fetch only the sensei without related data
      const sesion = await sesionService.getSesionEntradaById(
        idSesion
      );
      if (!sesion) {
        // Handle case where the component is not found
        res
          .status(404)
          .json(
            Respuesta.error(null, `Sesion no encontrado: ${idSesion}`)
          );
      } else {
        res.json(Respuesta.exito(sesion, "Sesion recuperado"));
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

  async getAllSesionByPeliculaSala(req, res) {
    try {
      const {idsala, idpelicula} = req.params; // Extract component ID from the request URL

      // Fetch only the sensei without related data
      const sesion = await sesionService.getAllSesionByPeliculaSala(
        idsala, idpelicula
      );
      if (!sesion) {
        // Handle case where the component is not found
        res
          .status(404)
          .json(
            Respuesta.error(null, `Sesion no encontrado: ${idsala}, ${idpelicula}`)
          );
      } else {
        res.json(Respuesta.exito(sesion, "Sesion recuperado"));
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

  // Handles creation of a new sesion
  async createSesion(req, res) {
    try {
      const sesionData = req.body; // Extract the component data from the request body
      const result = await sesionService.createSesion(sesionData); // Call service to create the sensei
      res
        .status(201)
        .json(
          Respuesta.exito(
            { insertId: result.insertId },
            "Sesion dado de alta"
          )
        );
    } catch (err) {
      // Handle errors during the creation process
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al insertar el Sesion: ${req.originalUrl}`
          )
        );
    }
  }

  // Handles updating of a sesion by its ID
  async updateSesion(req, res) {
    try {
        const { id } = req.params;
        const { id_pelicula, hora, dia, id_sala } = req.body;
        const data = await sesionService.updateSesion(id, { id_pelicula, hora, dia, id_sala });
        res.json(Respuesta.exito(data, "Sesion actualizado correctamente"));
    } catch (err) {
        res.status(500).json(Respuesta.error(null, `Error al actualizar el Sesion: ${req.originalUrl}`));
    }
  }

  // Handles deletion of a sesion by its ID
  async deleteSesion(req, res) {
    try {
      const idSesion = req.params.id; // Extract component ID from the request URL
      await sesionService.deleteSesion(idSesion); // Call service to delete the component
      res.status(204).end(); // 204: No Content indicates successful deletion with no response body
    } catch (err) {
      // Handle errors during the deletion process
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = new SesionController();
