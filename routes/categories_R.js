const express = require('express');
const router = express.Router();
const {getAllCategories,createcategorie} = require('../controller/categories_C');
//const {register,login,createjwt} = require('../controller/categories_C');
const {islogged} = require('../middleware/auth_MID');
const {valuesToadd} = require('../middleware/categories_MID');



router.get('/',islogged,getAllCategories);
router.post('/add',islogged,valuesToadd,createcategorie);

module.exports = router;