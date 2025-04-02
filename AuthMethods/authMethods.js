import bcrypt  from "bcrypt"
import  jwt  from "jsonwebtoken";

const authMethod = {


  async hashPassword(next) {

    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);

    next();
    
  },



  async isPasswordCorrect(password) {

    return await bcrypt.compare(password, this.password);

  },




  generateAccessToken() {

    return jwt.sign(

      { 
        _id: this._id,

         email: this.email 

      }, 

       process.env.ACCESS_TOKEN_SECRET,

      { 
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
       }

    );
  },




  generateRefreshToken() {

    return jwt.sign(

      { 
        _id: this._id
       
      },

      process.env.REFRESH_TOKEN_SECRET,

      { 

        expiresIn: process.env.REFRESH_TOKEN_EXPIRY 
      
      }

    );
  }
};

export { authMethod }
