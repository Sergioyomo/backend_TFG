const request = require("supertest");
const app = require("../index");

var idUsuario;

describe("Pruebas de la API de usuario", () => {
    test(" Obtener todos los usuario", async () => {
        const res = await request(app).get("/api/usuario/");

        expect(res.statusCode).toBe(200);
    });

    test(" Obtener un usuario", async () => {
        const res = await request(app).get("/api/usuario/1");

        expect(res.statusCode).toBe(200);
    });

    test(" Crear un usuario", async () => {
        const usuarioData = {
            nombre: "Paco",
            email: "paco@gmail.com",
            password:"12345",
            rol:"A",
            };
        const res = await request(app).post("/api/usuario/").send(usuarioData);

        const responseData = JSON.parse(res.text);  
        idUsuario = responseData.datos?.insertId;
        console.log("id: "+idUsuario)

        expect(res.statusCode).toBe(201);
    });

    test(" Modificar un usuario", async () => {
        const usuarioData = {
            nombre: "Paco",
            email: "paco@gmail.com",
            password:"54321",
            rol:"A",
            };
        const res = await request(app).put("/api/usuario/"+idUsuario).send(usuarioData);

        expect(res.statusCode).toBe(200);
    });

    test(" Eliminar un usuario", async () => {
        const res = await request(app).delete("/api/usuario/"+idUsuario)

        expect(res.statusCode).toBe(204);
    });

    test(" Obtener un usuario que no existe", async () => {
        const res = await request(app).get("/api/usuario/"+idUsuario);

        expect(res.statusCode).toBe(404);
    });
    
});

var idCine;

describe("Pruebas de la API de cine", () => {
    test(" Obtener todos los cine", async () => {
        const res = await request(app).get("/api/cine/");

        expect(res.statusCode).toBe(200);
    });

    test(" Obtener un cine", async () => {
        const res = await request(app).get("/api/cine/1");

        expect(res.statusCode).toBe(200);
    });

    test(" Crear un cine", async () => {
        const cineData = {
            nombre: "Manco",
            ubicacion: "C dolores 38",
            precioentrada:"2.2",
            };
        const res = await request(app).post("/api/cine/").send(cineData);

        const responseData = JSON.parse(res.text);  
        idCine = responseData.datos?.insertId;
        console.log("id: "+idCine)

        expect(res.statusCode).toBe(201);
    });

    test(" Modificar un cine", async () => {
        const cineData = {
            nombre: "Manco",
            ubicacion: "C dolores 38",
            precioentrada:"3.2",
            };
        const res = await request(app).put("/api/cine/"+idCine).send(cineData);

        expect(res.statusCode).toBe(200);
    });

    test(" Eliminar un cine", async () => {
        const res = await request(app).delete("/api/cine/"+idCine)

        expect(res.statusCode).toBe(204);
    });

    test(" Obtener un cine que no existe", async () => {
        const res = await request(app).get("/api/cine/"+idCine);

        expect(res.statusCode).toBe(404);
    });
    
});

var idPelicula;

describe("Pruebas de la API de pelicula", () => {
    test(" Obtener todos los pelicula", async () => {
        const res = await request(app).get("/api/pelicula/");

        expect(res.statusCode).toBe(200);
    });

    test(" Obtener un pelicula", async () => {
        const res = await request(app).get("/api/pelicula/1");

        expect(res.statusCode).toBe(200);
    });

    test(" Crear un pelicula", async () => {
        const peliculaData = {
            titulo: "Avatar",
            sinopsis: "alsksdksfkffekfdkfdkfefnkosd",
            duracion:"175",
            edad_recomendada:"18",
            fecha_estreno:"2005-05-22",
            fecha_fin_cartelera:"2005-06-22",
            portada:"null",
            };
        const res = await request(app).post("/api/pelicula/").send(peliculaData);

        const responseData = JSON.parse(res.text);  
        idPelicula = responseData.datos?.insertId;
        console.log("id: "+idPelicula)

        expect(res.statusCode).toBe(201);
    });

    test(" Modificar un pelicula", async () => {
        const peliculaData = {
            titulo: "Avatar",
            sinopsis: "alsksdksfkffekfdkfdkfefnkosd",
            duracion:"175",
            edad_recomendada:"16",
            fecha_estreno:"2005-05-22",
            fecha_fin_cartelera:"2005-07-22",
            portada:"null",
        };
        const res = await request(app).put("/api/pelicula/"+idPelicula).send(peliculaData);

        expect(res.statusCode).toBe(200);
    });

    test(" Eliminar un pelicula", async () => {
        const res = await request(app).delete("/api/pelicula/"+idPelicula)

        expect(res.statusCode).toBe(204);
    });

    test(" Obtener un pelicula que no existe", async () => {
        const res = await request(app).get("/api/pelicula/"+idPelicula);

        expect(res.statusCode).toBe(404);
    });
    
});

