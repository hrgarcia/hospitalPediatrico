const Admin = require("../models/myModel");
const moment = require("moment");
let login;

//Ejemplo de respuesta a una petición de tipo GET
exports.inicio = (req, res) => {
res.status(200).render("index", { login:login, isLogin:isLogin});

};

const msg = new Admin({
    nombre: "admin",
    apellido: "1",
    usuario: "Admin1",
    contraseña: "administrador",
    avatar: "...",
    email: "adminhospital@gmail.com",
});

// msg.save()
//    .then(doc => {
//      console.log(doc)
//    })
//    .catch(err => {
//      console.error(err)
//   })
