var exp=require('express')
const rt=exp.Router()
module.exports=rt
const path=require('path')
rt.use(exp.static(path.join(__dirname,"/public")))
var bdy=require('body-parser')
var mon=require('mongoose')
var url="mongodb+srv://ashly:ashly@cluster0-nybb2.mongodb.net/winedb?retryWrites=true&w=majority"
   // var url="mongodb://localhost/dbadditem"     
var add=require("../model/user")
rt.use(bdy.urlencoded({extended:true}))
mon.connect(url,function(err){
    if(err)throw err
    else{
        console.log("database connected")
    }
    
})
rt.post("/add",function(req,res){
    console.log(req.body.uname)
    console.log(req.body.username)
    console.log(req.body.upass)
    console.log(req.body.role)
   var e1=new add()
   e1. name=req.body.uname
   console.log(req.body.username)
   e1.username=req.body.username
   
   e1.password=req.body.upass
   e1. role=req.body.role
    e1.save(function(err){
    if(err)
    throw err

else{
    res.redirect("/login")
}
})  
})