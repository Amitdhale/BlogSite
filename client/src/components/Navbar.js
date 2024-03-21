import React, { useContext, useEffect } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context';


function Navbar() {
  const {user,setuser,setoken,token} = useContext(Context);
  function logout(){
    localStorage.removeItem("myblogtoken");
    setoken(undefined);
    setuser(null);
  }
  return (
    <>
    <nav className='navbar'>
        <h1>MyBlog</h1>

        <div className='links'>
          {token ? (<>
          <Link to="/createpost">Create Post<span style={{textTransform:"capitalize"}}>{"(" + user?.name + ")"}</span></Link>
          <button onClick={logout}>Logout</button>
          </>) : (<>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          </>)}
        </div>
    </nav>
    </>

  )
}

export default Navbar