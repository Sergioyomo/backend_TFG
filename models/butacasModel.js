// Importamos la configuración de la base de datos y los utilitarios para loguear errores
const db = require("../config/dbConfig");
const { logErrorSQL, logMensaje } = require("../utils/logger");

class ButacasModel {
  // Método para obtener todos los butacas
  async getAllButacas() {
    const query = "SELECT * FROM butacas";
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

   // Método para obtener un butacas por su ID
  async getButacasById(idButacas) {
    const query = "SELECT * FROM butacas WHERE id = ?";
    try {
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query, [idButacas]); // Usamos promise() para que query sea compatible con promesas
      if (result.length === 0) {
        return null; // Si no se encuentra el componente, retornamos null
      }
      return result[0]; // Devolvemos el primer componente encontrado
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }

   // Método para obtener un butacas por su ID
  async getButacasByIdSala(idSala) {
    const query = "SELECT * FROM butacas WHERE id_sala = ?";
    try {
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query, [idSala]); // Usamos promise() para que query sea compatible con promesas
      if (result.length === 0) {
        return null; // Si no se encuentra el componente, retornamos null
      }
      return result; // Devolvemos el primer componente encontrado
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }
  // Método para crear un butacas (insertar en la base de datos)
  async createButacas(butacasData) {
    const query =
      "INSERT INTO butacas (id_sala, fila, numero) VALUES (?, ?, ?)";
    const values = [
      butacasData.id_sala,
      butacasData.fila,
      butacasData.numero
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

async createButacasMultiple(butacasData) {
    const query =
      "INSERT INTO butacas (id_sala, fila, numero) VALUES ?";
    const values = butacasData.map((b) => [b.id_sala, b.fila, b.numero]);
    try {
      // Ejecutamos la consulta con los valores proporcionados
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query, [values]); // Usamos promise() para que query sea compatible con promesas
      return result; // Retornamos el resultado de la inserción
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }

  // Método para actualizar un butacas
  async updateButacas(updateData, id) {
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

    const query = `UPDATE butacas SET ${fields.join(", ")} WHERE id = ?`;
    
    try {
      const [result] = await db.promise().query(query, values);
      return result.affectedRows > 0;
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  // Método para eliminar un butacas
  async deleteButacas(idButacas) {
    const query = "DELETE FROM butacas WHERE id = ?";
    try {
      const [result] = await db.promise().query(query, [idButacas]); // Usamos promise() para que query sea compatible con promesas
      return result; // Devolvemos el resultado de la eliminación
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  async deleteButacasMultiple(butacasData) {
    const idButacas = butacasData.map(b => b.id);
    const query = `DELETE FROM butacas WHERE id IN (${idButacas.map(() => '?').join(',')})`;    
    try {
      const [result] = await db.promise().query(query, idButacas); // Usamos promise() para que query sea compatible con promesas
      return result; // Devolvemos el resultado de la eliminación
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  

  // Otros métodos del modelo pueden ser añadidos aquí...
}

// Exportamos una instancia única de ComponenteModel
module.exports = new ButacasModel();
