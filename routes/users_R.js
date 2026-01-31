const express = require('express');
const router = express.Router();
const {getAllUsers,deleteUser,getOneUser,updateUser} = require('../controller/users_C');
const {isValidId,VaulesToEdit} = require('../middleware/validate_M');
const {islogged} = require('../middleware/auth_MID');




router.get('/',islogged,getAllUsers);
router.get('/:id',islogged,isValidId,getOneUser);
router.delete('/:id',islogged,isValidId,deleteUser);
router.patch('/:id',islogged,isValidId,VaulesToEdit,updateUser);

module.exports = router;