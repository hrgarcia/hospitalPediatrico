const Admin = require("../models/myModel");
const Post = require("../models/postModel");
const moment = require("moment");

//Ejemplo de respuesta a una petición de tipo GET
exports.inicio = (req, res) => {
    res.status(200).render("index");
    console.log("hola");
};

exports.subirPost = (req,res)  => {
  let id = 0;
  const pos = new Post({"id": id++,"fecha": req.body.fecha, "titulo":req.body.titulo, "descripcion":req.body.descripcion, "imagen":req.body.imagen, "enlace":req.body.enlace, "tag":req.body.tag });
  
  // pos.save()
  //  .then(doc => {
  //    console.log(doc)
  //  })
  //  .catch(err => {
  //    console.error(err)
  // })
};

const msg = new Admin({
    nombre:"admin",
    apellido:"1",
    usuario:"Admin1",
    contraseña:"administrador",
    avatar:"...",
    email:"adminhospital@gmail.com"
  })


// msg.save()
//    .then(doc => {
//      console.log(doc)
//    })
//    .catch(err => {
//      console.error(err)
//   })
