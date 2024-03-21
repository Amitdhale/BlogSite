import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'
import axios from "axios"
import { Context } from '../context/Context';

function Register() {
  const [name,setname] = useState("");
  const [password,setpassword] = useState("");
  const [email,setemail] = useState("");
  const [failure,setfailure] = useState(false);
  const navigate = useNavigate();
  const {fetchuserdetails} = useContext(Context);
  async function registeruser(ev){
    ev.preventDefault();
    // console.log(process.env.BLOG_API_LINK);
    const response = await axios.post(process.env.REACT_APP_API_LINK +"/auth/register",{
      name,password,email
    });
    setname("");
    setpassword("");
    setemail("");
    if(response.data.success){
      localStorage.setItem("myblogtoken",response.data.token)
      // console.log(localStorage.getItem("myblogtoken"))
      fetchuserdetails(response.data.token)
      navigate("/");
    }else{
      setfailure(true);
    }

  }
  return (
    <div>
      <Navbar login = {false}/>
      <section className='form-container'>
        <h1>Register</h1>
        {failure && <p style={{color:"red",textAlign:"center"}}>Some error try again later</p>}
        <form onSubmit={registeruser}>
          <input type="text" placeholder='name' value={name} onChange={(e)=>{setname(e.target.value)}}/>
          <input type="email" placeholder='email'value={email} onChange={(e)=>{setemail(e.target.value)}}/>
          <input type='password' placeholder='password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
          <button type='submit'>Register</button>
        </form>
      </section>
    </div>
  )
}

export default Register