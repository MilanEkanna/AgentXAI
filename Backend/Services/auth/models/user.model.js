import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firebaseUid:{
        type:String,
        unique:true
    },
    name:String,
    email:String,
    avatar:String //No need of password as we only doing the google auth
},{
    timestamps:true
})

const User = mongoose.model("User",userSchema)
export default User