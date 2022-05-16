const OneModel = require("../models/myModel");
const moment = require("moment");
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");
let isLogin;
let login;
//respuesta a una petición de tipo post

exports.vista = (req, res) => {
    res.status(200).render("login", { isLogin : isLogin, login:login });
};

exports.logine = (req, res) => {
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
        });
    });
    }
 
else{
    isLogin = 3;
    res.status(200).render("login", { isLogin : isLogin,login:login});
}};

exports.logout = (req, res) => {
    if (login){
        res.redirect("/");
        req.session.destroy()
        
    } 
    else {
        login = false; 
        res.redirect("/");
    }
};

exports.postear = (req, res) => {
    res.status(200).render("postCreator");
};
exports.postear2 = (req, res) => {
    res.status(200).render("postPrueba");
};