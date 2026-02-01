const {addUser,getbyuname,getbyemail,verifypassword} = require('../model/users_M');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2'); // i used argon2id instead of btcrypt for password hashing


async function register(req, res) {
    try{
        const username = req.body.username;
        const email = req.body.email;

        
        let uname = await getbyuname(username);
        let uemail = await getbyemail(email);

        if(await getbyuname(username)){
            return res.status(409).json({message: "username already exists"});
        }
        if(await getbyemail(email)){
            return res.status(409).json({message: "email already exists"});
        }

       
        await addUser(req.user);
        
        res.status(201).json({message: "User registered successfully"});
    }
    catch (err) {
        console.error("Error registering user:", err);
        return res.status(500).json({message: "Server error"});
    }
}

async function login(req,res, next) {
    try{
        const user = await getbyuname(req.body.username);
        if(!user){
            return res.status(401).json({message:"please enter a vaild username or register"});
        }
        username = req.body.username;
        password = req.body.password;
        let isMatched = await verifypassword(username, password);
        if(isMatched){
            let user = await getbyuname(req.body.username);
            let name = user.name;
            req.user = user;
            next();
        }
        else{
            return res.status(401).json({message:"password is invalid."});

        }

    }catch(err){
        console.error("Error at login:", err);
        return res.status(500).json({message: "Server error"});
    }
}

async function createjwt(req,res) {
    try{
        let user = req.user;
        let token = await jwt.sign(
            {id:user.id,name:user.name},
            process.env.SECRET_KEY,
            {expiresIn:'3h'}
        );
        
        res.cookie('jwt2',token,{httpOnly:true,maxAge:1000*60*60*2}).status(200).json({message:"logged in and created jwt",name:user.name});
        
        
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"server error at create jwt"});
    }
    
}


module.exports = {
    register,
    login,
    createjwt,
}