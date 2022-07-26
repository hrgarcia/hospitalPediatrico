//Todo lo relacionado con express (módulos, middlewares, configuraciones etc)

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const app = express();
const myRouter = require("./routes/myRouter");
const cors = require("cors");
const session = require('express-session');
const multer = require("multer");
//Defino el motor de plantillas a utilizar
app.set("view engine", "ejs");
//Defino la localización de mis vistas
app.set("views", path.join(__dirname, "views"));

app.use(cors());
//Middlewares
app.use(session({ 		//Usuage
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(morgan("dev"));
//Middleware para poder obtener data de los requests con BodyParser
app.use(express.json());
//Configurando archivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


//Agrego un enrutador compatible
app.use("/", myRouter);
module.exports = app;

app.use(multer({
    storage: multer.diskStorage({
        destination: './public/images/avatars',
        limits: { fileSize: 10 * 1024 * 1024},
        filename: function (req, file, cb){
            cb( null, "avatar"+".jpg");
        }
    })
}).single('file'));

app.post('/cargarImagen', async(req,res)=>{
    res.render("config");
});
