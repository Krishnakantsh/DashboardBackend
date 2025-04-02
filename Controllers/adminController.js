import { Admin } from "../Models/Admin.js";
import { ApiError } from "../Utilities/ApiError.js";
import bcrypt from "bcrypt";
import asyncHandler from "../Utilities/AsyncHandler.js";


//  admin login 

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required.... ");
  }

  console.log("request received ..... ");

  //  find admin with email
  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new ApiError(404, "Admin not found with this Email : ", email);
  }

  //  password matching

  const passwordStatus = await bcrypt.compare(password, admin.password);

  if (!passwordStatus) throw new ApiError(400, "Bad Credentials");

  //  refresh token setup ...........................................

  const refreshTokenadmin = await admin.generateRefreshToken();

  if (!refreshTokenadmin)
    throw new ApiError(400, "Refresh token does not generated ... ");

  //  access token setup ...........................................

  const accessTokenAdmin = await admin.generateAccessToken();

  if (!accessTokenAdmin)
    throw new ApiError(400, "Access token does not generated ... ");

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 15 * 60 * 1000),
  };

  res
    .status(201)
    .cookie("accessTokenAdmin", accessTokenAdmin, options)
    .cookie("refreshTokenAdmin", refreshTokenadmin, options)
    .send(accessTokenAdmin);
});


//  get profile details for admin 
const adminProfile = asyncHandler(async (req, res) => {
  const aid = req.admin._id;

  //  find admin
  const admin = await Admin.findById(aid);

  if (!admin) {
    throw new ApiError(404, "Admin profile didn't found !!!! ");
  }

  res.status(200).json(admin);
});

//  register admin 

const adminRegister = asyncHandler(async (req, res) => {
  const { role, email, password, image, username } = req.body;

  if (!role || !email || !password  || !image || !username) {
    throw new ApiError(400, "All fields are required ... ");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({
    email,
    role,
    password: hashedPassword,
    image,
    username
  });

  const refreshtoken = await admin.generateRefreshToken();

  if (!refreshtoken) {
    throw new ApiError(
      400,
      "Refreshtoken token not generated ! Something error occured ..."
    );
  } else {
    admin.refreshtoken = refreshtoken;
  }

  const registerAdmin = await admin.save();

  if (registerAdmin) {
    res.status(201).json(registerAdmin);
  }

  res.status(400).send("Something error occured during register admin");
});

//  for logout 


const logoutAdmin = asyncHandler( async ( req, res) =>{

  const aid = req.admin._id

  //  find admin 

  const admin = await Admin.findById(aid)

  if( !admin)
    throw new ApiError(404, "Admin not found !!! ")

  admin.refreshtoken = undefined

  await admin.save()

  res.status(200)
  .clearCookie("accessTokenAdmin")
  .clearCookie("refreshTokenAdmin")
  .send("admin logged out successfully.....")

})


export { adminLogin, adminRegister, adminProfile, logoutAdmin };
