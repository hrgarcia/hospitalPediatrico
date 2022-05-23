const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

//Carga de variables de entorno
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

//Conexión al cloud de Mongodb Atlas ...
mongoose
    .connect(DB, {
        useNewUrlParser: true,
    })
    .then((con) => {
        //console.log(con.connections);
        console.log("Connected to database");
    });

const port = 3600;
//Corremos el servidor en el puerto seleccionado
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port} correctamente`);
});
