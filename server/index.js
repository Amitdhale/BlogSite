const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./api/auth.js');
const blog = require('./api/blog.js');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT;
const app = express();
const URL =process.env.MONGODB_URL;
mongoose.connect(URL).then(()=>{console.log("connected to the database");})

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use("/auth",auth);
app.use('/blog',blog);
app.use(express.static('public'))


app.get('/',(req,res)=>{
    res.send("ok");
})

app.listen(port,()=>{
    console.log("server is running at port : ",port);
})