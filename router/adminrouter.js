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
var url="mongodb+srv://ashly:ashly@cluster0-nybb2.mongodb.net/winedb?retryWrites=true&w=majority"
   // var url="mongodb://localhost/dbadditem"     
var add=require("../model/additem")
mon.connect(url,function(err){
    if(err)throw err
    else{
        console.log("database connected")
    }
    
})
rot.get("/view",function(req,res){


    add.find({},function(err,result){
        if(err)throw err
        else
        {
            console.log(result)
            res.render("adminview",{nav:[{link:"/",title:"HOME"},{link:"/login",title:"LOGIN"},{link:"/shop",title:"SHOP"}],arr_prd:result})
        }
    })
    
    })
    rot.get("/viewpic/:pic",function(req,res){
        
        res.sendFile(path.join(__dirname+"/../uploads/"+req.params.pic));
    })
    
rot.post("/check",function(req,res){
   
    u=req.body.uname1;
    console.log(req.body.uname1)
    p=req.body.pass1;
    if(u=="Admin"){
      res.render("check",{nav:[{link:"/",title:"HOME"},{link:"/login",title:"LOGIN"},{link:"/shop",title:"SHOP"}]})
    }
})
       // res.send("user...")
rot.post("/add",up.single('file1'),function(req,res){
    console.log(req.body.iname)
   var e1=new add()
   e1. itemname=req.body.iname
   e1.itemprice=req.body.iprice
   e1.itemqty=req.body.iqty 
   e1. itempic="image_"+req.body.iname+".jpg"
    e1.save(function(err){
    if(err)
    throw err

else{
    res.redirect("/admin/view")
}
})  
  
})
rot.get("/edit/:name",function(req,res){
    name=req.params.name
    add.findOne({itemname:name},function(err,result){
        console.log(result)
        res.render("prdedit",{nav:[{link:"/",title:"HOME"},{link:"/login",title:"LOGIN"},{link:"/shop",title:"SHOP"}],arr_prd:result})
    })
})
rot.get("/update/:name",function(req,res){
    name=req.params.name
    qty=req.body.iqty
    console.log(qty)

    price=req.body.iprice
    console.log(price)
    add.updateOne({itemname:name},{$set:{itemprice:price,itemqty:qty}},function(err,result){
        console.log(result)
        if (err) throw err;
   
 
        else{
         console.log("1 document updated");
        
     res.redirect('/admin/view')
        }
    })
    
})