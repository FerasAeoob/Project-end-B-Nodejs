const argon2 = require('argon2'); // i used argon2id instead of btcrypt for password hashing

function valuesToAdd(req, res, next) {
    let {name, username, email, password} = req.body;
    if (!name || !email || !username || !password) {
        return res.status(400).json({message: "Missing required fields"});
    }
    let obj = {name, email, username, password};
    req.user = obj;
    
    next();
}

async function encryptPassword(req, res, next) {
    try {
        const hash = await argon2.hash(req.user.password, {type: argon2.argon2id});
        req.user.password = hash;
        console.log("Password encrypted");
        next();
        
    } catch (err) {
        console.error("Error encrypting password:", err);
        res.status(500).json({message: "server error"});
    }
    
}



module.exports = {
    valuesToAdd,
    encryptPassword,
    
}