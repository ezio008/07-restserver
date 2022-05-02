const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const validateProducts = require('../middlewares/validate-products');
const validateRoles = require('../middlewares/validate-roles');
const validateSearch = require('../middlewares/validate-search');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateProducts,
    ...validateRoles,
    ...validateSearch
}
