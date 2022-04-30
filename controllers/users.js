const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { validationResult } = require('express-validator');

const usersGet = async (req = request, res = response) => {

    const { limit = 5, start = 0 } = req.query;
    const query = { state: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(start))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        totalFiltered: users.length,
        users
    });
}

const usersPost = async (req = request, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({
        name,
        email,
        password,
        role
    });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar en db
    await user.save();

    res.json(user);
}

const usersPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...user } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
    }

    const userDB = await User.findByIdAndUpdate(id, user);

    res.json(userDB);
}

const usersDelete = async (req = request, res = response) => {
    const { id } = req.params;

    // lo borramos fisicamente
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate(id, {state: false})

    res.json({
        user
    });
}

const usersPatch = (req = request, res = response) => {
    res.json({
        msg: "patch API - Controller"
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}