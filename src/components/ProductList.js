import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../App";
import Loader from "./Loader";
import Corousal from "./Corousal";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    let [showLoader, setLoader] = useState(false);
    const [productCategory, setProductCategory] = useState([])

    useEffect(() => {
        getProducts();
        getProductWithCategory();
    }, []);

    const getProducts = async () => {
        setLoader(true)
        let result = await fetch(`${BASE_URL}/products`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            setLoader(false)
            setProducts(result?.data)
        } else {
            setLoader(false)
        }
    }

    const getProductWithCategory = async () => {
        setLoader(true)
        let result = await fetch(`${BASE_URL}/productWithCategory`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            setLoader(false)
            setProductCategory(result?.data)
        } else {
            setLoader(false)
        }
    }

    const deleteProduct = async (id) => {
        setLoader(true)
        let result = await fetch(`${BASE_URL}/product/${id}`, {
            method: 'Delete',
            // body: JSON.stringify({ id }),
            headers: {
                // 'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = (await result).json();
        if (result) {
            setLoader(false)
            getProductWithCategory();
        } else {
            setLoader(false)
        }
    }

    const seachHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`${BASE_URL}/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setProductCategory(result.data)
            }
        } else {
            getProductWithCategory()
        }
    }

    const deleteCategory = async (id) => {
        setLoader(true)
        let result = await fetch(`${BASE_URL}/productCategory/${id}`, {
            method: 'Delete',
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = (await result).json();
        if (result) {
            setLoader(false)
            getProductWithCategory();
        } else {
            setLoader(false)
        }
    }

    return (
        <div className="Product-List">
            {showLoader ?
                (<Loader />) :
                (
                    <div>
                        <Corousal />
                        {/* <h3>Product List</h3> */}
                        {/* <input className="searchProductBox" onChange={seachHandle} type="text" placeholder="Search Product" /> */}
                        {
                            productCategory?.length > 0 ? productCategory?.map((item, index) =>
                                <div className="mt-2">
                                    <h5>
                                        {item?.category}
                                        <button className="deleteButton" onClick={() => deleteCategory(item?._id)}>
                                            <img className="Deleteimage" src="./delete.png" alt="plus" />
                                        </button>
                                    </h5>
                                    <div className="mainCard" key={item?._id}>
                                        {item?.categories.length > 0 ? item?.categories.map((data, index) =>
                                            <div key={data?._id} className="card ml-2" style={{ "width": "210px", "marginLeft": "10px", "maxWidth": "20%" }}>
                                                <img src="./delete.png" style={{ "width": "10rem" }} className="card-img-top" alt="..." />
                                                <div className="card-body row">
                                                    <div className="col-sm-6">
                                                        <h5 className="card-title">{data.name}</h5>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <b>{data.price}</b>
                                                    </div>
                                                    <p className="card-text">{data.company}</p>
                                                    <button onClick={() => deleteProduct(data._id)}>Delete</button>
                                                    <button className="mt-1"><Link to={"/update/" + data._id}>Update</Link></button>
                                                </div>
                                            </div>
                                        ) : <label>No Record Found......</label>}
                                    </div>
                                </div>
                            )
                                : <h1>No Record Found</h1>
                        }
                    </div>)}
        </div>
    )
}
export default ProductList;