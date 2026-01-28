async function getAllUsers(req, res) {
    try{
        console.log("hi");
        res.status(200).json({message: "ok"});

    }catch(err){
        res.status(500).json({message: "ok"});
    }
    
}

module.exports ={
    getAllUsers,
}