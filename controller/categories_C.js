const {getAll,getbyname,addToCategories,getbyid,remove,checkaccess,update,removeWithTasks} = require('../model/categories_M');


async function getAllCategories(req, res) {
    try{     
        let categories = await getAll(req.user.id);
        if(categories.length === 0){
            return res.status(204).json({message: "no categories found"});
        }
        else{
        res.status(200).json(categories);
        }
    }catch(err){
        res.status(500).json({message: "server error"});
    }
}

async function createcategorie(req, res) {
    try {
        if (!req.category || !req.category.name) {
            return res.status(400).json({ message: "Invalid category data" });
        }
        const check = await getbyname(req.category.name,req.user.id);
        if (check && check.user_id === req.user.id) {
            return res.status(409).json({ message: "Category name already exists for your account" });
        }
        
        // 3. Insert
        await addToCategories(req.category.name, req.user.id);
        
        res.status(201).json({ message: "Category created successfully" });

    } catch (err) {
        console.error("Create Category Error:", err); // ALWAYS log the error to your terminal
        res.status(500).json({ message: "server error" });
    }
}

async function getCategoryById(req, res) {
    try {
        
        const category = await getbyid(req.params.id);
        
        if (!category) {
            return res.status(204).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: "serverdd error" });
    }
}

async function deleteCategory(req, res) {
    
    try{
        let affectedRows = await remove(req.params.id,req.user.id);
        if (!affectedRows) {
            return res.status(204).json({message: "category not found"});
        }
        res.status(200).json({message: "category deleted"});
    }catch(err){
        if(err.errno == 1451){
            return res.status(409).json({message:"Category have tasks. Delete anyway?"});
        }
        res.status(500).json({message: "server error"});
    }
}

async function forceDeleteCategory(req, res) {
    try {
        await removeWithTasks(req.params.id, req.user.id);
        res.status(200).json({ message: "Category and tasks deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

async function updateCategory(req, res) {
    try{
        let access = await checkaccess(req.category.id, req.category.userid);
        if (!access) {
            return res.status(403).json({message: "Access denied"});
        }
        let id = req.category.id;
        let name = req.body.name;
        let affectedRows = await update(id, name);
        if (!affectedRows) {
            return res.status(404).json({message: "category not found"});
        }

        res.status(202).json({message: "category updated"});
    }catch(err){
        res.status(500).json({message: "server error"});
    }
}


module.exports ={
    getAllCategories,
    createcategorie,
    getCategoryById,
    deleteCategory,
    updateCategory,
    forceDeleteCategory,
}