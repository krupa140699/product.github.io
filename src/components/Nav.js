import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div>
            <img className="logo" src="https://i.pinimg.com/originals/06/bc/e8/06bce81285badba0c3becd273ca67f95.png" alt="logo" />
            {auth ?
                <ul className="nav-ul">
                    <li><Link to='/productList'>Products</Link></li>
                    <li><Link to='/add'>Add Product</Link></li>
                    {/* <li><Link to='/update'>Update Product</Link></li> */}
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link to='/' onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>

                </ul> : <ul className="nav-ul">
                    
                    <li>
                      <h5>Urban Avenue</h5>
                    </li>
                    <li>
                        {/* <Link to='/signup'>Sign Up</Link> */}
                    </li>
                </ul>}
        </div>
    )
}

export default Nav