const db = require('../config/db_config');
const argon2 = require('argon2');

async function getAll(){
    try{
        let sql = `SELECT id, name, email FROM users`;
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

async function getbyuname(uname) {
    try {
        let sql = `SELECT * FROM users WHERE username = ?`;
        let [row] = await db.query(sql, [uname]);
        return row[0];
    } catch (err) {
        console.error("Error getting user by username:", err);
        throw err; 
    }
}

async function getbyemail(email) {
    try {
        let sql = `SELECT * FROM users WHERE email = ?`;
        let [row] = await db.query(sql, [email]);
        return row[0];
    } catch (err) {
        console.error("Error getting user by email:", err);
        throw err;
    }

}

async function addUser({name, email, username, password}) {
    try {
        // Use [result] to destructure the array returned by mysql2/promise
        const [result] = await db.query(
            'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)',
            [name, username, email, password]
        );
        
        console.log("User added ID:", result.insertId); 
        return result; 
        
    } catch (err) {
        console.error("Error in addUser model:", err); 
        throw err; // This allows the controller's catch block to see the error
    }
}

async function verifypassword(username, password) {
    try{
        const sql = `SELECT * FROM users WHERE username = ?`;
        const [rows] = await db.query(sql, [username]);
        if(!rows){
            console.log("username not found 'caught at the password verification' ");
            return false;
        }
       
        const user = rows[0];
        const hashed = user.password;

        const isVaild = await argon2.verify(hashed, password);
        return isVaild;
    }catch(err){
        console.error("Error verifying password");
        throw err;

    }
    
}





module.exports ={
    getAll,
    getOne,
    remove,
    update,
    addUser,
    getbyuname,
    getbyemail,
    verifypassword,
}