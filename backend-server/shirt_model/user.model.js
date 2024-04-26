import mongoose, { Schema } from "mongoose";

const UserSchema = Schema({
  email: String,
  username: String,
  password: String,
  cart: Array,
});

const User = mongoose.model("User", UserSchema, "user");

export default User;
