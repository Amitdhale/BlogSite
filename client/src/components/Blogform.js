import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import { Context } from '../context/Context';
import axios from 'axios';

function Blogform() {
    const {token} = useContext(Context);
    const [title,settitle] = useState("");
    const [description,setdescription] = useState("");
    const [photo,setphoto] = useState(null);
    const [blog,setblog] = useState("");
    const navigate = useNavigate();
    const [error,seterror] = useState(false);
    const [disable,setdisable] = useState(false);

    // console.log(text);
    async function postblog(e){
        e.preventDefault();
        if(!token){
          navigate("/login");
        }
        const data = new FormData();
        data.set('title',title);
        data.set('description',description);
        data.set('blog',blog);
        data.set('file',photo?.[0]);
        
        setdisable(true);
        const response = await axios.post(process.env.REACT_APP_API_LINK +"/blog",data,{
        headers:{
            'token' : token,
        }
        });
        if(response.data.success){
        settitle("");
        setdescription("");
        setblog("");
        setphoto(null);
        setdisable(false);
        navigate("/");
        }
        else{
          setdisable(false);
        seterror(true)
        }
        
    }
  return (
    <div className='form-details'>
        {error && <h4  style={{color:"red",textAlign:"center"}}>Due to Some internal error can not publish now try later</h4>}
          <form onSubmit={postblog}>
            <label >Title : </label>
            <input  placeholder='Write some catchy heading' value={title} onChange={(e)=>{settitle(e.target.value);}}/>
            <label>Description : </label>
            <input placeholder='Description something to catch user attention' value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
            <label>Cover Image : </label>
            <input type='file' accept="image/*" onChange={(e)=>{setphoto(e.target.files)}}/>
            <label>Blog : </label>
            <div className='textareaholder'>
            <ReactQuill theme="snow" value={blog} onChange={(e)=>{setblog(e)}}/>
            </div>
            <div className='btn'>
            <button type='submit' disabled={disable}>Post</button>
            </div>
          </form>
        </div>
  )
}

export default Blogform