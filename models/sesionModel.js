// Importamos la configuración de la base de datos y los utilitarios para loguear errores
const db = require("../config/dbConfig");
const { logErrorSQL, logMensaje } = require("../utils/logger");

class SesionModel {
  // Método para obtener todos los sesion
  async getAllSesion() {
    const query = "SELECT s.id,s.hora,s.dia,p.titulo as 'pelicula', sl.nombre as 'sala', c.nombre as 'cine' FROM sesion s, pelicula p, sala sl, cine c where s.id_pelicula=p.id and s.id_sala=sl.id and sl.id_cine=c.id";
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

   // Método para obtener un sesion por su ID
  async getSesionById(idSesion) {
    const query = "SELECT s.*,sl.id_cine FROM sesion s, sala sl WHERE s.id_sala=sl.id and s.id = ?";
    try {
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query, [idSesion]); // Usamos promise() para que query sea compatible con promesas
      if (result.length === 0) {
        return null; // Si no se encuentra el componente, retornamos null
      }
      return result[0]; // Devolvemos el primer componente encontrado
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }

  async getAllSesionByPeliculaSala(idsala, idpelicula) {
    const query = "SELECT * FROM sesion WHERE id_sala = ? and id_pelicula = ?";
    try {
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query, [idsala, idpelicula]); // Usamos promise() para que query sea compatible con promesas
      if (result.length === 0) {
        return null; // Si no se encuentra el componente, retornamos null
      }
      return result; // Devolvemos el primer componente encontrado
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }

   // Método para obtener un sesion por su ID
  async getSesionEntradaById(idSesion) {
    const query = "SELECT s.*, p.titulo, p.portada, sl.id as 'id_sala', sl.nombre as 'sala', c.nombre as 'cine', c.precioentrada, c.ubicacion FROM sesion s, sala sl, pelicula p, cine c WHERE s.id_sala=sl.id and s.id_pelicula = p.id and sl.id_cine = c.id and s.id = ?";
    try {
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query, [idSesion]); // Usamos promise() para que query sea compatible con promesas
      if (result.length === 0) {
        return null; // Si no se encuentra el componente, retornamos null
      }
      return result[0]; // Devolvemos el primer componente encontrado
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }



  // Método para crear un sesion (insertar en la base de datos)
  async createSesion(sesionData) {
    const query =
      "INSERT INTO sesion (id_pelicula, hora, dia, id_sala) VALUES (?, ?, ?, ?)";
    const values = [
      sesionData.id_pelicula,
      sesionData.hora,
      sesionData.dia,
      sesionData.id_sala
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

  // Método para actualizar un sesion
  async updateSesion(updateData, id) {
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

    const query = `UPDATE sesion SET ${fields.join(", ")} WHERE id = ?`;
    
    try {
      const [result] = await db.promise().query(query, values);
      return result.affectedRows > 0;
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  // Método para eliminar un sesion
  async deleteSesion(idSesion) {
    const query = "DELETE FROM sesion WHERE id = ?";
    try {
      const [result] = await db.promise().query(query, [idSesion]); // Usamos promise() para que query sea compatible con promesas
      return result; // Devolvemos el resultado de la eliminación
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  

  // Otros métodos del modelo pueden ser añadidos aquí...
}

// Exportamos una instancia única de ComponenteModel
module.exports = new SesionModel();
