const express = require('express');
const router = express.Router();
const {valuesToAdd} = require('../middleware/auth_MID');
const {register,login,createjwt} = require('../controller/auth_C');
const {encryptPassword,valuesToLogin} = require('../middleware/auth_MID');






router.post('/reg',valuesToAdd,encryptPassword,register);
router.post('/login',valuesToLogin,login,createjwt);





module.exports = router;