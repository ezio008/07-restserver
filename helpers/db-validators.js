const Role = require('../models/role');
const User = require('../models/user');

const validateRole = async (role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`El rol ${role} no esta registrado en la BD`);
    }
}

const validateEmail = async (email = '') => {
    const existeEmail = await User.findOne({ email });
    
    if (existeEmail) {
        throw new Error(`El correo ${email} ya existe`);
    }
}

const validateIdExist = async (id) => {
    const idExist = await User.findById(id);
    
    if (!idExist) {
        throw new Error(`No existe el id ${ id }`);
    }
}

module.exports = {
    validateRole,
    validateEmail,
    validateIdExist
};