import mongoose from "mongoose";

const Likes_Model = mongoose.Schema(
  {
    Image_id: { type: mongoose.Schema.ObjectId, required: true },
    User_id: { type: mongoose.Schema.ObjectId, required: true },
  },
  {
    collection: "Likes",
  }
);

export default mongoose.model("Likes_Model", Likes_Model);
