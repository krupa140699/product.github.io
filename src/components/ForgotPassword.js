import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { BASE_URL } from "../App";
import Loader from "./Loader";

const ForgetPassword = () => {
    let [email, setEmail] = useState('');
    let [showLoader, setLoader] = useState(false);
    const navigate = useNavigate();

    const forgetPassword = async () => {
        setLoader(true)
        let result = fetch(`${BASE_URL}/email-send`, {
            method: 'post',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
                // authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = (await result);
        if (result?.status == 200) {
            setLoader(false)
            navigate('/resetPassword', {
                state: email,
            })
        } else {
            setLoader(false)
        }
    }
    return (
        <div className="forgetPasswordMain">
            {showLoader ?
                (<Loader />) :
                (<div>
                    <InputLabel htmlFor="standard-adornment-password">
                        Enter Email
                    </InputLabel>
                    <Input className="custom_field" value={email} onChange={(e) => setEmail(e.target.value)} type="text"
                    /><br /><br />
                    <button type="button" className="appButton" onClick={forgetPassword}>Send OTP</button>
                    <Link to='/'>Login</Link></div>)}
        </div>
    )
}
export default ForgetPassword;