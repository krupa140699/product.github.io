import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BASE_URL } from "../App";
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import CommonModel from "./CommonModel";

const ProductCategoryList = (props) => {
    let [showLoader, setLoader] = useState(false);
    const [productCategory, setProductCategory] = useState([]);
    const [products, setProducts] = useState([])
    const [isOpen, setIsOpen] = useState(false);

    // const getProductWithCategory = useCallback(async () => {
    //     setLoader(true)
    //     let result = await fetch(`${BASE_URL}/productWithCategory`, {
    //         headers: {
    //             authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
    //         }
    //     });
    //     result = await result.json();
    //     if (result) {
    //         setLoader(false)
    //         setProductCategory(result?.data)
    //     } else {
    //         setLoader(false)
    //     }
    // }, [])

    // useEffect(() => {
    //     getProductWithCategory();
    // }, [getProductWithCategory]);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleConfirm = () => {
        // Perform the confirm action
        console.log("Confirmed!");
        closeModal();
    };

    const getProductList = async () => {
        setLoader(true)
        let result = await fetch(`${BASE_URL}/products`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            setLoader(false)
            setProducts(result?.data);
        } else {
            setLoader(false)
        }
    }


    const getProductCategoryList = useCallback(async () => {
        setLoader(true)
        let result = await fetch(`${BASE_URL}/productCategory`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            setLoader(false)
            setProductCategory(result?.data);
            getProductList();
        } else {
            setLoader(false)
        }
    }, [])

    useEffect(() => {
        getProductCategoryList();
    }, [getProductCategoryList]);


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
            getProductCategoryList();
        } else {
            setLoader(false)
        }
    }



    return (
        <div>
            {showLoader ?
                (<Loader />) :
                (<div>{
                    productCategory?.length > 0 ? productCategory?.map((item, index) =>
                        <div className="mt-2 row mb-3">
                            <h5>
                                {item?.category}
                                {item?.categories.length == 0 ?
                                    <div>
                                        <button className="deleteButton" onClick={openModal}>
                                            <img className="Deleteimage" src="./delete.png" alt="plus" />
                                        </button>
                                        <CommonModel
                                            isOpen={isOpen}
                                            onClose={closeModal}
                                            title="Confirmation Modal"
                                            content={<p>Are you sure you want to proceed?</p>}
                                            onConfirm={handleConfirm}
                                        />
                                    </div>

                                    : ''}
                            </h5>

                            {products.filter(x => (x.category === item._id) && (x.name?.toLowerCase().includes(props?.search?.toLowerCase()))).map(filteredName => (
                                <div className="col-sm-12 col-lg-3 col-xl-3 col-md-6">
                                    <ProductCard className="" products={filteredName} getProductCategoryList={getProductCategoryList} />
                                </div>
                            ))}
                        </div>
                    )
                        : <h1>No Record Found</h1>

                }</div>
                )
            }
        </div>
    )
}

export default ProductCategoryList;