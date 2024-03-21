import React, { useEffect, useState,useContext} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ReactQuill from 'react-quill';
import Navbar from '../components/Navbar';
import { useParams} from 'react-router-dom';
import { Context } from '../context/Context';

function Edit() {
    const {id} = useParams();
    const {token} = useContext(Context);
    const [title,settitle] = useState("");
    const [description,setdescription] = useState("");
    const [photo,setphoto] = useState(null);
    const [blog,setblog] = useState("");
    const navigate = useNavigate();
    const [error,seterror] = useState(false);
    const [loading,setloading] = useState(false);
    const [disable,setdisable] = useState(false);

    useEffect(()=>{
      if(id){
        const fetchdata = async ()=>{
          setloading(true);
          const response = await axios.get(process.env.REACT_APP_API_LINK +`/blog/${id}`);
          // setblog(response.data);
          settitle(response.data.title);
          setdescription(response.data.description);
          setblog(response.data.blog);
          setloading(false);
          

        }
        fetchdata();
      }
    },[id])

    if(loading){
      return(
        <div>
          <Navbar/>
          <h1 className='loading'>Loading....</h1>
        </div>
      )
    }


    async function updateblog(e){
      e.preventDefault();
      const data = new FormData();
      data.set('title',title);
      data.set('description',description);
      data.set('blog',blog);
      if(photo){
        data.set('file',photo?.[0]);
      }
      setdisable(true);
      const response = await axios.put(process.env.REACT_APP_API_LINK +`/blog/edit/${id}`,data,{
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
    <>
    <Navbar/>
    <div className='form-details'>
        {error && <h4  style={{color:"red",textAlign:"center"}}>Due to Some internal error can not publish now try later !!</h4>}
          <form onSubmit={updateblog}>
            <label >Title : </label>
            <input  placeholder='Write some catchy heading' value={title} onChange={(e)=>{settitle(e.target.value);}}/>
            <label>Description : </label>
            <input placeholder='Description something to catch user attention' value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
            <label>Cover Image : <span>(Add image if you want to change else leave blank)</span> </label>
            <input type='file' accept="image/*" onChange={(e)=>{setphoto(e.target.files)}}/>
            <label>Blog : </label>
            <div className='textareaholder'>
            <ReactQuill theme="snow" value={blog} onChange={(e)=>{setblog(e)}}/>
            </div>
            <div className='btn'>
            <button type='submit'  disabled={disable}>Update Post</button>
            </div>
          </form>
        </div>
    </>
  )
}

export default Edit