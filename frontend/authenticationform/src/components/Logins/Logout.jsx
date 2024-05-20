import React from 'react'
import { useNavigate } from 'react-router-dom';
const Logout = () => {

    const navigate=useNavigate();
    async function logOut(){
        await localStorage.clear();
        console.log(localStorage)
        navigate("/register")
    }
  return (
    <div>
        <button onClick={logOut}>LogOut</button>
    </div>
  )
}

export default Logout