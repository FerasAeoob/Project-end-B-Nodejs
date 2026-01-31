const {getallT,checkaccessT,getOneT,addTask,getTaskByname} = require('../model/tasks_M');
const {checkaccess,getbyid} = require('../model/categories_M');

async function getAlltasks(req, res) {
    try {
        const tasks = await getallT(req.user.id);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getOnetask(req, res) {
    try {
        const access = await checkaccessT(req.params.id,req.user.id);
        if (!access) {
            return res.status(404).json({ message: "you dont have access to this task" });
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
        if(await getTaskByname(task.name, req.user.id)){
            return  res.status(400).json({ message: "Task name already exists" });
        }
        
        if(!task.category_id){
            const result = await addTask(task.name, task.category_id, req.user.id);
        res.status(201).json({ message: "Task created successfully" });
        }
        else{
            const access = await checkaccess(task.category_id,req.user.id);
            if (!access) {
                return res.status(404).json({ message: "you dont have access to this category" });
            }
            const result = await addTask(task.name, task.category_id, req.user.id);
        res.status(201).json({ message: "Task created successfully" });
        } 
    }     
    catch (err) {
        res.status(500).json({ error: err.message });
    }
    
}

module.exports = {
    getAlltasks,
    getOnetask,
    createTask,
}