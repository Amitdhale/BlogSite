import React, { useContext,useEffect,useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { Context } from '../context/Context';
import { FaRegEdit } from "react-icons/fa";
import './Blog.css'
import axios from 'axios';


function Blog() {
  const {id} = useParams();
  const {token,user} = useContext(Context);
  const [blog,setblog] = useState({});
  const navigate = useNavigate();
  const [loading,setloading] = useState(false);

  if(!token || !user){
    navigate("/login");
  }

  useEffect(()=>{
    const fetchdata = async ()=>{
      setloading(true);
      const response = await axios.get(process.env.REACT_APP_API_LINK +`/blog/${id}`);
      setblog(response.data);
      setloading(false);
      // console.log(response.data)
    }
    fetchdata();
  },[]);

  if(loading){
    return(
      <div>
        <Navbar/>
        <h1 className='loading'>Loading....</h1>
      </div>
    )
  }
  
  return (
    <div>
      <Navbar/>
      <div className='blog-container'>
        <h2 className='heading'>{blog.title}</h2>
        <time className='timestamp'>{blog?.createdAt?.split('T')[0]}</time>
        <p className='author'>@ <span style={{textTransform:"capitalize"}}>{blog?.author?.name}</span></p>
        {user?._id === blog?.author?._id && <Link  to={`/edit/${id}`} className='button'><FaRegEdit /> Edit the post </Link>}
        <div className='image-container'>
          <img src={process.env.REACT_APP_API_LINK +`/uploads/${blog.coverimage}`}/>
        </div>
        <div className='main-content' dangerouslySetInnerHTML={{__html: blog?.blog}}>
    
        </div>
      </div>
    </div>
  )
}

export default Blog