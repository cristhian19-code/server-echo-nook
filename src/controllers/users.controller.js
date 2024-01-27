const { request, response } = require('express')
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const SECRET_KEY = "MEMORY_KEY_APP"

const createUser = async (req = request, res = response) => {
    try {
        const { password } = req.body;

        const user = await User(req.body);

        const salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(200).json({
            message: "Usuario creado correctamente"
        })
    } catch (e) {
        res.json({
            error: 'Hubo un problema con el servidor'
        })
    }
}

const getUserByToken = async (req = request, res = response) => {
    const { token } = req.body
    try {
        const decrypt = await jwt.verify(token, SECRET_KEY);
        res.json(decrypt)
    } catch (e) {
        console.log(e)
        res.json(null)
    }
}

const loginUser = async (req = request, res = response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        const isValid = await bcrypt.compareSync(password, user.password);

        if (!isValid) return res.status(404).json({ error: "Credenciales incorrectas" });
        if (!user.active) return res.status(404).json({ error: "La cuenta fue eliminada, contactarse con soporte" });

        const payload = {
            firstname: user.firstname,
            email: user.email,
            _id: user._id
        }

        const token = await jwt.sign(payload, SECRET_KEY)

        res.status(200).json({
            token,
            user: payload
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: 'Hubo un problema con el servidor'
        })
    }
}

const deleteUser = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        await User.findOneAndUpdate(id, { active: false });

        res.status(200).json({
            message: "Usuario eliminado correctamente"
        })
    } catch (e) {
        res.json({
            error: 'Hubo un problema con el servidor'
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    deleteUser,
    getUserByToken
}