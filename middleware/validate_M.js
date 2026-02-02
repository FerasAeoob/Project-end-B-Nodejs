const argon2 = require('argon2'); 
function isValidId(req, res, next) {
    const id = req.params.id;
    if(isNaN(id) || id <= 0) {
        return res.status(400).json({message: "Invalid ID"});
    }
    req.id = id;
    next();
}

async function VaulesToEdit(req, res, next) {
    try{
    let obj = {};
    if(req.body.name){
        obj.name = req.body.name;
    }
    if(req.body.email){
        obj.email = req.body.email;
    }
    if(req.body.username){
        obj.username = req.body.username;
    
    }
    if(req.body.password){
        obj.password = await argon2.hash(req.body.password, {type: argon2.argon2id});
    }
    Object.keys(obj);
    if(Object.keys(obj).length === 0){
        return res.status(400).json({message: "No values to edit"});
    }
    req.usereidt = obj;
    next();
    }catch(err){
        console.error("Error encrypting password:", err);
        
    }
}


module.exports = {
    isValidId,
    VaulesToEdit,
}
