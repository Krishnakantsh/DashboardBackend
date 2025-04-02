import mongoose, { Types } from "mongoose"
import { authMethod } from "../AuthMethods/authMethods.js";
const { Schema } = mongoose; 

const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  username:{
    type:String,
    require:true
  },
  image:{
    type:String,
    require:true
  },
  password: {
    type: String,
    required: [true, "Password is required "],
  },
  role:{
    type:String,
    require:true
  },
  refreshtoken:{
    type:String
  }
})


AdminSchema.methods.isPasswordCorrect = authMethod.isPasswordCorrect;
AdminSchema.methods.generateAccessToken = authMethod.generateAccessToken;
AdminSchema.methods.generateRefreshToken = authMethod.generateRefreshToken;


export const Admin = mongoose.model("Admin" , AdminSchema);
