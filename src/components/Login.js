import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";
import Input from "@material-ui/core/Input";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Loader from "./Loader";

const Login = () => {
  let [showLoader, setLoader] = useState(false);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/productList')
    }

  })

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };

  const loginHandle = async () => {
    setLoader(true)
    let result = await fetch(`${BASE_URL}/login`, {
      method: 'post',
      body: JSON.stringify({ email, password: password.password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    result = await result.json()
    console.log(result);
    if (result.auth) {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', JSON.stringify(result.auth));
      setLoader(false)
      navigate('/productList')
    } else {
      setLoader(false)
      alert('please enter correct details')
    }
  }
  return (
    <div className="login" >
      {showLoader ?
        (<Loader />) :
        (<div>
          <InputLabel htmlFor="standard-adornment-password">
            Enter Email
          </InputLabel>
          <Input className="custom_field" value={email} onChange={(e) => setEmail(e.target.value)} type="text"
          />
          <br /><br />

          <InputLabel className="input_label" htmlFor="standard-adornment-password">
            Enter Password
          </InputLabel>
          <Input
            type={password.showPassword ? "text" : "password"}
            onChange={handlePasswordChange("password")}
            value={password.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {password.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <br /><br />
          <Link className="forgetpassword" to='/forgotPassword'>Forget Password?</Link><br /><br />
          {/* <input className="inputBox" value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Enter Password" /><i class="fa fa-eye"></i> */}
          <button type="button" className="appButton" onClick={loginHandle}>Login</button>
          <Link to='/signup'>Sign Up</Link>
        </div>)
      }
    </div>

  );
}

export default Login;