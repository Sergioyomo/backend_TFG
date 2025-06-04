// Import the service layer for handling component-related operations
const peliculaService = require("../services/peliculaService");
const { logMensaje } = require("../utils/logger");
const Respuesta = require("../utils/respuesta");

class PeliculaController {
  // Handles retrieval of all pelicula based on query parameters
  async getAllPelicula(req, res) {
    try {
            const { estreno, cine } = req.query; // Extract query parameters to determine the type of response
            if (estreno) {
              // Fetch a list of components if 'listado' is true
              const data = await peliculaService.getAllPeliculaEstreno();
              res.json(Respuesta.exito(data, "Listado de pelicula estreno"));
            } else if(cine){
              const data = await peliculaService.getAllPeliculaCine(cine);
              res.json(Respuesta.exito(data, "Listado de pelicula del cine"));
            }  
            else {
              // Fetch all components if no specific parameter is provided
              const data = await peliculaService.getAllPelicula();
              res.json(Respuesta.exito(data, "Datos de Pelicula recuperados"));
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
  async getAllPeliculaTaquillera(req, res) {
    try {
      // Fetch all components if no specific parameter is provided
      const data = await peliculaService.getAllPeliculaTaquillera();
      res.json(Respuesta.exito(data, "Datos de Pelicula recuperados"));

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


  // Handles retrieval of a single pelicula by its ID
  async getPeliculaById(req, res) {
    try {
      const idPelicula = req.params.id; // Extract component ID from the request URL

      // Fetch only the sensei without related data
      const pelicula = await peliculaService.getPeliculaById(
        idPelicula
      );
      if (!pelicula) {
        // Handle case where the component is not found
        res
          .status(404)
          .json(
            Respuesta.error(null, `Pelicula no encontrado: ${idPelicula}`)
          );
      } else {
        res.json(Respuesta.exito(pelicula, "Pelicula recuperado"));
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

  // Handles creation of a new pelicula
async createPelicula(req, res) {
  try {
    const {
      titulo,
      sinopsis,
      duracion,
      edad_recomendada,
      fecha_estreno,
      fecha_fin_cartelera
    } = req.body;

    const portada = req.file ? req.file.buffer : null;

    const peliculaData = {
      titulo,
      sinopsis,
      duracion,
      edad_recomendada,
      fecha_estreno,
      fecha_fin_cartelera,
      portada
    };

    const result = await peliculaService.createPelicula(peliculaData);

    res.status(201).json(
      Respuesta.exito(
        { insertId: result.insertId },
        "Pelicula dada de alta"
      )
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(
      Respuesta.error(null, `Error al insertar el Pelicula: ${req.originalUrl}`)
    );
  }
}

  // Handles updating of a pelicula by its ID
  async updatePelicula(req, res) {
  try {
    const { id } = req.params;
    const {
      titulo,
      sinopsis,
      duracion,
      edad_recomendada,
      fecha_estreno,
      fecha_fin_cartelera
    } = req.body;

    const portada = req.file ? req.file.buffer : undefined;

    const data = await peliculaService.updatePelicula(id, {
      titulo,
      sinopsis,
      duracion,
      edad_recomendada,
      fecha_estreno,
      fecha_fin_cartelera,
      ...(portada !== undefined && { portada })
    });

    res.json(Respuesta.exito(data, "Pelicula actualizada correctamente"));
  } catch (err) {
    console.error(err);
    res.status(500).json(Respuesta.error(null, `Error al actualizar la Pelicula: ${req.originalUrl}`));
    }
  }
  // Handles deletion of a pelicula by its ID
  async deletePelicula(req, res) {
    try {
      const idPelicula = req.params.id; // Extract component ID from the request URL
      await peliculaService.deletePelicula(idPelicula); // Call service to delete the component
      res.status(204).end(); // 204: No Content indicates successful deletion with no response body
    } catch (err) {
      // Handle errors during the deletion process
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = new PeliculaController();
