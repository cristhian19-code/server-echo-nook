const express = require('express');

const { validatorFields } = require('../middlewares/validator');
const { existUserByID } = require('../helpers/db-validators');
const { check } = require('express-validator');

const { getTags, createTag, updateTag, deleteTag } = require('../controllers/tags.controller');

const router = express.Router();

// Obtener tags
router.get('/', getTags);

// Crear un tag
router.post('/:id', [
    check('id').custom(existUserByID),
    validatorFields
],createTag);

// Actualizar un post
router.put('/', updateTag);

// Eliminar un post
router.delete('/:id', deleteTag);

module.exports = router;