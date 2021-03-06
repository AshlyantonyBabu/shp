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
           // console.log(result)
            res.render("adminview",{nav:[{link:"/",title:"HOME"},{link:"/admin/view",title:"SHOP"}],arr_prd:result})
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
      res.render("check",{nav:[{link:"/",title:"HOME"},{link:"/login",title:"LOGIN"},{link:"/admin/view",title:"SHOP"}]})
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
        res.render("prdedit",{nav:[{link:"/",title:"HOME"},{link:"/login",title:"LOGIN"}],arr_prd:result})
    })
})
rot.post("/update/:name",function(req,res){
    name=req.params.name
    console.log(name)
    qty=req.body.iqtyi
    console.log(qty)

    price=req.body.ipricei
    console.log(price)
    
   var qry={"itempic":name};
   
   var upvle={$set:{itemprice:price,itemqty:qty}};
    add.updateOne(qry,upvle,function(err,result){
        console.log(result)
        if (err) throw err;
        else{
         console.log("1 document updated");
        
     res.redirect('/admin/view')
        }
    })

})
rot.get("/delete/:id",function(req,res){
    var idi=req.params.id
    console.log(idi)
    var qry={itemname:idi};
    add.deleteOne(qry,function(err,obj){
        if(err)throw err
        else{
          //  console.log(result)
            res.redirect('/admin/view')
        }
    })
})