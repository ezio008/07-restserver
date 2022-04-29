
const { response, request } = require('express');

const usersGet = (req = request, res = response) => {

    const {q, nombre='No name', apikey, page = 1, limit} = req.query;

    res.json({
        msg: "get API - Controller",
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usersPost = (req = request, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: "post API - Controller",
        nombre,
        edad
    });
}

const usersPut = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        msg: "put API - Controller",
        id
    });
}

const usersDelete = (req = request, res = response) => {
    res.json({
        msg: "delete API - Controller"
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