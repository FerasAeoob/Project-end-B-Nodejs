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
    const token = req.cookies.jwt2;
    console.log("got here");
    if (!token) {
        return res.status(401).json({ message: "Please login" });
    }

    try {
        console.log('got here');
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (err) {
        return res.status(401).json({
            message: err.name === 'TokenExpiredError'
                ? "Session expired"
                : "Invalid token"
        });
    }
}



module.exports = {
    valuesToAdd,
    encryptPassword,
    valuesToLogin,
    islogged,
    
}