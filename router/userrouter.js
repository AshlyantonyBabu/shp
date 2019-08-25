var exp=require('express')
const rt=exp.Router()
module.exports=rt
const path=require('path')
rt.use(exp.static(path.join(__dirname,"/public")))
var bdy=require('body-parser')
var mon=require('mongoose')
var url="mongodb+srv://ashly:ashly@cluster0-nybb2.mongodb.net/winedb?retryWrites=true&w=majority"
   // var url="mongodb://localhost/dbadditem"     
var add1=require("../model/user")
var add=require("../model/additem")
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
   var e1=new add1()
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
rt.get("/view",function(req,res){
    add.find({},function(err,result){
        if(err)throw err
        else
        {
            console.log(result)
            res.render("userview",{nav:[{link:"/login",title:"LOGIN"},{link:"/user/view",title:"SHOP"}],arr_prd:result})
        }
    })
    
    })
    rt.get("/viewpic/:pic",function(req,res){
        
        res.sendFile(path.join(__dirname+"/../uploads/"+req.params.pic));
    })
    