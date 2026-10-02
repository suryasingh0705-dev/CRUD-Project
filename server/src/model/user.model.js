import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String
  }
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
