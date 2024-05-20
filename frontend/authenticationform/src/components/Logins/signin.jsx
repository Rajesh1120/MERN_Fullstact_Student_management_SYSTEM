import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';
import { NavLink,useNavigate} from 'react-router-dom';

const LoginForm = () => {

  const navigate=useNavigate();
  const [isUserCreated,setUserCreated]=useState("");
  const [userErrorHandler,setUserErrorHandler]=useState("")
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add login logic here
    
    await axios.post('http://localhost:5000/api/user/login',form).then((response)=>{
      if (response.status=== 200){
        setUserCreated(response.data.message);
        localStorage.setItem("jwtToken",response.data.token);
        navigate('/home')
                
      }
      
    }).catch((err)=>{
      setUserErrorHandler(err.response.data.message)
        setUserCreated(false);
    })
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {isUserCreated?<div style={{color:"green"}}>****{isUserCreated}****</div>:
          <div style={{color:"red"}} >*****{userErrorHandler}*****</div>}
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
        <button type="submit" className="signin-button">Sign In</button>
        <NavLink to="/">Create an Account</NavLink>
      </form>
    </div>
  );
};

export default LoginForm;
