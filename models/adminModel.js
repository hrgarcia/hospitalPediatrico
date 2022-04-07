//Modelo de ejemplo para alojar datos en una DB mongo
const mongoose = require("mongoose");

//Creación del Schema Post
const adminSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, "Usuario"],
    },
    password: {
        type: String,
        required: [true, "Contraseña"],
    },
    
});

//Creación del modelo Post
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;