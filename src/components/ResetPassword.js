import { Input, InputLabel } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../App";
import Loader from "./Loader";

const ResetPassword = ({ navigation, route }) => {
    let [otpCode, setOtp] = useState('');
    let [password, setPassword] = useState('');
    let [cpassword, setConfirmPassword] = useState('');
    let [error, setError] = useState(false);
    let [showLoader, setLoader] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    const confirmPasswordData = async () => {
        setLoader(true)
        let result = fetch(`${BASE_URL}/change-password`, {
            method: 'post',
            body: JSON.stringify({ otpCode, password, email: location.state }),
            headers: {
                'Content-Type': 'application/json',
                // authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = (await result);
        if (result?.status == 200) {
            setLoader(false)
            navigate('/')
        } else {
            setLoader(false)
        }
    }

    const checkMatchPassword = (value) => {
        if (password === value) {
            setError(false)
        } else if (password !== value) {
            setError(true)
        }
    }
    return (
        <div className="forgetPasswordMain">
            {showLoader ?
                (<Loader />) :
                (<div>
                    <InputLabel htmlFor="standard-adornment-password">
                        Enter OTP
                    </InputLabel>
                    <Input className="custom_field" value={otpCode} onChange={(e) => setOtp(e.target.value)} type="text"
                    /><br /><br />
                    <InputLabel htmlFor="standard-adornment-password">
                        Enter Password
                    </InputLabel>
                    <Input className="custom_field" value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                    /><br /><br />
                    <InputLabel htmlFor="standard-adornment-password">
                        Confirm Password
                    </InputLabel>
                    <Input className="custom_field" value={cpassword} onChange={(e) => { setConfirmPassword(e.target.value); checkMatchPassword(e.target.value) }} type="password"
                    /> <br /><br />
                    {error ? <span className="errorMsg">Passwords did not match</span> : ''}
                    <br />
                    <button type="button" className="appButton"
                        onClick={confirmPasswordData}
                    >Submit</button>
                    <Link to='/'>Login</Link></div>)}
        </div>
    )
}

export default ResetPassword;