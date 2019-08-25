var exp=require('express')
const app= exp()
const path=require('path')
app.use(exp.static(path.join(__dirname,"/public")))
app.set("view engine","ejs")
app.set("views","./src/view")
var rr=require("./router/userrouter")
var rrt=require("./router/adminrouter")
var bdy=require('body-parser')
var mon=require('mongoose')
var url="mongodb+srv://ashly:ashly@cluster0-nybb2.mongodb.net/winedb?retryWrites=true&w=majority"
   // var url="mongodb://localhost/dbadditem"     
var add=require("./model/user")

app.use(bdy.urlencoded({extended:true}))
mon.connect(url,function(err){
    if(err)throw err
    else{
        console.log("database connected")
    }
    
})
app.use("/admin",rrt)
app.use("/user",rr)
app.get("/",function(req,res){
    res.render("index",{nav:[{link:"/",title:"HOME"},{link:"/login",title:"LOGIN"},{link:"/user/view",title:"SHOP"}]})
})
app.listen(process.env.PORT|| 4000,function(req,res){
    console.log("server is ready.......")

})
app.get("/login",function(req,res){

    res.render("login",{nav:[{link:"/",title:"HOME"},{link:"/login",title:"LOGIN"},{link:"/user/view",title:"SHOP"}]})
})
app.get("/register",function(req,res){
    res.render("register",{nav:[{link:"/",title:"HOME"},{link:"/login",title:"LOGIN"},{link:"/user/view",title:"SHOP"}]})
})
app.post("/check",function(req,res){
   
    u=req.body.uname1;
    console.log(req.body.uname1)
    p=req.body.pass1;
    console.log(req.body.pass1)
    qry={username:u,password:p}
    add.findOne(qry,function(err,result){

    if(err)throw err
    else{
        console.log(result)
        if(result.role=="Admin"){
        res.render("check",{nav:[{link:"/",title:"HOME"},{link:"/admin/view",title:"SHOP"}]})
            }
         else{
       res.redirect('/user/view')
        }
    
   
    }
    
})

})