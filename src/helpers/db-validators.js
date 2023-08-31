// Models
const User = require("../models/user.model");

const emailExist = async (email = '')=> {
    const userExist = await User.findOne({ email })
    if(userExist){
        throw new Error(`El correo ya esta en uso`)
    }
}

const loginSuccess = async (email = '')=> {
    const userExist = await User.findOne({ email })

    if(!userExist){
        throw new Error(`Correo o contraseña incorrectas`)
    }
}

const existUserByID = async (id = '')=> {
    const userExist = await User.findById(id)

    if(!userExist){
        throw new Error(`El id ${id} no existe`)
    }
}

module.exports = {
    emailExist,
    existUserByID,
    loginSuccess,
}