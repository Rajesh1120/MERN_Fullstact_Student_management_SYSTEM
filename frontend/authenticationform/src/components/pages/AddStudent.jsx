import React, { useState } from 'react';
import './AddStudent.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const StudentForm = () => {

  const navigate=useNavigate();
  const [formData, setFormData] = useState({
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
    setFormData({ ...formData, [name]: value });
  };

  function handleBack(){
    navigate('/home')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const token=localStorage.getItem('jwtToken')
    if(!token){
      console.log("token not found")
      navigate('/')
    }
    else{
    await axios.post('http://localhost:5000/api/user/add-student',formData,{
      method:'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
    })
    
    .then((res)=>{
    
      if (res.data.message==='Student created successfully'){
        
        setFormData({
          rollno: '',
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          branch: '',
          gender: ''
        });
      alert("Add Successfully")
      }
    })
    .catch(err=>console.log(err))
    // Add form submission logic here
  };
  }
  return (
    <div className="form-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="rollno">Roll No</label>
          <input type="text" id="rollno" name="rollno" value={formData.rollno} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="text" id="phone" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Branch</label>
          <select id="branch" name="branch" value={formData.branch} onChange={handleChange} required>
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
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">Add</button>
        <button onClick={handleBack} className="btn-submit">Back</button>

      </form>
    </div>
  );
};

export default StudentForm;
