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
        let sql = `SELECT * FROM users WHERE id = ?`;
        let [row] = await db.query(sql,[id]);
        return row;
    }catch(err){
        throw err;
    }
}

async function remove(id){
    let sql = `DELETE FROM users WHERE id = ?`;
    let [result] = await db.query(sql,[id]);
    return result.affectedRows;
}

async function update(id, user){
    let keys = Object.keys(user);
    let values = Object.values(user);
    let set  = keys.map(k =>`${k} = ?`).join(', ');
    let sql = `UPDATE users SET ${set} WHERE id = ?`;
    let [result] = await db.query(sql,[...values, id]);
    return result.affectedRows;
}
module.exports ={
    getAll,
    getOne,
    remove,
    update,
}