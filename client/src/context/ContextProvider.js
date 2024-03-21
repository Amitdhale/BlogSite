import { useState,React, useEffect } from "react";
import { Context } from "./Context";
import axios from "axios";

export default function ContextProvider({children}) {
    // const [text,settext] = useState("this is the context");
    const [user,setuser] = useState({});
    const [token,setoken] = useState(undefined);

    async function fetchuserdetails(){
      const response = await axios.get(process.env.REACT_APP_API_LINK +"/auth/",{
        headers: {
          'token': token,
          'Content-Type': 'application/json'
      }
      });
      setuser(response.data);
      // console.log(response.data);
    }
    useEffect(()=>{
      setoken(localStorage.getItem("myblogtoken"));
      if(token){
        const val = fetchuserdetails(token)
        setuser(val);
      }
    },[token])
  return (
    <Context.Provider value={{user,setuser,fetchuserdetails,setoken,token}}>
        {children}
    </Context.Provider>
  )
}
