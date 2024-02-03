const express = require("express");

const {
  getTags,
  createTag,
  updateTag,
  deleteTag,
} = require("../controllers/tags.controller");

const router = express.Router();

// Obtener tags
router.get("/:id", getTags);

// Crear un tag
router.post("/", createTag);

// Actualizar un post
router.put("/", updateTag);

// Eliminar un post
router.delete("/:id", deleteTag);

module.exports = router;
