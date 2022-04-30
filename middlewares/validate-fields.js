const { response, request } = require("express");
const { validationResult } = require("express-validator");

const validateFields = (next, req = request, res = response ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validateFields
}