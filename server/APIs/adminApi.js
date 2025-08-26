const exp=require('express')
const adminApp=exp.Router()


adminApp.get("/",(req,res)=>{
    res.send("admin api")
})







module.exports=adminApp;