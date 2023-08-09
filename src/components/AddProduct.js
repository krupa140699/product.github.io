import React, { useState, useEffect } from "react";
import { BASE_URL } from "../App";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('');
    const [productCategory, setProductCategory] = useState([])
    const [err, setErr] = useState(false);
    const [categoryShow, setcategoryShow] = useState(false);
    const [img, setImage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getProductsCategory();
    }, []);

    const categoryVisible = () => {
        setcategoryShow(!categoryShow)
    }

    const saveCategory = async () => {
        let result = fetch(`${BASE_URL}/add-productCategory`, {
            method: 'post',
            body: JSON.stringify({ category }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = (await result).json();
        if (result) {
            categoryVisible();
            setCategory("")
            getProductsCategory()
        }
    }

    const getProductsCategory = async () => {
        let result = await fetch(`${BASE_URL}/productCategory`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            setProductCategory(result?.data)
        }
    }

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setErr(true);
            return false;
        }
        console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = fetch(`${BASE_URL}/add-product`, {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = (await result).json();
        if (result) {
            navigate('/productList')
        }
        console.log(result)
    }
    return (
        <div className="product">
            <h1>Add product</h1>
            <input type="text" className="inputBox" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} />
            {err && !name && <span className="invalid-input">Enter valid name</span>}
            <input type="text" className="inputBox" placeholder="Enter product price" value={price} onChange={(e) => setPrice(e.target.value)} />
            {err && !price && <span className="invalid-input">Enter valid price</span>}
            <select placeholder="Select category" className="inputBox" id="dropdown" value={category} onChange={(e) => setCategory(e.target.value)}>
                {productCategory.length > 0 ? productCategory.map((item, index) =>
                    <option value={item._id}>{item.category}</option>
                ) : <option>No records found</option>
                }
            </select>
            {!categoryShow ? <button className="imgButton" onClick={categoryVisible}><img className="image" src="./add_738882.png" alt="plus" /></button> : ''}
            {categoryShow ? <div>
                <input type="text" className="inputBox" placeholder="Enter product category" value={category} onChange={(e) => setCategory(e.target.value)} />
                {err && !category && <span className="invalid-input">Enter valid category</span>}
                <button className="color" onClick={saveCategory}>Save</button>
                <button onClick={categoryVisible}>Cancel</button>
            </div> : ''}
            <input type="text" className="inputBox" placeholder="Enter product company" value={company} onChange={(e) => setCompany(e.target.value)} />
            {err && !company && <span className="invalid-input">Enter valid company</span>}
            {/* <input type="file" accept="image/*"  value={img} onChange={(e) => setImage(e.target.value)} />
            <img src={img} alt={img} /> */}
            <button className="appButton" onClick={addProduct}>Add product</button>
        </div>
    )
}

export default AddProduct;