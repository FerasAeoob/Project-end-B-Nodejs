const express = require('express');
const router = express.Router();
const {valuesToAdd} = require('../middleware/auth_Mid');
const {register,login} = require('../controller/auth_C');
const {encryptPassword} = require('../middleware/auth_Mid');






router.post('/reg',valuesToAdd,encryptPassword,register);
router.post('/login',login);




module.exports = router;