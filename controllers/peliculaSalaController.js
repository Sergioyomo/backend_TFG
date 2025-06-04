// Import the service layer for handling component-related operations
const pelicula_salaService = require("../services/peliculaSalaService");
const { logMensaje } = require("../utils/logger");
const Respuesta = require("../utils/respuesta");

class PeliculaSalaController {
  // Handles retrieval of all pelicula_sala based on query parameters
  async getAllPelicula_Sala(req, res) {
    try  {
              // Fetch all components if no specific parameter is provided
              const data = await pelicula_salaService.getAllPelicula_Sala();
              res.json(Respuesta.exito(data, "Datos de Pelicula_Sala recuperados"));
        
     }catch (err) {
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


  // Handles retrieval of a single pelicula_sala by its ID
  async getPelicula_SalaById(req, res) {
    try {
      const idPelicula_Sala = req.params.id; // Extract component ID from the request URL

      // Fetch only the sensei without related data
      const pelicula_sala = await pelicula_salaService.getPelicula_SalaById(
        idPelicula_Sala
      );
      if (!pelicula_sala) {
        // Handle case where the component is not found
        res
          .status(404)
          .json(
            Respuesta.error(null, `Pelicula_Sala no encontrado: ${idPelicula_Sala}`)
          );
      } else {
        res.json(Respuesta.exito(pelicula_sala, "Pelicula_Sala recuperado"));
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

  // Handles creation of a new pelicula_sala
async createPelicula_Sala(req, res) {
  try {
    const {
      id_sala,
      id_pelicula
    } = req.body;

    const pelicula_salaData = {
      id_sala,
      id_pelicula
    };

    const result = await pelicula_salaService.createPelicula_Sala(pelicula_salaData);

    res.status(201).json(
      Respuesta.exito(
        { insertId: result.insertId },
        "Pelicula_Sala dada de alta"
      )
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(
      Respuesta.error(null, `Error al insertar el Pelicula_Sala: ${req.originalUrl}`)
    );
  }
}

  // Handles updating of a pelicula_sala by its ID
  async updatePelicula_Sala(req, res) {
  try {
    const { id } = req.params;
    const {
      id_sala,
      id_pelicula
    } = req.body;


    const data = await pelicula_salaService.updatePelicula_Sala(id, {
      id_sala,
      id_pelicula
    });

    res.json(Respuesta.exito(data, "Pelicula_Sala actualizada correctamente"));
  } catch (err) {
    console.error(err);
    res.status(500).json(Respuesta.error(null, `Error al actualizar la Pelicula_Sala: ${req.originalUrl}`));
    }
  }
  // Handles deletion of a pelicula_sala by its ID
  async deletePelicula_Sala(req, res) {
    try {
      const idPelicula_Sala = req.params.id; // Extract component ID from the request URL
      await pelicula_salaService.deletePelicula_Sala(idPelicula_Sala); // Call service to delete the component
      res.status(204).end(); // 204: No Content indicates successful deletion with no response body
    } catch (err) {
      // Handle errors during the deletion process
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = new PeliculaSalaController();
