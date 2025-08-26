const User = require("../models/userModel");

async function createUser(req,res){
    const newUser=req.body;
    //check if already someone exists with email
    const userdb=await  User.findOne({email:newUser.email});
    if(userdb!==null){
        if(newUser.role===userdb.role){
            res.status(200).send({message:newUser.role,payload:userdb});
        }else{
            res.status(200).send({message:"Invalid User"});
        }
    }else{
        let nUser=new User(newUser);
        let nUserDoc=await nUser.save(); 
        res.status(201).send({message:newUser.role,payload:nUserDoc});
    }
}

module.exports=createUser;