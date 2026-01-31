const db = require('../config/db_config');


async function getallT(id){
    try{
        let sql = `SELECT name, is_done FROM tasks WHERE user_id = ?`;
        let [row] = await db.query(sql, [id]);
        return row;
    }catch(err){
        
        throw err;
    }
}

async function checkaccessT(taskid,userid){
    try{
        let sql = `SELECT name, is_done FROM tasks WHERE id = ? AND user_id = ?`;
        let [row] = await db.query(sql,[taskid,userid]);
        return row[0];
    }catch(err){
        console.error("Error checking access:");
        throw err;
    }
}

async function getOneT(id) {
    try{
        let sql = `SELECT name, is_done FROM tasks WHERE id = ?`;
        let [row] = await db.query(sql,[id]);
        return row[0];
    }catch(err){
        console.error("Error getting one task:");
        throw err;
    }
}

async function addTask(name, cateid, userid) {
    try {
        let sql = `INSERT INTO tasks (name, category_id, user_id) VALUES (?, ?, ?)`;
        let [result] = await db.query(sql, [name, cateid, userid]);
        return result;
    } catch (err) {
        throw err;
    }
}

async function getTaskByname(name, userid) {
    try {
        let sql = `SELECT * FROM tasks WHERE name = ? AND user_id = ?`;
        let [row] = await db.query(sql, [name, userid]);
        return row[0];
    } catch (err) {
        throw err;
    }
}

async function deleteT(id) {
    try {
        let sql = `DELETE FROM tasks WHERE id = ?`;
        let [result] = await db.query(sql, [id]);
        return result;
    } catch (err) {
        throw err;
    }
}

async function updateT(id, task){
    let keys = Object.keys(task);
    let values = Object.values(task);
    let set  = keys.map(k =>`${k} = ?`).join(', ');
    let sql = `UPDATE tasks SET ${set} WHERE id = ?`;
    values.push(id);
    let [result] = await db.query(sql, values);
    return result;
}
module.exports={ 
    getallT,
    checkaccessT,
    getOneT,
    addTask,
    getTaskByname,
    deleteT,
    updateT,
}