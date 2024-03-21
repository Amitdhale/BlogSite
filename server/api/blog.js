const express = require("express");
const multer  = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const Blog = require('../Modals/Blog');

const jwttoken = process.env.JWT_TOKEN;

const router = express.Router();
const upload = multer({ dest: 'public/uploads/' });


const verifyuser = (req,res,next)=>{
    const {token }= req.headers;
    if(token){
        const decode = jwt.verify(token, jwttoken);
        if(decode){
            req.body.userdetails = decode;
            next();
        }else{
            res.json({success:false,message:"send correct token"});
        }
    }else res.json({success:false,message:"send the token"})
    
}

router.get("/all",async (req,res)=>{
    const data = await Blog.find().populate('author',['name']).sort({updatedAt: -1});
    // console.log(data);
    res.json(data);
})

router.post("/",verifyuser,upload.single('file'),async (req,res)=>{
    try{
        const {originalname,path,filename} = req.file;
        const {token }= req.headers;
        const decode = jwt.verify(token, jwttoken);
        const arr = originalname.split('.');
        const ext = arr[arr.length - 1];
        fs.renameSync(path,path+"."+ext);
        const filepath = filename+"."+ext;

        const {title,description,blog} = req.body;
        const post = await Blog.create({
            title,
            description,
            blog,
            coverimage : filepath,
            author: decode._id

        })
        res.json({success:true});
    }catch(err){
        res.json({success:false,message:"some internal error"})
    }
})

router.put('/edit/:id',verifyuser,upload.single('file'),async (req,res)=>{
    const {id} = req.params;
    let filepath = null;
    if(req.file){
        const {originalname,path,filename} = req.file;
        const arr = originalname.split('.');
        const ext = arr[arr.length - 1];
        fs.renameSync(path,path+"."+ext);
        filepath = filename+"."+ext;
        
    }
    const {token }= req.headers;
    const decode = jwt.verify(token, jwttoken);
    const {title,description,blog} = req.body;
    const data = await Blog.findById(id).populate('author',['name']);
    if(data && data.author._id == decode._id){
        const p = await Blog.findOneAndUpdate({_id:id},{
            title,
            description,
            blog,
            coverimage: filepath? filepath:data.coverimage
        })
        return res.json({success:true});
    }
    res.json({success:false,message:"some internal error"})
})

router.get("/:id",async (req,res)=>{
    const {id} = req.params;
    const data = await Blog.findById(id).populate('author',['name'])
    res.json(data);
})

module.exports =  router; 