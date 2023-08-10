import React, { useState } from "react";
import ProductCategoryList from "./ProductCategoryList";

const ProductList = () => {
 const [search,setSearch] = useState('')

    return (
        <div className="Product-List">
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-caption" style={{ "zIndex": "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) =>{setSearch(e.target.value)}}/>
                            {/* <button className="btn btn-outline-info text-white bg-info" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x200/?shirt" className="d-block w-100 corouselImage" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x200/?grocery" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x200/?electronics" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div> 
            {/* <h3>Product List</h3> */}
            {/* <input className="searchProductBox" onChange={seachHandle} type="text" placeholder="Search Product" /> */}
            <ProductCategoryList search = {search}/>
        </div>
    )
}
export default ProductList;