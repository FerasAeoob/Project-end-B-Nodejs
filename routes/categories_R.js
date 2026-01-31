const express = require('express');
const router = express.Router();
const {getAllCategories,createcategorie,getCategoryById,deleteCategory,updateCategory,} = require('../controller/categories_C');
//const {register,login,createjwt} = require('../controller/categories_C');
const {islogged} = require('../middleware/auth_MID');
const {valuesToadd,VaulesToEdit} = require('../middleware/categories_MID');
const {isValidId} = require('../middleware/validate_M');




router.get('/',islogged,getAllCategories);
router.post('/',islogged,valuesToadd,createcategorie);
router.get('/:id',islogged,isValidId,getCategoryById);
router.delete('/:id',islogged,isValidId,deleteCategory);

router.patch('/:id',islogged,isValidId,VaulesToEdit,updateCategory);
module.exports = router;