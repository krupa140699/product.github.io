import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../App";
import Loader from "./Loader";

const ProductCard = (props) => {
    let [showLoader, setLoader] = useState(false);

    const deleteProduct = async (id) => {
        setLoader(true)
        let result = await fetch(`${BASE_URL}/product/${id}`, {
            method: 'Delete',
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = (await result).json();
        if (result) {
            setLoader(false)
            props.getProductCategoryList();
        } else {
            setLoader(false)
        }
    }

    return <>
        {showLoader ?
            (<Loader />) :
            (<div  key={props?.products?._id}>
            
                    <div key={props?.products?._id} className="card ml-2 mt-2" style={{ "width": "100%" }}>
                        <img src={props?.products?.selectedImages} style={{ "height": "10rem" }} className="card-img-top" alt="..." />
                        <div className="card-body row">
                            <div className="col-sm-6">
                                <h5 className="card-title">{props?.products.name}</h5>
                            </div>
                            <div className="col-sm-6">
                                <b>{props?.products.price}</b>
                            </div>
                            <p className="card-text">{props?.products.company}</p>
                            <button onClick={() => deleteProduct(props?.products._id)}>Delete</button>
                            <button className="mt-1"><Link to={"/update/" + props?.products._id}>Update</Link></button>
                        </div>
                    </div>
            </div>
            )}</>
}

export default ProductCard;