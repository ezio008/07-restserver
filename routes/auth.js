const { Router } = require('express');
const { check } = require('express-validator');

const {login} = require('../controllers/auth');
const { validateNotExistEmail, validateUserActive } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('email').custom(validateNotExistEmail),
    check('email').custom(validateUserActive),
    check('password', 'la contraseña es obligatoria').notEmpty(),
    validateFields
],login);

module.exports = router;