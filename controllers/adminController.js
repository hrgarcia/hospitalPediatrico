const OneModel = require("../models/adminModel");
const moment = require("moment");

//Peticion POST para inicio de sesion
exports.login = (req, res) => {
    console.log("hola");
    console.log(req.body.password);
    adminModel.find(
        { user: req.body.user, password: req.body.password },
        function (err, docs) {
            if (docs == undefined) {
                console.log("ingresa otra vez");
            }
        }
    );
};

//let sql = `SELECT contraseña FROM usuarios WHERE usuario = ?`;

//db.query(sql, [req.body.usuario], (err, data, fields) => {
// if (err) throw err;

// bcrypt.compare(contraseña, data[0].contraseña, function (err, result) {
// if (err) throw err;
// if (result == true) {
//     creado = true;
//res.redirect("/videoclub");
// } else {
//     creado = false;
//     //res.redirect("/login");
//         }
//    //});
// //});