var idSala;

describe("Pruebas de la API de sala", () => {
    test(" Obtener todos los sala", async () => {
        const res = await request(app).get("/api/sala/");

        expect(res.statusCode).toBe(200);
    });

    test(" Obtener un sala", async () => {
        const res = await request(app).get("/api/sala/1");

        expect(res.statusCode).toBe(200);
    });

    test(" Crear un sala", async () => {
        const salaData = {
            id_cine: "1",
            nombre: "sala6",
            };
        const res = await request(app).post("/api/sala/").send(salaData);

        const responseData = JSON.parse(res.text);  
        idSala = responseData.datos?.insertId;
        console.log("id: "+idSala)

        expect(res.statusCode).toBe(201);
    });

    test(" Modificar un sala", async () => {
        const salaData = {
            id_cine: "1",
            nombre: "sala3",
            };
        const res = await request(app).put("/api/sala/"+idSala).send(salaData);

        expect(res.statusCode).toBe(200);
    });

    test(" Eliminar un sala", async () => {
        const res = await request(app).delete("/api/sala/"+idSala)

        expect(res.statusCode).toBe(204);
    });

    test(" Obtener un sala que no existe", async () => {
        const res = await request(app).get("/api/sala/"+idSala);

        expect(res.statusCode).toBe(404);
    });
    
});

var idSesion;

describe("Pruebas de la API de sesion", () => {
    test(" Obtener todos los sesion", async () => {
        const res = await request(app).get("/api/sesion/");

        expect(res.statusCode).toBe(200);
    });

    test(" Obtener un sesion", async () => {
        const res = await request(app).get("/api/sesion/1");

        expect(res.statusCode).toBe(200);
    });

    test(" Crear un sesion", async () => {
        const sesionData = {
            id_pelicula: "1",
            id_cine: "1",
            hora:"17:26",
            dia:"2003-09-21",
            id_sala:"1",
            };
        const res = await request(app).post("/api/sesion/").send(sesionData);

        const responseData = JSON.parse(res.text);  
        idSesion = responseData.datos?.insertId;
        console.log("id: "+idSesion)

        expect(res.statusCode).toBe(201);
    });

    test(" Modificar un sesion", async () => {
        const sesionData = {
            id_pelicula: "1",
            id_cine: "1",
            hora:"18:26",
            dia:"2003-10-21",
            id_sala:"1",
            };
        const res = await request(app).put("/api/sesion/"+idSesion).send(sesionData);

        expect(res.statusCode).toBe(200);
    });

    test(" Eliminar un sesion", async () => {
        const res = await request(app).delete("/api/sesion/"+idSesion)

        expect(res.statusCode).toBe(204);
    });

    test(" Obtener un sesion que no existe", async () => {
        const res = await request(app).get("/api/sesion/"+idSesion);

        expect(res.statusCode).toBe(404);
    });
    
});

var idEntrada;

describe("Pruebas de la API de entrada", () => {
    test(" Obtener todos los entrada", async () => {
        const res = await request(app).get("/api/entrada/");

        expect(res.statusCode).toBe(200);
    });

    test(" Obtener un entrada", async () => {
        const res = await request(app).get("/api/entrada/1");

        expect(res.statusCode).toBe(200);
    });

    test(" Crear un entrada", async () => {
        const entradaData = {
            id_usuario: "1",
            id_sesion: "1",
            cantidad:"5",
            };
        const res = await request(app).post("/api/entrada/").send(entradaData);

        const responseData = JSON.parse(res.text);  
        idEntrada = responseData.datos?.insertId;
        console.log("id: "+idEntrada)

        expect(res.statusCode).toBe(201);
    });

    test(" Modificar un entrada", async () => {
        const entradaData = {
            id_usuario: "1",
            id_sesion: "1",
            cantidad:"3",
            };
        const res = await request(app).put("/api/entrada/"+idEntrada).send(entradaData);

        expect(res.statusCode).toBe(200);
    });

    test(" Eliminar un entrada", async () => {
        const res = await request(app).delete("/api/entrada/"+idEntrada)

        expect(res.statusCode).toBe(204);
    });

    test(" Obtener un entrada que no existe", async () => {
        const res = await request(app).get("/api/entrada/"+idEntrada);

        expect(res.statusCode).toBe(404);
    });
    
});