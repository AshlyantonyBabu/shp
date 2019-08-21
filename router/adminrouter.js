var exp=require('express')
const rot=exp.Router()
module.exports=rot
const path=require('path')
rot.use(exp.static(path.join(__dirname,"/public")))
var bdy=require('body-parser')
var mult=require('multer')
var storage=mult.diskStorage({destination:function(req,file,ks){
ks(null,path.join(__dirname,"/../uploads"))

},
filename:function(req,file,ks){
ks(null,"image_"+req.body.iname+".jpg")
}})
var up=mult({storage:storage})
//var type=up.single('file1')
rot.use(bdy.urlencoded({extended:true}))
var mon=require('mongoose')
var url="mongodb://localhost/dbadditem"
var add=require("../model/additem")
mon.connect(url,function(err){
    if(err)throw err
    else{
        console.log("database connected")
    }
    
})
rot.post("/check",function(req,res){
    //var u="";
    u=req.body.uname1;
    //var u=Array();
    //u=req.body.uname1;
    console.log(req.body.uname1)
    p=req.body.pass1;
//    for(var i=0;i<u.length;i++){
    if(u=="Admin"){
      res.render("check",{nav:[{link:"/",title:"HOME"},{link:"/login",title:"LOGIN"},{link:"/shop",title:"SHOP"}]})
    }
// }
       // res.send("user...")
rot.post("/add",up.single('file1'),function(req,res){
    console.log(req.body.iname)
   var e1=new add()
   e1. itemname=req.body.iname
   e1.itemprice=req.body.iprice
   e1.itemqty=req.body.iqty 
   e1. itempic="image_"+req.body.iname+".jpg"
    // res.post("/upload",type,function(req,res){
    //     res.send("file uploaded ")
    // })
    e1.save(function(err){
    if(err)
    throw err

else{
    res.render("adminview",{nav:[{link:"/",title:"HOME"},{link:"/login",title:"LOGIN"},{link:"/shop",title:"SHOP"}]})
}
})  
  //  res.send("file uploaded ")
})
rot.post("\view")

  
})