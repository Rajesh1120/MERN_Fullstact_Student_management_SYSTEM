
import React from 'react';
import './Home.css';
import axios from 'axios';
import {useState,useEffect} from 'react'
import {NavLink,useNavigate} from "react-router-dom"
const Home = () => {
  const navigate=useNavigate();
  const [studentData,setStudentData]=useState([])

  useEffect( () => {
    
    const token=localStorage.getItem('jwtToken')
    if(!token){
      console.log("token not found")
      navigate("/")
    }
    else{
    const fecthStudentData= async() =>{
      try{
        await axios.get('http://localhost:5000/api/user/home',{
          method:'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((res)=>{
          if (res.status===200){
          setStudentData(res.data.data)
          }
        })
        
      }
      catch(err){
        console.log(err)
      }
    }
    fecthStudentData();
  }
  },[]);


  async function handleDelete(id){
    
    const token=localStorage.getItem('jwtToken')
    if(!token){
      console.log("not found token")
      navigate('/')
    }
    else{
    await axios.delete(`http://localhost:5000/api/user/student/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })

    .then((res)=>{
      if (res.data.message==='successfully deleted'){
        window.location.reload();
        alert(`Sucessfully deleted Roll No :${res.data.data.rollno}`);
      }
    })
    } 
  }

  




  return (
    <>
    <div className="table-container">
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Branch</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((student, index) => (
            <tr key={index}>
              
              <td>{student.rollno}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.email}</td>
              <td>{student.phone_number}</td>
              <td>{student.branch}</td>
              <td>{student.gender}</td>
              <td><NavLink to={`/edit/${student._id}`}><button>Edit</button></NavLink><button onClick={()=>handleDelete(student._id)} >Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Home