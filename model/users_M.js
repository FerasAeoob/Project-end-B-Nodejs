const db = require('../config/db_config');

async function getAll(){
    try{
        let sql = `SELECT * FROM users`;
        let [row] = await db.query(sql);
        return row;
    }catch(err){
        
        throw err;
    }
}

async function getOne(id){
    try{
        let sql = `SELECT * FROM users WHERE id = ${id}`;
        let [row] = await db.query(sql);
        return row;
    }catch(err){
        throw err;
    }
}
module.exports ={
    getAll,
    getOne,
}