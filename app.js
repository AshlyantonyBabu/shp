var exp=require('express')
const app= exp()
const path=require('path')
app.use(exp.static(path.join(__dirname,"/public")))
app.set("view engine","ejs")
app.set("views","./src/view")

var rrt=require("./router/adminrouter")
app.use("/admin",rrt)

app.get("/",function(req,res){
    res.render("index",{nav:[{link:"/",title:"HOME"},{link:"/login",title:"LOGIN"},{link:"/shop",title:"SHOP"}]})
})
app.listen(4000,function(req,res){
    console.log("server is ready.......")

})
app.get("/login",function(req,res){

    res.render("login",{nav:[{link:"/",title:"HOME"},{link:"/login",title:"LOGIN"},{link:"/shop",title:"SHOP"}]})
})
app.get("/register",function(req,res){
    res.render("register",{nav:[{link:"/",title:"HOME"},{link:"/login",title:"LOGIN"},{link:"/shop",title:"SHOP"}]})
})