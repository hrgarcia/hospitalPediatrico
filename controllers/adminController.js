//const OneModel = require("../models/myModel");
const moment = require("moment");
const bcrypt = require("bcrypt");
//Ejemplo de respuesta a una petición de tipo GET
exports.logine = (req, res) => {
    console.log("password: " + req.body.password);
    bcrypt.hash(req.body.password,10,(err, hash) => {
        console.log(hash);
        });
    //OneModel.find({user: req.body.user, password: req.body.password },(err, docs) => {
    //         if (docs == undefined) {
    //             console.log("ingresa otra vez");
    //         }
    //         res.send("USER:" + req.body.user);
    //     }
    // );
};

exports.vista = (req,res)  => {
    res.status(200).render("login");
};

exports.postear = (req,res)  => {
    res.status(200).render("postCreator");
};

