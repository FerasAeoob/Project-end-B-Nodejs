const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../controller/users_C');
const {isValidId} = require('../middleware/validate_M');
const {getOneUser} = require('../controller/users_C');

router.get('/',getAllUsers);
router.get('/:id',isValidId,getOneUser);

module.exports = router;