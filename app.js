//Todo lo relacionado con express (módulos, middlewares, configuraciones etc)

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const app = express();
const myRouter = require("./routes/myRouter");
const cors = require("cors");
const session = require("express-session");
const multer = require("multer");
const nodemailer = require("nodemailer");
//Defino el motor de plantillas a utilizar
app.set("view engine", "ejs");
//Defino la localización de mis vistas
app.set("views", path.join(__dirname, "views"));

app.use(cors());
//Middlewares
app.use(
    session({
        //Usuage
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    })
);
app.use(morgan("dev"));
//Middleware para poder obtener data de los requests con BodyParser
app.use(express.json());
//Configurando archivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Agrego un enrutador compatible
app.use("/", myRouter);
module.exports = app;

app.post("/cargarImagen", async (req, res) => {
    app.use(
        multer({
            storage: multer.diskStorage({
                destination: "./public/images/avatars",
                limits: { fileSize: 10 * 1024 * 1024 },
                filename: function (req, file, cb) {
                    cb(null, "avatar" + ".jpg");
                },
            }),
        }).single("file")
    );
    res.render("config");
});

app.post("/guardarImagen", async (req, res) => {
    //Multer para carga en DataBase
    app.use(
        multer({
            storage: multer.diskStorage({
                destination: "./public/images/databaseimg",
                limits: { fileSize: 10 * 1024 * 1024 },
                filename: function (req, file, cb) {
                    cb(null, file.filename + ".jpg");
                },
            }),
        }).single("image")
    );
    res.render("index");
});

app.post("/contacto", async (req, res) => {
    //Envio de mail de contacto
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "CASILLADECORREOX",
            password: "PASSWORDX",
        },
    });

    // send mail with defined transport object
    let contenido = {
        from: "jaguerodiaz@escuelaproa.edu.ar", // sender address
        to: "jjgenio.com@gmail.com", // list of receivers
        subject: req.body.nombre + req.body.apellido, // Subject line
        text:
            "consulta:" +
            req.body.consulta +
            "mail del paciente:" +
            req.body.correo, // plain text body
    };
    transporter.sendmail(contenido, function (err, data) {
        if (err) {
            console.log(`error encontrado : ${err}`);
        } else {
            console.log(`Email enviado`);
        }
    });
    app.use();
    res.Swal.fire({
        position: "top-end",
        icon: succes,
        text: "formulario enviado",
        showConfirmButton: false,
        timer: 2500,
        width: 300,
        padding: 0.5,
    });
});
