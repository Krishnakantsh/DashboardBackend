import mongoose, { Types } from "mongoose"
import { authMethod } from "../AuthMethods/authMethods.js";
const { Schema } = mongoose; 

const BlogSchema = new Schema({
 

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: [true, "Password is required "],
  },
  createAt:{
    type:Date,
    require:true
  },
  user:[
    {
      type:Schema.Types.ObjectId,
      ref:"User"
   }
  ],
  watching:{
    type:Number
  },
  video:{
    type:String,
  },
  image:{
    type:String,
    require:true
  }
 
})


export const Blog = mongoose.model("Blog" , BlogSchema);
