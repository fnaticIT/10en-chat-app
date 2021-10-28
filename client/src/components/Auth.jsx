import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import signinImage from "../assets/signup.jpg";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, phoneNumber, avatarURL } = form;

    const URL = "https://db10.herokuapp.com/auth";
    // const URL = 'https://medical-pager.herokuapp.com/auth';

    const {
      data: { token, userId, hashedPassword, fullName },
    } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
      username,
      password,
      fullName: form.fullName,
      phoneNumber,
      avatarURL,
    });

    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);

    if (isSignup) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarURL", avatarURL);
      cookies.set("hashedPassword", hashedPassword);
    }

    window.location.reload();
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p style={{ color: "palevioletred" }}>{isSignup ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <input name="fullName" type="text" placeholder="Full Name" onChange={handleChange} required />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <input name="username" type="text" placeholder="Username" onChange={handleChange} required />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <input name="phoneNumber" type="text" placeholder="Phone Number" onChange={handleChange} required />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <input name="avatarURL" type="text" placeholder="Avatar URL" onChange={handleChange} required />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button>{isSignup ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup ? "Already have an account? " : "Don't have an account? "}
              <span onClick={switchMode}>{isSignup ? "Sign In" : "Sign Up"}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image boxy">
        <h1 className="logo">10</h1>
        <p style={{ color: "white", marginTop: "-60px", fontSize: "20px" }}>
          www.<span style={{ color: "palevioletred" }}>10</span>.com
        </p>
        <p style={{ color: "white", fontSize: "20px", marginTop: "-10px" }}>
          <span style={{ color: "palevioletred" }}>10</span> minutes is all you have
        </p>
      </div>
    </div>
  );
};

export default Auth;
