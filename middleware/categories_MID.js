const jwt = require('jsonwebtoken');
const { getbyid } = require('../model/categories_M');


function valuesToadd(req, res, next) {
    let name = req.body.name;
    if(!name){
        return res.status(400).json({message: "Category name is required"});
    }
    next();
}

function VaulesToEdit(req, res, next) {
    
    let obj = getbyid(req.params.id);
    let name = req.body.name;
    let id = req.params.id;
    let userid = req.user.id;
    if(!name){
        return res.status(400).json({message: "No values to edit"});
    }
    if(isNaN(id) || id <=0 || !obj) {
        return res.status(400).json({message: "Invalid ID"});
    }
    req.category = {id, name, userid};
    next();
}

module.exports ={
    valuesToadd,
    VaulesToEdit,
}