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
        const { text, category_id } = req.task;
        const userId = req.user.id;

      

        if (category_id) {
            const access = await checkaccess(category_id, userId);
            if (!access) {
                return res.status(403).json({ message: "You don't have access to this category" });
            }
        }

        await addTask(text, category_id || null, userId);
        
        return res.status(201).json({ message: "Task created successfully" });

    } catch (err) {
        console.error("CREATE TASK ERROR:", err); // SEE THIS IN YOUR TERMINAL
        return res.status(500).json({ error: err.message });
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
            return res.status(404).json({ message: "no edits" });
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