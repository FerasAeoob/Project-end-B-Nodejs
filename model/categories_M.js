const db = require('../config/db_config');


async function getAll(){
    try{
        let sql = `SELECT name FROM categories`;
        let [row] = await db.query(sql);
        return row;
    }catch(err){    
        throw err;
    }   
}
async function getbyname(name) {
    try{
        let sql = `SELECT * FROM categories WHERE name = ?`;
        let [row] = await db.query(sql,[name]);
        return row[0];
    }catch(err){
        throw err;
    }
}

async function addToCategories(name,userid) {
    try{
        let sql = `INSERT INTO categories (name,user_id) VALUES (?,?)`;
        let [result] = await db.query(sql,[name,userid]);
        return result;
    }catch(err){
        throw err;
    }
}


module.exports ={
    getAll,
    addToCategories,
    getbyname,
}