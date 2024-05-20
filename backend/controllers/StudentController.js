const addStudentModel = require("../model/addStudentModel")


const createStudent= async(req,res)=>{
    const {
        rollno,
        first_name,
        last_name,
        email,
        phone_number,
        branch,
        gender
    }   =   req.body

    if (!rollno || !first_name || !last_name || !email ||!phone_number||!branch||!gender ){
        return res.status(404).json({message:"Please enter all fields"})
    }else{

        const studentCreated=await addStudentModel.create(
            {
                rollno,
                first_name,
                last_name,
                email,
                phone_number,
                branch,
                gender
            }
        )
        return res.status(200).json({data: studentCreated, message:"Student created successfully"})

    }

}


//get all students
const getAllStudents=async(req,res)=>{

    const AllStudents= await addStudentModel.find()
    res.status(200).json({data:AllStudents})
}

// delete student

const deleteStudent=async(req,res)=>{
    console.log(req.params.id);
    const deletedStudent= await addStudentModel.findById(req.params.id)

    if(!deletedStudent){
        return res.status(400).json("student Not found");
    }
    else{
        const deleteOne=await addStudentModel.findByIdAndDelete(deletedStudent)
        res.status(200).json({data: deleteOne,message:"successfully deleted"})
    }
}
const editStudent=async(req,res)=>{
    const updateStudent=await addStudentModel.findById(req.params.id)
    if (!updateStudent){
        return res.status(400).json("student Not found")
    }
    else{
        const updatedStudent= await addStudentModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
        )
        res.status(200).json({data:updatedStudent,message:"Successfully Updated"})
    }
}

// get one student details

const getStudent =  (async(req,res)=>{

    const student=await addStudentModel.findById(req.params.id)
    if(!student){
        res.status(400);
        throw new Error("student not found");
    }
    res.status(200).json({data:student,message:"successfully get student"})
    
})


module.exports={createStudent, getAllStudents,deleteStudent, editStudent,getStudent }
