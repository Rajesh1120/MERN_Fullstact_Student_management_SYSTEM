import React, { useState } from "react";
import "./RegisterForm.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [isUserCreated, setUserCreated] = useState("");
  const [userErrorHandler, setUserErrorHandler] = useState("");

  const navigate=useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form submission logic here
    if (form.confirmPassword !== form.password) {
      setUserCreated(" Passwords are not matching");
    } 
    else {
      await axios
        .post("http://localhost:5000/api/user/register", form)
        .then((response) => {
          if (response.status === 200) {
            setUserCreated(response.data.message);
            alert("Succefully Registered")
            navigate('/login')
          }
          setForm({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        })
        .catch((err) => {
          setUserErrorHandler(err.response.data.message);
         
          setUserCreated(false);
        });
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          {isUserCreated ? (
            <div style={{ color: "green" }}>****{isUserCreated}****</div>
          ) : (
            <div style={{ color: "red" }}>*****{userErrorHandler}*****</div>
          )}
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
        <NavLink to="/login">SignIn</NavLink>
      </form>
    </div>
  );
};

export default RegisterForm;
