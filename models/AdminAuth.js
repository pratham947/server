import mongoose from "mongoose"

const adminSchema = mongoose.Schema({
    password:{
        type:String,
        required:true
    },
    login_id:{
        type:String,
        required:true,
        select:false
    },
    role:{
        type:String,
        default:"Admin"
    }
})

const Admin = mongoose.model("Admin",adminSchema)
export default Admin;