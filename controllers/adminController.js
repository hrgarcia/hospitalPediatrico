const OneModel = require("../models/myModel");
const PostModel = require("../models/postModel");
const moment = require("moment");
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");

global.isLogin = 0;
global.login = false;
let id = 0;
//respuesta a una petición de tipo post

exports.vista = (req, res) => {
    res.status(200).render("login", { isLogin: isLogin, login: login });
};

//vista kinesiologia
exports.kinesiologia = (req, res) => {
    res.status(200).render("kinesiologia");
};

//vista salud mental
exports.saludMental = (req, res) => {
    res.status(200).render("saludMental");
};

//vista neumonologia
exports.neumonologia = (req, res) => {
    res.status(200).render("neumonologia");
};

//error404
exports.error404 = (req, res) => {
    res.status(200).render("error404");
};

//vista contacto
exports.contacto = (req, res) => {
    res.status(200).render("contacto");
};

exports.logine = (req, res) => {
    if (req.body.usuario == "Doctor") {
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
        login = false;
    } else {
        res.redirect("/");
    }
};

exports.postear = (req, res) => {
    if (login) {
        res.status(200).render("postCreator");
    } else {
        isLogin = 4;
        res.redirect("/"); //Hacer vista o algo con esto
    }
};
exports.postear2 = (req, res) => {
    if (login) {
        res.status(200).render("postPrueba", {
            isLogin: isLogin,
            login: login,
        });
    } else {
        isLogin = 4;
        res.redirect("/"); //Hacer vista o algo con esto
    }
};


exports.seccionAdmin = (req, res) => {
    PostModel.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
            res.status(200).render("edicionPosteos", {data: data});
        }
    }); 
};

exports.config = (req, res) => {
    res.status(200).render("config");
};

exports.user = (req, res) => {
    if (login) {
        res.status(200).render("user", { data: OneModel.find().limit(6) });
    } else {
        isLogin = 4;
        res.redirect("/"); //Hacer vista o algo con esto
    }
};

OneModel.find({ nombre: "admin" }).exec(function (err, books) {
    if (err) throw err;

    console.log(books);
});

//cambiamos la contraseña con la Query findOneAndUpdate.
exports.ChangePassword = (req, res) => {
    if (login) {
        OneModel.findOneAndUpdate(
            { nombre: "admin" },
            { $set: { contraseña: req.body.contraseña } },
            { new: true },
            function (err, doc) {
                if (err) console.log("Error ", err);
                console.log("Updated Doc -> ", doc);
                res.status(200).render("login", {
                    isLogin: isLogin,
                    login: login,
                });
            }
        );
    }
};

exports.ChangeUser = (req, res) => {
    if (login) {
        OneModel.findOneAndUpdate(
            { nombre: "admin" },
            { $set: { usuario: req.body.usuario } },
            { new: true },
            function (err, doc) {
                if (err) console.log("Error ", err);
                console.log("Updated Doc -> ", doc);
                res.status(200).render("login", {
                    isLogin: isLogin,
                    login: login,
                });
            }
        );
    }
};

exports.subirPost = (req, res) => {
    const pos = new PostModel({
        id: id++,
        fecha: new Date(req.body.fecha),
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        imagen: "./public/images/databaseimg/" + req.body.image,
        enlace: req.body.enlace,
        tags: req.body.tag,
    });

    res.status(200).render("edicionPosteos", { data: PostModel.find() });
    pos.save()
        .then((doc) => {
            console.log(doc);
            console.log("cargado");
        })
        .catch((err) => {
            console.error(err);
        });
    res.status(200).render("edicionPosteos", { data: PostModel.find() });
};


exports.edicion = (req, res) => {
    let id= req.params.id;
    PostModel.findOneAndUpdate({ id: id },
    { $set: { titulo: req.body.titulo,descripcion: req.body.descripcion,fecha: req.body.fecha,enlace: req.body.enlace,tags: req.body.tag} }, { new: true }, function (err, doc) {
        if (err) console.log("Error ", err);
                console.log("Updated Doc -> ", doc);
                PostModel.find().sort({id: -1}).exec(function(err, post) {   
                    console.log(post);
                    res.status(200).render("edicionPosteos", {data:post});
                });
                
            });
};

exports.visualizar = (req, res) => {
    let id= req.params.id;
    PostModel.find({ id:id }, (err, post) => {  
        console.log(post);
        res.status(200).render("visualizarPost", {data:post});
    }); 
};

exports.eliminar = (req, res) => {
    // let titulo = document.getElementById("titulo");
    // console.log(titulo.innerHTML); 
    User.findOneAndDelete({id: req.params['id']}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted User : ", docs);
        }
    });
};

exports.eliminarPost = (req, res) => {
    let id= req.params.id;
    PostModel.find({ id:id }).remove().exec();
    PostModel.find().sort({id: -1}).exec(function(err, post) {   
        console.log(post);
        res.status(200).render("edicionPosteos", {data:post});
    });
    res.redirect("/seccionAdmin");
}

exports.verPostsUsuario = (req, res) => {
    PostModel.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
            res.status(200).render("verPostsUsuario", {data: data});
        }
    }); 
};

exports.contactanos = (req, res) => {
    PostModel.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
            res.status(200).render("vistaContacto", {data: data});
        }
    }); 
};