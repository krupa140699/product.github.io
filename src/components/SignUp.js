import React ,{useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import { BASE_URL } from "../App";

const SignUp=()=>{
    const [name,setName]= useState("");
    const [password,setPassword]= useState("");
    const [email,setEmail]= useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }

    })
    const collectData=async()=>{
        console.log(name,email,password);
        let result = await fetch(`${BASE_URL}/register`,{
          method:'post',
          body: JSON.stringify({name,email,password}),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        result = await result.json()
        console.log(result);
        if(result){
            localStorage.setItem('user',JSON.stringify(result.result));
            localStorage.setItem('token',JSON.stringify(result.auth))
            navigate('/')
        }

    }
    return(
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>
            <input className="inputBox" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
            <input className="inputBox" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
            <button type="button" className="appButton" onClick={collectData}>Sign up</button>
        </div>
    )
}

export default SignUp;