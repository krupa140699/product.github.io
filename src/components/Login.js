import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import { CircularProgress } from "@material-ui/core";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from './GoogleLogin';

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

  const handlePasswordChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };


  const GoogleWrapper = ()=>(
		<GoogleOAuthProvider clientId="185296585033-hhletbbmb413fi7dgerrd7m2k1urefir.apps.googleusercontent.com">
			<GoogleLogin></GoogleLogin>
		</GoogleOAuthProvider>
	)

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
    <div className="login-container">
      {showLoader ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <div className="login-form">
          <h2 className="login-title">Login</h2>
          <InputLabel className="input-label">Enter Email</InputLabel>
          <Input
            className="custom-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email Address"
            fullWidth
          />

          <InputLabel className="input-label">Enter Password</InputLabel>
          <Input
            className="custom-input"
            type={password.showPassword ? 'text' : 'password'}
            onChange={handlePasswordChange('password')}
            value={password.password}
            placeholder="Password"
            fullWidth
          />

          <Link className="forgot-password" to="/forgotPassword">Forgot Password?</Link>

          <Button
            variant="contained"
            className="login-button"
            onClick={loginHandle}
            fullWidth
          >
            Login
          </Button>

          <GoogleWrapper />

          <div className="signup-link">
            <span>Don't have an account? </span>
            <Link to="/signup"> Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;