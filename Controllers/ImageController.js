import { Admin } from "../Models/Admin.js";
import { ImageModel } from "../Models/ImageModel.js";
import { ApiError } from "../Utilities/ApiError.js";
import asyncHandler from "../Utilities/AsyncHandler.js";



// add new image 

const addImage =  asyncHandler ( async ( req, res) => {

const { title, image   } = req.body;


if(!title || !image) {
  throw new ApiError(404, "All fields are required !!! ");
}

const createdImage = new ImageModel({

   title:title,
   image:image,
   createAt:new Date(),
   user:req.admin._id

})

const savedImage = await createdImage.save();

if(!savedImage){
  throw new ApiError(404, "Something went wrong ! Image not saved & created !!! ");
}

res.status(200)
.json(savedImage)

})


//  get all image 

const getAllImage = asyncHandler( async (req, res) => {

    const aid = req.admin._id;
  
    //  find admin
    const admin = await Admin.findById(aid);
  
    if (!admin) {
      throw new ApiError(404, "Admin profile didn't found !!!! ");
    }
    
    //  now if admin is available and verified then proceed
    
    const images = await ImageModel.find();
    
    
      if (!images) {
        throw new ApiError(404, "Blog didn't found !!!! ");
      }
    
    
      res.status(200)
      .json(images )


})


//  get blog by id 


const getImageById = asyncHandler( async (req, res) => {

  const aid = req.admin._id;
  const imageid = req.params.id

  //  find admin
  const admin = await Admin.findById(aid);

  if (!admin) {
    throw new ApiError(404, "Admin profile didn't found !!!! ");
  }
  
  //  now if admin is available and verified then proceed
  
  const image = await ImageModel.findById(imageid);
  
  
  if (!image) {
      throw new ApiError(404, "image didn't found !!!! ");
   }
  
    res.status(200)
    .json(image)


})

//  delete image 

const deleteImageById = asyncHandler( async (req, res) => {

  const aid = req.admin._id;
  const imageid = req.params.id

  //  find admin
  const admin = await Admin.findById(aid);

  if (!admin) {
    throw new ApiError(404, "Admin profile didn't found !!!! ");
  }
  
  //  now if admin is available and verified then proceed
  
  const response = await ImageModel.findByIdAndDelete(imageid);
  
  
  if (!response) {
      throw new ApiError(404, "image could not delete !!!! ");
   }
  
    res.status(200)
    .json({
      message:"image delete successfully !!!",
    })


})





export {getAllImage,getImageById,deleteImageById, addImage }