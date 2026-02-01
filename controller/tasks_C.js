const {getallT,checkaccessT,getOneT,addTask,getTaskByname,deleteT,updateT} = require('../model/tasks_M');
const {checkaccess,getbyid} = require('../model/categories_M');

async function getAlltasks(req, res) {
    try {
        const tasks = await getallT(req.user.id);
        res.status(200).json(tasks); 
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getOnetask(req, res) {
    try {
        const access = await checkaccessT(req.params.id,req.user.id);
        if (!access) {
            return res.status(403).json({ message: "you dont have access to this task" });
        }
        const task = await getOneT(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createTask(req, res) {
    try {
        let task = req.task;
        if(await getTaskByname(task.text, req.user.id)){
            return  res.status(409).json({ message: "Task name already exists" });
        }
        
        if(!task.category_id){
            const result = await addTask(task.text, task.category_id, req.user.id);
        res.status(201).json({ message: "Task created successfully" });
        }
        else{
            const access = await checkaccess(task.category_id,req.user.id);
            if (!access) {
                return res.status(403).json({ message: "you dont have access to this category" });
            }
            const result = await addTask(task.text, task.category_id, req.user.id);
        res.status(201).json({ message: "Task created successfully" });
        } 
    }     
    catch (err) {
        res.status(500).json({ error: err.message });
    }
    
}


async function deleteTask(req, res) {
    try {
        const isexist = await getOneT(req.params.id);
        if (!isexist) {
            return res.status(404).json({ message: "Task not found" });
        }
        const access = await checkaccessT(req.params.id,req.user.id);
        if (!access) {
            return res.status(403).json({ message: "you dont have access to this task" });
        }
        
        const result = await deleteT(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function editTask(req, res) {

    try {
        
        const isexist = await getOneT(req.params.id);
        if (!isexist) {
            return res.status(404).json({ message: "Task not found" });
        }
        const access = await checkaccessT(req.params.id,req.user.id);
        if (!access) {
            return res.status(403).json({ message: "you dont have access to this task" });
        }
        
        const result = await updateT(req.params.id, req.taskEdit);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        res.status(200).json({ message: "Task updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAlltasks,
    getOnetask,
    createTask,
    deleteTask,
    editTask,
}