function isValidId(req, res, next) {
    const id = req.params.id;
    if(isNaN(id) || id <= 0) {
        return res.status(400).json({message: "Invalid ID"});
    }
    req.id = id;
    next();
}

function valuesToaddT(req, res, next) {
    let text = req.body.text;
    let category_id = req.body.category_id;
    if (!text) {
        return res.status(400).json({message: "Missing required fields"});
    }
    req.task = {text, category_id};
    next();
}

function VaulesToEditT(req, res, next) {
    
    let obj = {};
    if(req.body.text){
        obj.text = req.body.text;
    }
    if(req.body.is_done !== undefined){
        obj.is_done = req.body.is_done;
    }
    if(req.body.category_id){
        obj.category_id = req.body.category_id;
    }
    Object.keys(obj);
    if(Object.keys(obj).length === 0){
        return res.status(400).json({message: "No values to edit"});
    }
    
    req.taskEdit = obj;
    
    next();
}

module.exports = {
    isValidId,
    valuesToaddT,
    VaulesToEditT,
}