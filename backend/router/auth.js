const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");


require("../db/conn");
const User=require("../model/userschema");

router.get('/',(req,res)=>{
    res.send("router");
})

router.post('/register',async(req,res)=>{
      const {name,email,phone,password,cpassword}=req.body;
      if(!name || !email || !phone || !password || !cpassword)
      {
        res.status(404).json({error:"convention is not following"});
      }

      try {
        const userExist=await User.findOne({email:email});
        if(userExist)
        {
        return res.status(404).json({error:"Already Registerd please login"});
        }
         
        const hashedPass=await bcrypt.hash(password,10);
        const user=new User({name,email,phone,password:hashedPass,cpassword:hashedPass});
        await user.save();
        delete user.password;
        delete user.cpassword;
       

        res.status(201).json({message:"done bro"});
       
      } catch (error) {
        console.log(error);
      }

     
  
})


router.post("/login",async(req,res)=>{
      const {email,password}=req.body;
      if(!email || !password){
        return res.status(400).json("Please fill all credential")
      }
     try {
      const userExist=await User.findOne({email:email});
      if(userExist)
      {
        const isMatched=await bcrypt.compare(password,userExist.password);
        if(isMatched)
          return res.status(200).json("successfully login ho gaya hai bhai");
        else  
        return res.status(400).json("please enter valid credential");
      }
      return res.status(400).json("please enter valid credential");

     } catch (err) {
      return res.status(400).json({error:"please enter valid credential"});
     }


})

module.exports=router;
