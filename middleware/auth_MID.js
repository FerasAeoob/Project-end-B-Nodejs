const argon2 = require('argon2'); // i used argon2id instead of btcrypt for password hashing
const jwt = require('jsonwebtoken');
function valuesToAdd(req, res, next) {
    let {name, username, email, password} = req.body;
    if (!name || !email || !username || !password) {
        return res.status(400).json({message: "Missing required fields"});
    }
    let obj = {name, email, username, password};
    req.user = obj;
    
    next();
}

function valuesToLogin(req,res,next){
    const password = req.body.password;
    const username = req.body.username;
    if(!username || !password){
        return res.status(400).json({message:"Please fill all filed"})
    }
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

function islogged(req, res, next) {
    console.log("got to here");
    let token = req.cookies.jwt2;  // Correct cookie access

    if (!token) {
        return res.status(401).json({ message: "Please login" });
    }

    try {
        
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.user = payload;
        next();
    } catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(401).json({ message: "Invalid token" });
    }
}




module.exports = {
    valuesToAdd,
    encryptPassword,
    valuesToLogin,
    islogged,
    
}