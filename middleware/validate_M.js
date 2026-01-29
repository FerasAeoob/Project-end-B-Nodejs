function isValidId(req, res, next) {
    const id = req.params.id;
    if(isNaN(id) || id <= 0) {
        return res.status(400).json({message: "Invalid ID"});
    }
    req.id = id;
    next();
}
module.exports = {
    isValidId,
}
