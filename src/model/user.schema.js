import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
   type : String,
        required : [true , "please provide an email address"],
        unique : [true , "Please provide a unique email address"],
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "teacher", "student"],
    default: "user",
  },
  otp: {
    type: String,
    default: null,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
