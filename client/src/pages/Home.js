import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';
import {formatISO9075} from "date-fns"


function Home() {
  const [blogs,setblogs] = useState([]);
  const [loading,setloading] = useState(false);

  useEffect(()=>{
    const fetchdata = async ()=>{
      setloading(true);
      const response = await axios.get(process.env.REACT_APP_API_LINK + "/blog/all");
      // console.log(response.data);
      setblogs(response.data);
      setloading(false);
    }
    fetchdata();
  },[])

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
        {
          blogs.map((blog)=>{
            return (<Link to={`/blog/${blog._id}`} className='card-container'>
              <div className='left'>
                <img src={process.env.REACT_APP_API_LINK + `/uploads/${blog.coverimage}`}/>
              </div>
              <div className='right'>
                <h3>{blog.title}</h3>
                <div ><span className='author' style={{textTransform:"capitalize"}}>{blog.author.name}</span><span className='time'>{blog?.createdAt?.split('T')[0]}</span></div>
                  <p>{blog.description}</p>
              </div>
            </Link>)
          })
        }
      </div>
    </div>
  )
}

export default Home