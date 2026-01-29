const {getAll} = require('../model/users_M');
const {getOne} = require('../model/users_M');

async function getAllUsers(req, res) {
    try{
        console.log("hi");
        rows = await getAll();
        res.status(200).json(rows);
    }catch(err){
        res.status(500).json({message: "err"});
    }
    
}

async function getOneUser(req, res) {
    try{
        console.log("hi");
        rows = await getOne(req.id);
        res.status(200).json(rows);
    }catch(err){
        res.status(500).json({message: "err"});
    }
}

module.exports ={
    getAllUsers,
    getOneUser,
}