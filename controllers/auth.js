const { response } = require("express");
const { request } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generate-jwt");

const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar el JWT
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    login
};
