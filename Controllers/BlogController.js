import { Admin } from "../Models/Admin.js";
import { Blog } from "../Models/Blog.js";
import { ApiError } from "../Utilities/ApiError.js";
import asyncHandler from "../Utilities/AsyncHandler.js";


//  create new image 

const addNewBlog =  asyncHandler ( async ( req, res) => {

  const { title,  description  } = req.body;
  
  console.log(" title : ", title);
  console.log(" description  : ", description);
  console.log(" file : ", req.file);
  
  if(!title || !description ) {
    throw new ApiError(404, "All fields are required !!! ");
  }

  if (!req.file) {
    throw new ApiError(400, "Image is required!");
  }
  
  const createdBlog = new Blog({
     title:title,
     image:req.file.path,
     createAt:new Date(),
     user:req.admin._id,
     watching:0,
     description:description,
  })
  
  const savedBlog = await createdBlog.save();
  
  if(!savedBlog){
    throw new ApiError(404, "Something went wrong ! blog not created & saved !!! ");
  }
  
  res.status(200)
  .json(savedBlog)
  })


//  get all image 

const getAllBlogs = asyncHandler( async (req, res) => {

    const aid = req.admin._id;
  
    //  find admin
    const admin = await Admin.findById(aid);
  
    if (!admin) {
      throw new ApiError(404, "Admin profile didn't found !!!! ");
    }
    
    //  now if admin is available and verified then proceed
    
    const blogs = await Blog.find();
    
    
      if (!blogs) {
        throw new ApiError(404, "Blog didn't found !!!! ");
      }
    
    
      res.status(200)
      .json(blogs)


})
//  get blog by id 


const getBlogById = asyncHandler( async (req, res) => {

  const aid = req.admin._id;
  const bid = req.params.id

  //  find admin
  const admin = await Admin.findById(aid);

  if (!admin) {
    throw new ApiError(404, "Admin profile didn't found !!!! ");
  }
  
  //  now if admin is available and verified then proceed
  
  const blog = await Blog.findById(bid);
  
  
  if (!blog) {
      throw new ApiError(404, "Blog didn't found !!!! ");
   }
  
    res.status(200)
    .json(blog)


})


const deleteBlogById = asyncHandler( async (req, res) => {

  const aid = req.admin._id;
  const bid = req.params.id

  //  find admin
  const admin = await Admin.findById(aid);

  if (!admin) {
    throw new ApiError(404, "Admin profile didn't found !!!! ");
  }
  
  //  now if admin is available and verified then proceed
  
  const blog = await Blog.findByIdAndDelete(bid);
  
  
  if (!blog) {
      throw new ApiError(404, "blog could not delete !!!! ");
   }
  
    res.status(200)
    .send("Blog delete successfully !!!")


})


export {   addNewBlog ,deleteBlogById, getBlogById, getAllBlogs }
