import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../App";

const ProductList = () => {
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts=async()=>{
        let result = await fetch(`${BASE_URL}/products`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result)
    }

    const deleteProduct= async(id)=>{
        console.log(id)
        let result =  await fetch(`${BASE_URL}/product/${id}`,{
            method:'Delete',
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = (await result).json();
        if(result){
            getProducts()
        }
    }

    const seachHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`${BASE_URL}/search/${key}`,{
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if(result){
                setProducts(result)
            }
        }else{
            getProducts()
        }
    }
    return (
        <div className="Product-List">
            <h3>Product List</h3>
            <input className="searchProductBox" onChange={seachHandle} type="text" placeholder="Search Product" />
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
               products.length > 0 ? products.map((item,index)=>
                <ul key={item._id}>
                    <li>{index + 1}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>
                    <li>
                        <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                        <Link to={"/update/" + item._id}>Update</Link>
                    </li>
                </ul>)
                : <h1>No Record Found</h1>
            }
        </div>
    )
}
export default ProductList;