import mongoose from "mongoose";
import bcrypt from 'bcrypt';

export const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});


userSchema.pre("save", async function (next) {
    //  hash user password before saving using bcrypt
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });

// user password compare
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };


export const UserModel = mongoose.model("User", userSchema);