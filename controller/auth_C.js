const {addUser,getbyuname,getbyemail} = require('../model/users_M');

async function register(req, res) {
    try{
        const username = req.body.username;
        const email = req.body.email;

        
        let uname = await getbyuname(username);
        let uemail = await getbyemail(email);

        

        if(uname || uemail) {
            res.status(400).json({message: "Username or email already exists"});
        }
        await addUser(req.user);
        
        return res.status(201).json({message: "User registered successfully"});
    }
    catch (err) {
        console.error("Error registering user:", err);
        returnres.status(500).json({message: "Server error"});
    }
}


module.exports = {
    register,
}