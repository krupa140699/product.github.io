import React, { useState } from "react";
import { BASE_URL } from "../App";

 const AddProduct=()=>{
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [category,setCategory]=useState('')
    const [company,setCompany]=useState('');
    const [err,setErr] = useState(false);

    const addProduct = async()=>{
        if(!name || !price || !category || !company){
            setErr(true);
            return false;
        }
        console.log(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = fetch(`${BASE_URL}/add-product`,{
            method:'post',
            body: JSON.stringify({name,price,category,company,userId}),
            headers:{
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
        });
        result = (await result).json();
        console.log(result)
    }
    return(
        <div className="product">
            <h1>Add product</h1>
            <input type="text" className="inputBox" placeholder="Enter product name" value={name} onChange={(e)=>setName(e.target.value)}/>
            {err && !name && <span className="invalid-input">Enter valid name</span>}
            <input type="text" className="inputBox" placeholder="Enter product price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            {err && !price && <span className="invalid-input">Enter valid price</span>}
            <input type="text" className="inputBox" placeholder="Enter product category" value={category} onChange={(e)=>setCategory(e.target.value)}/>
            {err && !category && <span className="invalid-input">Enter valid category</span>}
            <input type="text" className="inputBox" placeholder="Enter product company" value={company} onChange={(e)=>setCompany(e.target.value)}/>
            {err && !company && <span className="invalid-input">Enter valid company</span>}
        <button className="appButton" onClick={addProduct}>Add product</button>
        </div>
    )
 }

 export default AddProduct;