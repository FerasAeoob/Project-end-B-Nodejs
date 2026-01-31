const express = require('express');
const router = express.Router();
const {getAlltasks,getOnetask,createTask} = require('../controller/tasks_C');
const {islogged} = require('../middleware/auth_MID');
const {isValidId,valuesToadd,valuesToaddT} = require('../middleware/tasks_MID');





router.get('/',islogged,getAlltasks);
router.get('/:id',islogged,isValidId,getOnetask);
router.post('/',islogged,valuesToaddT,createTask);
// router.delete('/:id',islogged,isValidId,deleteTask);
// router.patch('/:id',islogged,isValidId,VaulesToEdit,updateTask);

module.exports = router;