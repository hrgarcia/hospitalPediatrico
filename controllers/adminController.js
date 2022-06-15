const OneModel = require("../models/myModel");
const moment = require("moment");
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");
const multer = require("multer");
const upload = multer({ dest: "images/upload/" });

global.isLogin = 0;
global.login = false;
//respuesta a una petición de tipo post

exports.vista = (req, res) => {
    res.status(200).render("login", { isLogin: isLogin, login: login });
};

//error404
exports.error404 = (req, res) => {
    res.status(200).render("error404");
};

exports.logine = (req, res) => {
<<<<<<< HEAD
    if (req.body.usuario == "Admin1") {
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
                        isLogin = 1;
                        res.status(200).render("index", { login: login });
                    } else {
                        isLogin = 2;
                        res.status(200).render("login", {
                            isLogin: isLogin,
                            login: login,
                        });
                    }
                }
            );
        });
    } else {
        isLogin = 3;
        res.status(200).render("login", { isLogin: isLogin, login: login });
=======
    if(req.body.usuario == "Admin1"){
    
    OneModel.find({ usuario: req.body.usuario }, (err, docs) => {
        bcrypt.compare(req.body.contraseña,bcrypt.hashSync(docs[0].contraseña, 5), (err, resul) => {
            console.log(docs[0].contraseña);
            if (err) throw err;
            if (resul) {
                res.session = true;
                login =  res.session;
                isLogin = 1;
                res.status(200).render("index", {login:login});
            } 
            else {
                isLogin = 2;
                res.status(200).render("login", { isLogin : isLogin, login:login});
            }
        );
    });
>>>>>>> parent of 4f61376 (faltacorchete)
    }
};

exports.logout = (req, res) => {
    if (login) {
        res.redirect("/");
        req.session.destroy();
        login = false
    } else {
        res.redirect("/");
    }
};


exports.postear = (req, res) => {
    if(login){
        res.status(200).render("postCreator");
    }
    else{
        isLogin = 4
        res.redirect("/"); //Hacer vista o algo con esto
    }
};
exports.postear2 = (req, res) => {
    if(login){
        res.status(200).render("postPrueba", { isLogin: isLogin, login: login });
    }
    else{
        isLogin = 4
        res.redirect("/"); //Hacer vista o algo con esto
    }
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
