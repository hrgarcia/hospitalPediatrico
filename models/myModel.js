//Modelo de ejemplo para alojar datos en una DB mongo
const mongoose = require("mongoose");

//Creación del Schema Post
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Un post debe tener un título"],
    },
    description: {
        type: String,
        required: [true, "Un post debe tener una descripción"],
    },
    date: {
        type: Date,
        required: [true, "Un post debe tener una fecha"],
    },
    technologies: {
        type: [String],
        required: [true, "Un post debe contar con tecnologías"],
    },
});

//Creación del modelo Post
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
