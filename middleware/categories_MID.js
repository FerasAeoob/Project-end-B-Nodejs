const jwt = require('jsonwebtoken');


function valuesToadd(req, res, next) {
    let name = req.body.name;
    if(!name){
        return res.status(400).json({message: "Category name is required"});
    }
    next();
}


module.exports ={
    valuesToadd,
}