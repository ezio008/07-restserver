
const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPut, usersPost, usersDelete, usersPatch } = require('../controllers/users');
const { validateRole, validateEmail, validateIdExist } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/',usersGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('password', 'La contraseña debe ser de mas letras').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(validateEmail),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(validateRole),
    validateFields
], usersPost);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validateIdExist),
    check('role').custom(validateRole),
    validateFields
], usersPut);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validateIdExist),
    validateFields
], usersDelete);

router.patch('/', usersPatch);

module.exports = router;