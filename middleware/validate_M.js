function isValidId(req, res, next) {
    const id = req.params.id;
    if(isNaN(id) || id <= 0) {
        return res.status(400).json({message: "Invalid ID"});
    }
    req.id = id;
    next();
}

function VaulesToEdit(req, res, next) {
    
    let obj = [];
    if(req.body.name){
        obj.name = req.body.name;
    }
    if(req.body.email){
        obj.email = req.body.email;
    }
    if(req.body.username){
        obj.username = req.body.username;
    }
    Object.keys(obj);
    if(Object.keys(obj).length === 0){
        return res.status(400).json({message: "No values to edit"});
    }
    req.user = obj;
    next();
}

module.exports = {
    isValidId,
    VaulesToEdit,
}
