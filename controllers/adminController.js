const OneModel = require("../models/myModel");
const moment = require("moment");
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");
const multer = require("multer");
const upload = multer({ dest: "images/upload/" });

//respuesta a una petición de tipo post
exports.logine = (req, res) => {
    OneModel.find({ usuario: req.body.usuario }, (err, docs) => {
        bcrypt.compare(
            req.body.contraseña,
            bcrypt.hashSync(docs[0].contraseña, 5),
            (err, resul) => {
                console.log(docs[0].contraseña);
                if (err) throw err;
                if (resul) {
                    res.session = true;
                    login = res.session;
                    res.redirect("/");
                } else {
                    res.send("Contraseña y/o usuario incorrectos");
                }
            }
        );
    });
};
exports.vista = (req, res) => {
    res.status(200).render("login");
};

exports.postear = (req, res) => {
    res.status(200).render("postCreator");
};
exports.postear2 = (req, res) => {
    res.status(200).render("postPrueba");
};


//Multer
// exports.subirPost=  upload.array('files'),(req, res, err) => {
    // FILE SIZE ERROR
    // if (err instanceof multer.MulterError) {
    //     return res.json("overToSize");
    // }

    // INVALID FILE TYPE, message will return from fileFilter callback
    // else if (err) {
    //     return res.json("invalidType");
    // }

    // SUCCESS
    // else {
    //     function getFileExtension(filename) {
    //         return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
    //     }

    //     let width = 800;
    //     let heigth = 600;

    //     let extension = getFileExtension(req.files.originalname);

    //     sharp(req.files.path)
    //         .resize(width, heigth)
    //         .toFile("images/upload" + "." + extension, (err) => {
    //             if (!err) {
    //                 let img = "imagen_" + "." + extension;
    //                 let id = 0;
    //                 const pos = new Post({
    //                     id: id++,
    //                     fecha: req.body.fecha,
    //                     titulo: req.body.titulo,
    //                     descripcion: req.body.descripcion,
    //                     imagen: img,
    //                     enlace: req.body.enlace,
    //                     tag: req.body.tag,
    //                 });
    //             }
    //         });
    // }

    // pos.save()
    //  .then(doc => {
    //    console.log(doc)
    //  })
    //  .catch(err => {
    //    console.error(err)
    // })
// };
