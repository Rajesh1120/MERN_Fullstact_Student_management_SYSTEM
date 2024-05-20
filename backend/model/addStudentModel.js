const mongoose=require('mongoose')


const addStudentSchema=mongoose.Schema({
    rollno:{
        type:String,
        required:[true, "please enter the username"],
        unique:true,
    },
    first_name:{
        type:String,
        required:[true, "please enter the first_name"]
    },
    last_name:{
        type:String,
        required:[true, "please enter the last_name"]
    },
    email:{
        type:String,
        required:[true, "please enter the email"],
        unique:true,
    },
    phone_number:{
        type:Number,
        required:[true, "please enter the phone_number"],
        unique:true
    },
    branch:{
        type:String,
        required:[true, "please enter the branch"]
    },
    gender:{
        type:String,
        required:[true, "please enter the gender"]
    },
})

module.exports=mongoose.model('addStudent',addStudentSchema);