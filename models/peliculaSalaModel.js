// Importamos la configuración de la base de datos y los utilitarios para loguear errores
const db = require("../config/dbConfig");
const { logErrorSQL, logMensaje } = require("../utils/logger");

class PeliculaSalaModel {
  // Método para obtener todos los pelicula_sala
  async getAllPelicula_Sala() {
    const query = "SELECT ps.id, c.nombre as 'cine',s.nombre as 'sala', p.titulo as 'pelicula' FROM pelicula_sala ps,cine c, pelicula p, sala s where c.id=s.id_cine and s.id=ps.id_sala and ps.id_pelicula=p.id order by c.nombre,s.nombre;";
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
   // Método para obtener un pelicula_sala por su ID
  async getPelicula_SalaById(idPelicula_Sala) {
    const query = " SELECT ps.id, s.id_cine, ps.id_sala, ps.id_pelicula FROM pelicula_sala ps,sala s where ps.id_sala=s.id and ps.id = ?";
    try {
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query, [idPelicula_Sala]); // Usamos promise() para que query sea compatible con promesas
      if (result.length === 0) {
        return null; // Si no se encuentra el componente, retornamos null
      }
      return result[0]; // Devolvemos el primer componente encontrado
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }

  // Método para crear un pelicula_sala (insertar en la base de datos)
  async createPelicula_Sala(pelicula_salaData) {
    console.log(pelicula_salaData);
    const query =
      "INSERT INTO pelicula_sala (id_pelicula, id_sala) VALUES (?, ?)";
    const values = [
      pelicula_salaData.id_pelicula,
      pelicula_salaData.id_sala,
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

  // Método para actualizar un pelicula_sala
  async updatePelicula_Sala(updateData, id) {
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

    const query = `UPDATE pelicula_sala SET ${fields.join(", ")} WHERE id = ?`;
    
    try {
      const [result] = await db.promise().query(query, values);
      return result.affectedRows > 0;
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  // Método para eliminar un pelicula_sala
  async deletePelicula_Sala(idPelicula_Sala) {
    const query = "DELETE FROM pelicula_sala WHERE id = ?";
    try {
      const [result] = await db.promise().query(query, [idPelicula_Sala]); // Usamos promise() para que query sea compatible con promesas
      return result; // Devolvemos el resultado de la eliminación
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  

  // Otros métodos del modelo pueden ser añadidos aquí...
}

// Exportamos una instancia única de ComponenteModel
module.exports = new PeliculaSalaModel();
