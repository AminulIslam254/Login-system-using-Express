if(process.env.Node_ENV!=='production'){
  require('dotenv').config()
}

const express = require('express');
const bcrypt=require('bcrypt');
const app = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const  port= process.env.port || 3000;

var bodyperser=require('body-parser');

app.use(bodyperser.json());
app.use(bodyperser.urlencoded({extended:true}));
app.use(flash())
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());


app.set("view engine","ejs");

const initializepassport=require('./passport-config');

initializepassport(passport,(email)=>{
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
});


let users=[]

app.get("/",(req,res)=>{
  res.send("welcome");
})

app.get("/login",(req,res)=>{
  res.render("login");
  app.use(express.static(__dirname+"/views"));
})
app.post("/login",passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true,
}));

app.get("/register",(req,res)=>{
  res.render("register")
  app.use(express.static(__dirname+"/views"));
})

app.post("/register",async (req,res)=>{
  try{
      let hashpass=await bcrypt.hash(req.body.password,10);
        users.push({
          id:Date.now().toString(),
          name1:req.body.name,
          email:req.body.email,
          password:hashpass
        })
        res.redirect("/login");
  }catch{
    res.redirect("/register");
  }
  console.log(users);
})



app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
  })
