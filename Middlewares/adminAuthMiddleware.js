
import jwt from "jsonwebtoken"
import { Admin } from "../Models/Admin.js"
import asyncHandler from "../Utilities/AsyncHandler.js"
import { ApiError } from "../Utilities/ApiError.js"



export const verifyJWTadmin = asyncHandler ( async ( req , res , next) =>{


try {
  
   const token  = req.cookies?.accessTokenAdmin || req.header("Authorization")?.replace("Bearer ", "")
  
   if(!token){
    throw new ApiError(401, "Unauthorized access !!!!")
   }

   // verify token
  
   const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET )
  
   const admin = await Admin.findById(decodedToken?._id).select(" -password -refreshToken")
  
   if( !admin ){
    throw new ApiError(401, "Invalid access Token ")
   }
  
   req.admin = admin;
  
   next()
  
} catch (error) {
    throw new ApiError(401 , error?.message || "Invalid access token" )
}
})