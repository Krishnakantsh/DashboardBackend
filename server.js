
import dotenv from "dotenv"
import { PORT } from "./Constant/constant.js";
import connectDB from "./DatabaseConnection/connectDB.js";
import { app } from "./App/app.js";


dotenv.config({
  path:"./.env"
})

app.get("/test" , (req, res)=>{
  res.send(" Your service is working ");
})

// database connection ......................
connectDB();

app.listen(PORT || 8585 , ()=>{
  console.log(`Your server is running at : http://localhost:${PORT} `);
})
