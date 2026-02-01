const db = require('../config/db_config');


async function getallT(id){
    try{
       let sql = `
  SELECT 
    tasks.*,
    COALESCE(categories.name, 'No category') AS category_name
  FROM tasks
  LEFT JOIN categories 
    ON tasks.category_id = categories.id
  WHERE tasks.user_id = ?
`;

        let [row] = await db.query(sql, [id]);
        return row;
    }catch(err){
        
        throw err;
    }
}

async function checkaccessT(taskid,userid){
    try{
        let sql = `SELECT text, is_done FROM tasks WHERE id = ? AND user_id = ?`;
        let [row] = await db.query(sql,[taskid,userid]);
        return row[0];
    }catch(err){
        console.error("Error checking access:");
        throw err;
    }
}

async function getOneT(id) {
    try{
        let sql = `SELECT text, is_done FROM tasks WHERE id = ?`;
        let [row] = await db.query(sql,[id]);
        return row[0];
    }catch(err){
        console.error("Error getting one task:");
        throw err;
    }
}

async function addTask(text, cateid, userid) {
    try {
        let sql = `INSERT INTO tasks (text, category_id, user_id) VALUES (?, ?, ?)`;
        let [result] = await db.query(sql, [text, cateid, userid]);
        return result;
    } catch (err) {
        throw err;
    }
}

async function getTaskByname(text, userid) {
    try {
        let sql = `SELECT * FROM tasks WHERE text = ? AND user_id = ?`;
        let [row] = await db.query(sql, [text, userid]);
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