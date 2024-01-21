import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./Signup.css";
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";






function Signup() {

 const [username , setusername] = useState('');
 const [password , setpassword] = useState('');

 const handleUsernameChange = (e) => {
  setusername(e.target.value);
};

const handlePasswordChange = (e) => {
  setpassword(e.target.value);
};



const handleApi = () =>{

  console.log({ username, password});


  const url = 'http://localhost:4000/signup';
  const data = { username, password};
  axios.post(url, data)
       .then((res) => {
             console.log(res.data);

              if(res.data.message){
                alert(res.data.message);

              }
       })
       .catch((err) => {
           console.log(err);
             alert('SERVER ERROR');
       })

}


  return (

  
    <div>
      <Header />
      <div className="center">
        <input type="checkbox" id="show" />
        <label htmlFor="show" className="show-btn">
          Not Member Login
        </label>
        <div className="container">
          <label htmlFor="show" className="close-btn fas fa-times" title="close">
            <FontAwesomeIcon icon={faTimes} />
          </label>
          <div className="text">Signup InvestHub</div>
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Rest of the form */}
            <div className="data">
              <label htmlFor="emailOrPhone">Email or Phone</label>
              <input type="text"  id="emailOrPhone"   value={username} 
                    onChange={handleUsernameChange}
              
              />
            </div>
            <div className="data">
              <label htmlFor="password">Password</label> 
              <input type="password" id="password"  value={password} 
                      onChange={handlePasswordChange} 
              />
            </div>
            <div className="forgot-pass">
              <Link to="#">Forgot Password?</Link>
            </div>
            <div className="btn">
              <div className="inner"></div>
              <button onClick={handleApi} type="submit">signup</button>
            </div>
            <div className="login-link">
              Nmember? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
