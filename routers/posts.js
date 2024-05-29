const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");

const multer = require("multer");
const uploader = multer({dest: "public"})

router.get("/", postsController.index);

router.post("/", uploader.single("immagine") ,postsController.store);

router.get("/:slug", postsController.show)

module.exports = router;