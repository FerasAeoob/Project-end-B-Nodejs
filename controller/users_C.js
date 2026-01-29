const {getAll} = require('../model/users_M');
const {getOne} = require('../model/users_M');
const {remove} = require('../model/users_M');
const {update} = require('../model/users_M');

async function getAllUsers(req, res) {
    try{
        console.log("hi");
        rows = await getAll();
        res.status(200).json(rows);
    }catch(err){
        res.status(500).json({message: "server error"});
    }
    
}

async function getOneUser(req, res) {
    try{
        console.log("hi");
        rows = await getOne(req.id);
        res.status(200).json(rows);
    }catch(err){
        res.status(500).json({message: "server error"});
    }
}

async function deleteUser(req, res) {
    let affectedRows = await remove(req.id,req.user);
    try{
        if (!affectedRows) {
            return res.status(400).json({message: "user not found"});
        }
        res.status(200).json({message: "user deleted"});
    }catch(err){
        res.status(500).json({message: "server error"});
    }
}

async function updateUser(req, res) {
    try{
        let affectedRows = await update(req.id, req.user);
        if (!affectedRows) {
            return res.status(400).json({message: "user not found"});
        }
        res.status(200).json({message: "user updated"});
    }catch(err){
        res.status(500).json({message: "server error"});
    }
}

module.exports ={
    getAllUsers,
    getOneUser,
    deleteUser,
    updateUser,
}