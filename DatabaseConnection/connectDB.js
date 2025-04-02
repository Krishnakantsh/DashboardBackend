import mongoose from "mongoose";
import { DBUrlInfo } from "../Constant/constant.js";



const connectDB = async ()=>{
  
  try{
    const connectionInstance = await mongoose.connect(DBUrlInfo);

    console.log(`Wait for database confirmation ......................... `);
    console.log(`Database has been connected `);
  }
  catch(error){
    console.log("MongoDB connection is failed due to some error ", error);
    process.exit(1);
  }
}

export default connectDB;