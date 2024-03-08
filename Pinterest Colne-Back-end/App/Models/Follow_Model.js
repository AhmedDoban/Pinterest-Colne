import mongoose from "mongoose";

const Follow_Model = mongoose.Schema(
  {
    Follower_id: { type: mongoose.Schema.ObjectId, required: true },
    Following_id: { type: mongoose.Schema.ObjectId, required: true },
  },
  {
    collection: "Follow",
  }
);

export default mongoose.model("Follow_Model", Follow_Model);
