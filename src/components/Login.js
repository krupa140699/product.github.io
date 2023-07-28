import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";

const Login = ()=>{
    const [email,setEmail]= useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }

    })
    const loginHandle=async()=>{
        let result = await fetch(`${BASE_URL}/login`,{
            method:'post',
            body: JSON.stringify({email,password}),
            headers:{
              'Content-Type': 'application/json'
            }
          })
          result = await result.json()
          console.log(result);
          if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth))
            navigate('/')
          } else{
            alert('please enter correct details')
          } 
          }
    return(
        <div className="login">
            <input className="inputBox" value={email} onChange={(e)=> setEmail(e.target.value)} type="text" placeholder="Enter Email" />
            <input className="inputBox" value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Enter Password" />
            <button type="button" className="appButton" onClick={loginHandle}>Login</button>
        </div>
    )
}

export default Login;