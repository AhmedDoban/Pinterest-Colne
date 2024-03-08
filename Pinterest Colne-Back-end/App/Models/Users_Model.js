import mongoose from "mongoose";

const User_Model = mongoose.Schema(
  {
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Token: { type: String, required: true },
    Devices: { type: Boolean, required: true, default: false },
    Role: { type: String, enum: ["ADMIN", "USER", "MANAGER"], default: "USER" },
    Avatar: { type: String, default: "Uploads/avatar.jpg" },
    Followers: { type: Number, default: 0, required: true },
    Following: { type: Number, default: 0, required: true },
    Pins: { type: Number, default: 0, required: true },
    Posts: { type: Number, default: 0, required: true },
    Secret: { type: Number, default: 0, required: true },
    Links: { type: Array, default: [], required: true },
    bio: { type: String, required: true, default: " " },
  },
  {
    collection: "Users",
  }
);

export default mongoose.model("User_Model", User_Model);
