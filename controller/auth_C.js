const {addUser,getbyuname,getbyemail,verifypassword} = require('../model/users_M');
const argon2 = require('argon2'); // i used argon2id instead of btcrypt for password hashing


async function register(req, res) {
    try{
        const username = req.body.username;
        const email = req.body.email;

        
        let uname = await getbyuname(username);
        let uemail = await getbyemail(email);

        

        if(uname || uemail) {
            return res.status(400).json({message: "Username or email already exists"});
        }
        await addUser(req.user);
        
        return res.status(201).json({message: "User registered successfully"});
    }
    catch (err) {
        console.error("Error registering user:", err);
        returnres.status(500).json({message: "Server error"});
    }
}

async function login(req,res) {
    try{
        const user = await getbyuname(req.body.username);
        if(!user){
            return res.status(400).json({message:"username or password is invalid."});
        }
        username = req.body.username;
        password = req.body.password;
        
        if(!password || !username){
            return res.status(400).json({message:"username or password is missing"});
        }
        let isMatched = await verifypassword(username, password);
        if(isMatched){
            let user = await getbyuname(req.body.username);
            let name = user.name;
            return res.status(200).json({message:`welcome ${name}`});
        }
        else{
            return res.status(400).json({message:"username or password is invalid."});

        }

    }catch(err){
        console.error("Error at login:", err);
        return res.status(500).json({message: "Server error"});
    }
    

    
}


module.exports = {
    register,
    login,
}