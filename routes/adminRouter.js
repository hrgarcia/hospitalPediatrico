const adminController = require("../controllers/adminController");
const express = require("express");
const router = express.Router();

//Defino rutas y acciones de respuesta
router.route("/login").post(adminController.login);
module.exports = router;
