const express =require('express');
const router=express.Router();
const { registerData, loginUserData} = require('../controllers/userController');
const authenticationUser =require('../config/validationToken');
const { createStudent,
     getAllStudents,
     deleteStudent,
      editStudent, 
      getStudent} = require('../controllers/StudentController');



router.post('/register',registerData)
router.post('/login',loginUserData);


router.get('/home',authenticationUser,getAllStudents)
router.post('/add-student',authenticationUser,createStudent)
router.delete('/student/:id',authenticationUser,deleteStudent)
router.put('/student/:id',authenticationUser,editStudent)
router.get('/student/edit/:id',authenticationUser,getStudent)



module.exports=router;