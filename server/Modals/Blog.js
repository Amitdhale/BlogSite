const mongoose = require("mongoose");
const {Schema} = mongoose;

const Blogschema = Schema({
    title : {type:String,required:true},
    description : {type:String,required:true},
    coverimage : {type:String,required:true},
    blog : {type:String,required:true},
    author : {
        type: Schema.Types.ObjectId,
        ref: 'User' // Refers to the User model
      }
},{
    timestamps : true,
})

const Blog = mongoose.model('Blog',Blogschema);
module.exports = Blog;