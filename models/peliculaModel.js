// Importamos la configuración de la base de datos y los utilitarios para loguear errores
const db = require("../config/dbConfig");
const { logErrorSQL, logMensaje } = require("../utils/logger");

class PeliculaModel {
  // Método para obtener todos los pelicula
  async getAllPelicula() {
    const query = "SELECT * FROM pelicula";
    try {
       // Usamos await para obtener los datos de la consulta
       const [result] = await db.promise().query(query); // Usamos promise() para que query sea compatible con promesas
       return result; // Retornamos el resultado
    } catch (err) {
      // Si hay un error, lo registramos y lo lanzamos
      logErrorSQL(err);
      throw err;
    }
  }
  async getAllPeliculaTaquillera() {
    const query = "SELECT p.titulo, sum(e.cantidad) as 'vendidas' FROM pelicula p, sesion s, entrada e where p.id=s.id_pelicula and s.id = e.id_sesion group by p.titulo order by vendidas desc limit 5;";
    try {
       // Usamos await para obtener los datos de la consulta
       const [result] = await db.promise().query(query); // Usamos promise() para que query sea compatible con promesas
       return result; // Retornamos el resultado
    } catch (err) {
      // Si hay un error, lo registramos y lo lanzamos
      logErrorSQL(err);
      throw err;
    }
  }
    async getAllPeliculaEstreno() {
    const query = "SELECT * FROM pelicula WHERE fecha_estreno>now()";
    try {
       // Usamos await para obtener los datos de la consulta
       const [result] = await db.promise().query(query); // Usamos promise() para que query sea compatible con promesas
       return result; // Retornamos el resultado
    } catch (err) {
      // Si hay un error, lo registramos y lo lanzamos
      logErrorSQL(err);
      throw err;
    }
  }

  async getAllPeliculaCine(id_cine) {
    const query = "SELECT p.*,s.nombre,s.id as 'id_sala' FROM cine c, sala s, pelicula_sala ps, pelicula p WHERE c.id = s.id_cine and s.id = ps.id_sala and ps.id_pelicula = p.id and c.id = ? and NOW() between p.fecha_estreno and p.fecha_fin_cartelera";
    try {
       // Usamos await para obtener los datos de la consulta
       const [result] = await db.promise().query(query, [id_cine]); // Usamos promise() para que query sea compatible con promesas
       return result; // Retornamos el resultado
    } catch (err) {
      // Si hay un error, lo registramos y lo lanzamos
      logErrorSQL(err);
      throw err;
    }
  }

   // Método para obtener un pelicula por su ID
  async getPeliculaById(idPelicula) {
    const query = "SELECT * FROM pelicula WHERE id = ?";
    try {
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query, [idPelicula]); // Usamos promise() para que query sea compatible con promesas
      if (result.length === 0) {
        return null; // Si no se encuentra el componente, retornamos null
      }
      return result[0]; // Devolvemos el primer componente encontrado
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }

  // Método para crear un pelicula (insertar en la base de datos)
  async createPelicula(peliculaData) {
    console.log(peliculaData);
    const query =
      "INSERT INTO pelicula (titulo, sinopsis, duracion, edad_recomendada, fecha_estreno, fecha_fin_cartelera, portada) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      peliculaData.titulo,
      peliculaData.sinopsis,
      peliculaData.duracion,
      peliculaData.edad_recomendada,
      peliculaData.fecha_estreno,
      peliculaData.fecha_fin_cartelera,
      peliculaData.portada
    ];

    try {
      // Ejecutamos la consulta con los valores proporcionados
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query, values); // Usamos promise() para que query sea compatible con promesas
      return result; // Retornamos el resultado de la inserción
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }

  // Método para actualizar un pelicula
  async updatePelicula(updateData, id) {
    const fields = [];
    const values = [];

    Object.keys(updateData).forEach((key) => {
      fields.push(`${key} = ?`);
      values.push(updateData[key]);
    });

    if (fields.length === 0) {
      throw new Error("No hay datos para actualizar");
    }

    values.push(id); // Agregamos el ID al final para el WHERE

    const query = `UPDATE pelicula SET ${fields.join(", ")} WHERE id = ?`;
    
    try {
      const [result] = await db.promise().query(query, values);
      return result.affectedRows > 0;
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  // Método para eliminar un pelicula
  async deletePelicula(idPelicula) {
    const query = "DELETE FROM pelicula WHERE id = ?";
    try {
      const [result] = await db.promise().query(query, [idPelicula]); // Usamos promise() para que query sea compatible con promesas
      return result; // Devolvemos el resultado de la eliminación
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  

  // Otros métodos del modelo pueden ser añadidos aquí...
}

// Exportamos una instancia única de ComponenteModel
module.exports = new PeliculaModel();
