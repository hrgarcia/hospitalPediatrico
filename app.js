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
const { spawn } = require("child_process");
const cron = require("node-cron");
const DB_NAME =
    "mongodb+srv://hrgarcia:EaFhXeNfxbG277Zz@cluster0.fs8tm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const ARCHIVE_PATH = path.join(__dirname, "public", `${DB_NAME}.gzip`);
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

app.post("/contactForm", async (req, res) => {
    //Envio de mail de contacto
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "jaguerodiaz@escuelasproa.edu.ar",
            pass: "jere172901",
        },
    });

    // send mail with defined transport object
    let contenido = {
        from: "jaguerodiaz@escuelaproa.edu.ar", // sender address
        to: "jjgenio.com@gmail.com", // list of receivers
        subject: "consulta de paciente", // Subject line
        text:
            req.body.nombre +
            "  " +
            req.body.apellido +
            "\n" +
            "consulta:" +
            "\n" +
            req.body.consulta +
            "\n" +
            "mail del paciente:" +
            "\n" +
            req.body.correo, // plain text body
    };
    transporter.sendMail(contenido, function (err, data) {
        if (err) {
            console.log(`error encontrado : ${err}`);
        } else {
            console.log(`Email enviado`);
        }
    });
    res.render("index");
});

// cron.schedule("*/5 * * * * *", () => backupMongoDB());
backupMongoDB();

function backupMongoDB() {
    const child = spawn("mongodump", [`--help`]);

    child.stdout.on("data", (data) => {
        console.log("stdout:\n", data);
    });
    child.stderr.on("data", (data) => {
        console.log("stderr:\n", Buffer.from(data).toString());
    });
    child.on("error", (error) => {
        console.log("error:\n", error);
    });
    child.on("exit", (code, signal) => {
        if (code) console.log("Process exit with code:", code);
        else if (signal) console.log("Process killed with signal:", signal);
        else console.log("Backup is successfull ✅");
    });
}
