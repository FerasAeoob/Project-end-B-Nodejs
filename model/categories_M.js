const db = require('../config/db_config');


async function getAll(id){
    try{
        let sql = `SELECT * FROM categories WHERE user_id = ?`;
        let [row] = await db.query(sql, [id]);
        return row;
    }catch(err){
        console.error("Error getting all categories:");
        throw err;
    }   
}
async function getbyname(name,userid) {
    try{
        let sql = `SELECT * FROM categories WHERE name = ? AND user_id = ?`;
        let [row] = await db.query(sql,[name, userid]);
        return row[0];
    }catch(err){
        console.error("Error getting category by name:");
        throw err;
    }
}

async function addToCategories(name,userid) {
    try{
        let sql = `INSERT INTO categories (name,user_id) VALUES (?,?)`;
        let [result] = await db.query(sql,[name,userid]);
        return result;
    }catch(err){
        console.error("Error adding category:");
        throw err;
    }
}

async function getbyid(id) {
    try{
        let sql = `SELECT * FROM categories WHERE id = ?`;
        let [row] = await db.query(sql,[id]);
        return row[0];
    }catch(err){
        console.error("Error getting category by id:");
        throw err;
    }
}

async function remove(catid,userid){
    let sql = `DELETE FROM categories WHERE id = ? AND user_id = ?`;
    let [result] = await db.query(sql,[catid,userid]);
    return result.affectedRows;
}

async function checkaccess(catid,userid){
    try{
        
        let sql = `SELECT * FROM categories WHERE id = ? AND user_id = ?`;
        let [row] = await db.query(sql,[catid,userid]);
        
        return row[0];
        
    }catch(err){
        console.error("Error checking access:");
        throw err;
    }
}

async function update(catid, category){
    try{
        let sql = `UPDATE categories SET name = ? WHERE id = ?`;
        let [result] = await db.query(sql,[category, catid]);
        return result.affectedRows;
    }catch(err){
        console.error("Error updating category:");
        throw err;
    }
}

async function removeWithTasks(catid, userid) {
    try{
    
    await db.query(`DELETE FROM tasks WHERE category_id = ? AND user_id=?`, [catid,userid]);;
    let sql = `DELETE FROM categories WHERE id = ? AND user_id = ?`;
    let [result] = await db.query(sql, [catid, userid]);
    return result.affectedRows;
    }catch(err){
        console.error("remove all tasks error");
        throw err;
    }
}


module.exports ={
    getAll,
    addToCategories,
    getbyname,
    getbyid,
    remove,
    checkaccess,
    update,
    removeWithTasks,
    
    
}