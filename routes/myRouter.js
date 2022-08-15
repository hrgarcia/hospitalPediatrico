const Post = require("../models/postModel");
const myController = require("../controllers/myController");
const adminController = require("../controllers/adminController");
const express = require("express");
const router = express.Router();

//Defino rutas y acciones de respuesta
router.route("/").get(myController.inicio);
router.route("/login").get(adminController.vista).post(adminController.logine);
router.route("/logout").get(adminController.logout);
router.route("/subirPost").get(adminController.postear2);
router.route("/seccionAdmin").get(adminController.seccionAdmin);
router.route("/postear").post(adminController.subirPost);
router.route("/edicion").get(adminController.edicion);
router.route("/editarPosteo").get(adminController.editarPost);
router.route("/config").get(adminController.config);
router.route("/ChangePassword").get(adminController.seccionAdmin).post(adminController.ChangePassword);
router.route("/ChangeUser").get(adminController.seccionAdmin).post(adminController.ChangeUser);
router.route("/user").get(adminController.user);
router.route("/visualizar").get(adminController.visualizar);
router.route("/kinesiologia*").get(adminController.kinesiologia);
router.route("/saludMental*").get(adminController.saludMental);
router.route("/neumonologia*").get(adminController.neumonologia);
router.route("/*").get(adminController.error404);
module.exports = router;
