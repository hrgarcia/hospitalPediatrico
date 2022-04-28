
//Modelo de ejemplo para alojar datos en una DB mongo
const mongoose = require("mongoose");
const validator = require("validator");

//Creación del Schema Post
const Post = new mongoose.Schema({
    id: {
        type: Number,
        maxlength: 1000,
    },
    fecha: {
        type: Number,
        required: [true, "Tu post debe tener una fecha"],
        maxlength: 100,
        lowercase: true,
    },
    titulo: {
        type: String,
        required: [true, "Tu post debe tener un titulo"],
        maxlength: 100,
        lowercase: true,
    },
    descripcion: {
        type: String,
        required: [true, "Tu post debe tener una descripcion"],
        maxlength: 10000,
        unique: true,
        trim: true,
    },
    imagen: {
        type: String,
        required: [true, "Tu post debe contar con una contraseña"],
    },
    enlace: {
        type: String,
    },
    tags: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
    },
});

//Creación del modelo admin
const post = mongoose.model("Post", Post);

module.exports = post;
