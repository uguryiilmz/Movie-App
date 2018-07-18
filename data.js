var mongoose=require("mongoose")
mongoose.connect("mongodb://localhost/demo")



var postSchema=mongoose.Schema({
  title:String,
  content:String,
  author:String,
})


var postModel=mongoose.model("Post",postSchema)



var userSchema=mongoose.Schema({
  name:String,
  email:String,
  post:[postSchema]
})

var user=mongoose.model("User",userSchema)

var newUser=new user({
  name:'BoJack',
  email:'horsinaround@binghamton.edu'
})



newUser.post.push({
  title:'Harry Potter',
  content:'About Sorcerers',
  author:'Jk Rowling'
})

newUser.save(function(err,user){
  if(err){
    console.log(err)
  }
  else{
    console.log('user is', user)
  }
})