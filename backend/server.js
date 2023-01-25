const express=require("express");
require('dotenv').config();
const app=express();
require("./db/conn");

const middleware=(req,res,next)=>{
     console.log("middleware autenticationi");
     next();
}

app.use(express.json());
app.use(require("./router/auth"));


app.get('/about',(req,res)=>{
    console.log("jay ma samay ji");
    res.send("about page");
})

// app.get('/login',(req,res)=>{
//     res.send("login page");
// })

// app.get('/register',(req,res)=>{
//     res.send("register page");
// })

const PORT=process.env.PORT || 5000;
app.listen(5000,()=>{
    console.log(`successfullly running on port number ${PORT}`);
})