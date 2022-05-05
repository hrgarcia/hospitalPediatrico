const OneModel = require("../models/myModel");
const moment = require("moment");
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");

//respuesta a una petición de tipo post
exports.logine = (req, res) => {
    OneModel.find({ usuario: req.body.usuario }, (err, docs) => {
        bcrypt.compare(req.body.contraseña,bcrypt.hashSync(docs[0].contraseña, 5), (err, resul) => {
            console.log(docs[0].contraseña);
            if (err) throw err;
            if (resul) {
                res.session = true;
                login = res.session;
                res.redirect("/", {login:login});
            } else {
                res.send("Contraseña y/o usuario incorrectos");
            }
        });
    });
};
exports.vista = (req, res) => {
    res.status(200).render("login");
};

exports.postear = (req, res) => {
    res.status(200).render("postCreator");
};
