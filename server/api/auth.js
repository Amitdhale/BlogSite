const express = require("express");
const User = require("../Modals/User.js")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const router = express.Router();
const salt = bcrypt.genSaltSync(10);
const jwttoken = process.env.JWT_TOKEN;


router.get("/",(req,res)=>{
    const {token }= req.headers;
    if(token){
        const decode = jwt.verify(token, jwttoken);
        res.json(decode);
    }else res.json({})
})

router.post("/register",async (req,res)=>{
    try{

        const {name,email,password} = req.body;
        const hashpasword = bcrypt.hashSync(password, salt);
        const details = {name,email,password:hashpasword};
        const user = await User.create(details)
        const token = jwt.sign({name : user.name,email:user.email,_id:user._id}, jwttoken);
        res.json({"success" : true,token : token});
    }catch(err){
        res.json({"success" : false,error : err})
    }
    
})

router.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user){
        if(bcrypt.compareSync(password,user.password)){
            const token = jwt.sign({name : user.name,email:user.email,_id:user._id}, jwttoken);
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Incorrect password"});
        }
    }else{
        res.json({success:false,message:"No user with this email exist"});
    }
    
})

module.exports =  router;