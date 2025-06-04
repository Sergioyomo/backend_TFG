// Importamos la configuración de la base de datos y los utilitarios para loguear errores
const db = require("../config/dbConfig");
const { logErrorSQL, logMensaje } = require("../utils/logger");
const bcrypt = require('bcrypt'); 


class UsuarioModel {
  // Método para obtener todos los usuarios
  async getAllUsuario() {
    const query = "SELECT id, nombre, email, rol FROM usuario";
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

   // Método para obtener un usuario por su ID
  async getUsuarioById(idUsuario) {
    const query = "SELECT id, nombre, email, rol FROM usuario WHERE id = ?";
    try {
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query, [idUsuario]); // Usamos promise() para que query sea compatible con promesas
      if (result.length === 0) {
        return null; // Si no se encuentra el componente, retornamos null
      }
      return result[0]; // Devolvemos el primer componente encontrado
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }

  // Método para crear un usuario (insertar en la base de datos)
  async createUsuario(usuarioData) {
    console.log(usuarioData);
    const query =
      "INSERT INTO usuario (nombre, email, password, rol) VALUES (?, ?, ?, ?)";
    const values = [
      usuarioData.nombre,
      usuarioData.email,
      usuarioData.password,
      usuarioData.rol
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

  // Método para actualizar un usuario
  async updateUsuario(updateData, id) {
    const fields = [];
    const values = [];
    if(!updateData["password"]){
      delete updateData["password"]
    }else{
      const hashedPassword = await bcrypt.hash(updateData["password"], 10); // 10 es el nivel de "salting" (puedes ajustarlo)
      updateData["password"]=hashedPassword
    }
    Object.keys(updateData).forEach((key) => {
      fields.push(`${key} = ?`);
      values.push(updateData[key]);
    });

    if (fields.length === 0) {
      throw new Error("No hay datos para actualizar");
    }

    values.push(id); // Agregamos el ID al final para el WHERE

    const query = `UPDATE usuario SET ${fields.join(", ")} WHERE id = ?`;
    
    try {
      const [result] = await db.promise().query(query, values);
      return result.affectedRows > 0;
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  // Método para eliminar un usuario
  async deleteUsuario(idUsuario) {
    const query = "DELETE FROM usuario WHERE id = ?";
    try {
      const [result] = await db.promise().query(query, [idUsuario]); // Usamos promise() para que query sea compatible con promesas
      return result; // Devolvemos el resultado de la eliminación
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  async login(usuarioData) {
    const { email, password } = usuarioData;

    try {
      const user = await this.getUsuarioByEmail(email);
      if (!user) {
        return false;
      }

      // Verificar la contraseña
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return false;
      }

      //Eliminar la contraseña del objeto de respuesta
     // delete user.dataValues.password;
      
      return user;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async signup(usuarioData) {
    const { username, email, password, rol } = usuarioData;
    console.log(usuarioData);
    try {
      // Validar si todos los campos fueron proporcionados
      if (!username || !email || !password) {
        return false;
      }
      var usuarioRol = rol
      if (!rol){
        usuarioRol="N"
      };

      // Verificar si el usuario ya existe
      const existingUser = await this.getUsuarioByEmail(email);
      if (existingUser) {
        return false;
      }
      // Cifrar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10); // 10 es el nivel de "salting" (puedes ajustarlo)
      // Crear el nuevo usuario
      const usuarioNuevo = await this.createUsuario({
        nombre: username,
        email,
        password: hashedPassword, 
        rol: usuarioRol,
      });

      //TODO: si el usuario se crea correctamente continuar, si no devolver false

      // Responder con éxito
      return true;

    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      return false;
    }
  }

  async getUsuarioByEmail(emailUsuario) {
    const query = "SELECT * FROM usuario WHERE email = ?";
    try {
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query, [emailUsuario]); // Usamos promise() para que query sea compatible con promesas
      if (result.length === 0) {
        return null; // Si no se encuentra el componente, retornamos null
      }
      return result[0]; // Devolvemos el primer componente encontrado
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }

  

  // Otros métodos del modelo pueden ser añadidos aquí...
}

// Exportamos una instancia única de ComponenteModel
module.exports = new UsuarioModel();
