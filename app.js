var express=require('express')
var bodyParser = require('body-parser')
var mongoose=require('mongoose')
var app=express()
var methodOverRide=require('method-override')

mongoose.connect("mongodb://localhost/movies_app")

app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverRide("_method"))


var movieSchema=new mongoose.Schema({
  title:String,
  image:String,
  summary:String,
  created:{type:Date, default:Date.now}
})



var movie=mongoose.model("movies",movieSchema)


app.get("/",function(req,res){
  res.render("index")
})


app.get("/movies",function(req,res){
    movie.find({},function(err,movie){
      if(err){
        console.log(err)
      }
      else{
        res.render("index",{movie:movie})
      }
    })
    
})

app.get("/movies/new",function(req,res){
  res.render("new")
})

app.post("/movies",function(req,res){
  console.log(req.body)
  movie.create(req.body.movie,function(err,movie){
    if(err){
      console.log(err)
    }
    else{
      res.redirect("/movies")
    }
  })
})


//Show Route

app.get("/movies/:id",function(req,res){
  
  movie.findById(req.params.id,function(err,foundMovie){
    if(err){
        res.redirect("index")
    }
    else{
      res.render("show", {movieData:foundMovie})
    }
  })
})

app.get("/movies/:id/edit",function(req,res){
  movie.findById(req.params.id,function(err,foundMovie){
    if(err){
      console.log(err)
    }
    else{
      res.render("edit",{movie:foundMovie})
    }
  })
})

app.put("/movies/:id",function(req,res){
  movie.findByIdAndUpdate(req.params.id,req.body.movie,function(err,updated){
    if(err){
      res.redirect("index")
    }
    else{
      res.redirect("/movies/"+ req.params.id)
    }
  })
})

app.delete("/movies/:id",function(req,res){
  movie.findByIdAndRemove(req.params.id,function(err,foundMovie){
    if(err){
      console.log(err)
    }
    else{
      res.redirect('/movies')
    }
  })
})










app.listen(3000,"127.0.0.1",function(){
  console.log("Server has started")
})