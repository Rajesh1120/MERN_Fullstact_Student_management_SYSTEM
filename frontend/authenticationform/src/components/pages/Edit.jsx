import React, { useEffect, useState } from 'react';
import './AddStudent.css';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom'
const Edit = () => {

  const navigate=useNavigate();
  const {id} = useParams();
  
  const [editedData, setEditedData] = useState({
    rollno: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    branch: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  function handleBack(){
    navigate('/home')
  }

  useEffect(()=>{
    const getOneStudent= async(id)=>{
    const token=localStorage.getItem('jwtToken')
    if(!token){
         console.log("not found token")
         navigate("/")
    }
    
    await axios.get(`http://localhost:5000/api/user/student/edit/${id}`,{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }).then(res=>setEditedData(res.data.data))
      .catch(err=> console.log(err))
    }
    if(id){
        getOneStudent(id);
    }
    
  },[id])

  
//submiting form
  const handleSubmit = async (e) => {
    e.preventDefault();
 
        const token=localStorage.getItem('jwtToken')
        if(!token){
          console.log("not found token")
          navigate('/')
        }
        else{
        await axios.put(`http://localhost:5000/api/user/student/${id}`,editedData,{
          method:'PUT',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
    
        .then((res)=>{
          if (res.data.message==='Successfully Updated'){
            alert(`Sucessfully  Updated Roll No :${res.data.data.rollno}`);
            navigate('/home');
          }
        })
        } 
      }
    
  return (
    <div className="form-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="rollno">Roll No</label>
          <input type="text" id="rollno" name="rollno" value={editedData.rollno} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" name="first_name" value={editedData.first_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" name="last_name" value={editedData.last_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={editedData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="text" id="phone" name="phone_number" value={editedData.phone_number} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Branch</label>
          <select id="branch" name="branch" value={editedData.branch} onChange={handleChange} required>
            <option value="">Select Branch</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
            <option value="Civil">Civil</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={editedData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">Edit</button>
        <button onClick={handleBack} className="btn-submit">Back</button>

      </form>
    </div>
  );
};

export default Edit;
