const {getAll,getbyname,addToCategories} = require('../model/categories_M');


async function getAllCategories(req, res) {
    try{
        console.log("hi");
        let categories = await getAll();
        if(categories.length === 0){
            return res.status(404).json({message: "no categories found"});
        }
        res.status(200).json(categories);
    }catch(err){
        res.status(500).json({message: "server error"});
    }
}

async function createcategorie(req, res) {
    try {
        
        const check = await getbyname(req.body.name);

        if (check) {
            return res.status(400).json({ message: "Category name already exists" });
        }
        
        const payload = req.user;
        
        const result = await addToCategories(req.body.name, payload.id);
        
        res.status(201).json({message: "Category created successfully"});
        
        

    } catch (err) {
        // very important for debugging
        res.status(500).json({ message: "server error" });
    }
}



module.exports ={
    getAllCategories,
    createcategorie,  
}