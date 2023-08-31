const express = require('express');
const {check} = require("express-validator");

// controllers
const {createUser, loginUser, deleteUser, getUserByToken} = require("../controllers/users.controller");

// validators
const {emailExist,existUserByID, loginSuccess} = require("../helpers/db-validators");
const {validatorFields} = require("../middlewares/validator");

const router = express.Router();

// Crear usuario
router.post('/signup', [
    check('firstname', 'El nombre es requerido').not().isEmpty(),
    check('lastname', 'El apellido es requerido').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExist),
    check('password','La contraseña debe tener mas de 6 caracteres').isLength({min: 6}),
    validatorFields
],createUser)

// Inicio sesión
router.post('/login', [
    check('email','El correo no es valido').isEmail(),
    check('email').custom(loginSuccess),
    check('password','La contraseña es requerido'),
    validatorFields
],loginUser);

// Eliminar usuario
router.delete('/:id'
    ,[
        check('id','No es un id valido').isMongoId(),
        check('id').custom(existUserByID),
        validatorFields
    ]
    ,deleteUser
);

// Obtener datos por medio del token
router.post('/token'
    ,[
        check('token', 'token invalido').not().isEmpty(),
    ]
    ,getUserByToken
);

module.exports = router;