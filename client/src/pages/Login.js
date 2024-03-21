import React, { useContext,useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css"
import Navbar from '../components/Navbar'
import axios from "axios"
import { Context } from '../context/Context';

function Login() {
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [message,setmessage]  = useState("");
  const navigate = useNavigate();
  const {fetchuserdetails,setoken} = useContext(Context);
  const [disable,setdisable] = useState(false);
  
  async function login(ev){
    ev.preventDefault();
    setdisable(true);
    const response = await axios.post(process.env.REACT_APP_API_LINK +"/auth/login",{
      email,password
    })
    setpassword("");
    setemail("");
    if(response.data.success){
      localStorage.setItem("myblogtoken",response.data.token)
      setoken(localStorage.getItem("myblogtoken"))
      fetchuserdetails(response.data.token);
      setdisable(false);
      navigate("/");
    }else{
      setdisable(false);
      setmessage(response.data.message);
    }


  }
  return (
    <div>
      <Navbar login = {false}/>
      <div className='form-container'>
        <h1>Login</h1>
        <p style={{color:"red",textAlign:"center"}}>{message}</p>
        <form onSubmit={login}>
          <input type="email" placeholder='email' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
          <input type='password' placeholder='password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
          <button type='submit' disabled={disable} >Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login