import mongoose, { Types } from "mongoose"
import { authMethod } from "../AuthMethods/authMethods.js";
const { Schema } = mongoose; 

const ImageSchema = new Schema({

  title: {
    type: String,
    required: true,
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
  image:{
    type:String,
  }

})



export const ImageModel = mongoose.model("ImageModel" , ImageSchema);
