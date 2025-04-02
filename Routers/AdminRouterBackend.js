import express from "express"
import { adminLogin, adminProfile, adminRegister, logoutAdmin } from "../Controllers/adminController.js";
import { verifyJWTadmin } from "../Middlewares/adminAuthMiddleware.js";
import { addImage, deleteImageById, getAllImage, getImageById } from "../Controllers/ImageController.js";
import { addNewBlog, deleteBlogById, getAllBlogs, getBlogById } from "../Controllers/BlogController.js";
import { upload } from "../Config/cloudinary.js";


const router = express.Router()

router.route("/login").post(adminLogin) 
router.route("/register").post(adminRegister)
router.route("/p/logout").post(verifyJWTadmin,logoutAdmin)
router.route("/p/adminprofile").get(verifyJWTadmin,adminProfile)

router.route("/p/addimage").post(verifyJWTadmin, upload.single("image"),addImage)
router.route("/p/getallimages").get(verifyJWTadmin,getAllImage)
router.route("/p/:id/getimage").get(verifyJWTadmin,getImageById)
router.route("/p/:id/deleteimage").delete(verifyJWTadmin,deleteImageById)

router.route("/p/addblog").post(verifyJWTadmin, upload.single("image"),addNewBlog)
router.route("/p/getallblogs").get(verifyJWTadmin,getAllBlogs)
router.route("/p/:id/getblog").get(verifyJWTadmin,getBlogById)
router.route("/p/:id/deleteblog").delete(verifyJWTadmin,deleteBlogById)



export default router;
