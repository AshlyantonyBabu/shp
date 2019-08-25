var mong=require('mongoose')
var addschema=mong.Schema
var userschema=new addschema({
   
    name:{type:String,required:true},
    role:{type:String,required:true},
    password:{type:String,required:true},
    username:{type:String,required:true}
    
})


var usermodel=mong.model("useract",userschema,"user")
module.exports=usermodel
