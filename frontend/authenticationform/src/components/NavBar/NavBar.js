import React from 'react';
import './NavBar.css';
import { Link ,useNavigate} from 'react-router-dom';

const NavBar = () => {

  const navigate=useNavigate();

  function handleSignOut(){
    localStorage.setItem('jwtToken',"");
    localStorage.setItem('epr_suggested',"");
  
    
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="logo.png" alt="Logo" className="logo" />
        <h1 className="title">Student Management System</h1>
      </div>
      <div className="navbar-right">
       <Link to ="/add-student"><button className="btn" >Add Student</button></Link> 
        <button onClick={handleSignOut} className="btn">Sign Out</button>
      </div>
    </nav>
  );
};

export default NavBar;
