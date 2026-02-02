const {getAll, getbyuname, getbyemail} = require('../model/users_M');
const {getOne} = require('../model/users_M');
const {remove} = require('../model/users_M');
const {update} = require('../model/users_M');
const {getallT} = require('../model/tasks_M');
const categoriesModel = require('../model/categories_M');
async function getAllUsers(req, res) {
    try{
        
        let users = await getAll();
        if(users.length === 0){
            return res.status(404).json({message: "no users found"});
        }
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message: "server error"});
    }
    
}

async function getOneUser(req, res) {
    try{
        let rows = await getOne(req.id);
        res.status(200).json(rows);
    }catch(err){
        res.status(500).json({message: "server error"});
    }
}

async function deleteUser(req, res) {
    try{
        
        const tasks = await getallT(req.params.id);        
        const cats = await categoriesModel.getAll(req.params.id);
        
        if (tasks.length > 0 || cats.length > 0) {
            return res.status(409).json({message: "user has tasks or categories"});
        }

        let affectedRows = await remove(req.params.id);
        if (!affectedRows) {
            return res.status(400).json({message: "user not found"});
        }

        res.status(200).json({message: "user deleted"});
    } catch(err) {
        console.error(err); // log actual error
        res.status(500).json({message: "server error"});
    }
}


async function updateUser(req, res) {
    try {
        if (req.usereidt.username) {
            const existingUser = await getbyuname(req.usereidt.username);
            if (existingUser && existingUser.id != req.id) {
                return res.status(409).json({ message: "Username already exists" });
            }
        }
        if (req.usereidt.email) {
            const existingemail = await getbyemail(req.usereidt.email);
            if (existingemail && existingemail.id != req.id) {
                return res.status(409).json({ message: "Email already exists" });
            }
        }

        let affectedRows = await update(req.id, req.usereidt);
        
        if (!affectedRows) {
            return res.status(400).json({ message: "User not found or no changes made" });
        }
        
        res.status(200).json({ message: "User updated" });
    } catch (err) {
        console.error(err); // This helps you see the REAL error in the terminal
        res.status(500).json({ message: "Server error" });
    }
}

module.exports ={
    getAllUsers,
    getOneUser,
    deleteUser,
    updateUser,
}