import React, { useContext} from 'react';
import Navbar from '../components/Navbar'
import 'react-quill/dist/quill.snow.css';
import './Createblog.css'
import { Context } from '../context/Context';
import Blogform from '../components/Blogform';

function Createblog() {
  const {user,token} = useContext(Context);
  // console.log(text);
  
  return (
    <div>
      <Navbar/>
      <div className='blogpost-container'>
        <h4>You are : <span style={{textTransform:"capitalize"}}>{user ? user.name:"unknown" }</span></h4>
        <Blogform/>
        
      </div>
    </div>
  )
}

export default Createblog