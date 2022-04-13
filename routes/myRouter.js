const myController = require("../controllers/myController");
const adminController = require("../controllers/adminController");
const express = require("express");
const router = express.Router();

//Defino rutas y acciones de respuesta
router.route("/").get(myController.inicio);
router.route("/login").post(adminController.logine);

module.exports = router;


