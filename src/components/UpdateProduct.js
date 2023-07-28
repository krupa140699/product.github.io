import React, { useEffect, useState } from "react";
import { useParams ,useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";

 const UpdateProduct=()=>{
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [category,setCategory]=useState('')
    const [company,setCompany]=useState('');
    const param = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetail();
    },[])

    const getProductDetail = async()=>{
        console.log(param);
        let result =  await fetch(`${BASE_URL}/product/${param.id}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
            result = await result.json()
            console.log(result);
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company)
    }

    const updateProduct = async()=>{
       console.log(name,price,category,company);
       var result =  await fetch(`${BASE_URL}/product/${param.id}`,{
        method: 'Put',
        body: JSON.stringify({name,price,category,company}),
        headers:{
            'Content-Type': 'application/json',
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
       })
       result =  await result.json();
       navigate('/')

    }
    return(
        <div className="product">
            <h1>Update product</h1>
            <input type="text" className="inputBox" placeholder="Enter product name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" className="inputBox" placeholder="Enter product price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <input type="text" className="inputBox" placeholder="Enter product category" value={category} onChange={(e)=>setCategory(e.target.value)}/>
            <input type="text" className="inputBox" placeholder="Enter product company" value={company} onChange={(e)=>setCompany(e.target.value)}/>
        <button className="appButton" onClick={updateProduct}>Update product</button>
        </div>
    )
 }

 export default UpdateProduct;