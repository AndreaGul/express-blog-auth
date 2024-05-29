const express = require("express");
const router = express.Router();
const loginController= require("../controllers/auth");

router.post("/", loginController.auth);

module.exports = router;