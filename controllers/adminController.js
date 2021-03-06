const OneModel = require("../models/myModel");
const PostModel = require("../models/postModel");
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

exports.seccionAdmin = (req, res) => {
    res.status(200).render("edicionPosteos", {data:PostModel.find()});
};

exports.config = (req, res) => {
    res.status(200).render("config");
};



exports.subirPost = (req, res) => {
    const pos = new PostModel({
        id: id++,
        fecha: new Date(req.body.fecha),
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        imagen: req.body.img,
        enlace: req.body.enlace,
        tags: req.body.tag,
    });
    pos.save().then(doc => {
        console.log(doc);
        console.log ("cargado");
    }).catch(err => {
        console.error(err)
    })

    res.status(200).render("edicionPosteos", {data:PostModel.find()});
};