import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../App";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Loader from "./Loader";

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    let [showLoader, setLoader] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/productList')
        }

    })
    const collectData = async () => {
        setLoader(true)
        let result = await fetch(`${BASE_URL}/register`, {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()
        console.log(result);
        if (result) {
            setLoader(false)
            localStorage.setItem('user', JSON.stringify(result.result));
            localStorage.setItem('token', JSON.stringify(result.auth))
            navigate('/productList')
        } else {
            setLoader(false)
        }

    }
    return (
        <div className="register">
            {showLoader ?
                (<Loader />) :
                (
                    <div>
                       
                        <InputLabel className="input_label" htmlFor="standard-adornment-password">
                            Enter Name
                        </InputLabel>
                        <Input className="custom_field" type="text" value={name} onChange={(e) => setName(e.target.value)} />      <br /><br />
                        <InputLabel className="input_label" htmlFor="standard-adornment-password">
                            Enter Password
                        </InputLabel>
                        <Input className="custom_field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br /><br />
                        <InputLabel className="input_label" htmlFor="standard-adornment-password">
                            Enter Email
                        </InputLabel>
                        <Input className="custom_field" type="text" value={email} onChange={(e) => setEmail(e.target.value)} /> <br /><br />
                        <button type="button" className="appButton" onClick={collectData}>Sign up</button>
                        <Link to='/'>Login</Link>
                    </div>
                )}
        </div>
    )
}

export default SignUp;