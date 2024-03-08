import mongoose from "mongoose";

const Image_Model = mongoose.Schema(
  {
    User_id: { type: mongoose.Schema.ObjectId, required: true },
    Created_At: { type: Date, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    Pined: { type: Number, required: true, default: 0 },
    Loves: { type: Number, required: true, default: 0 },
    Secret: { type: Boolean, required: true, default: false },
    Tags: { type: Array, required: true, default: [] },
  },
  {
    collection: "Images",
  }
);

export default mongoose.model("Image_Model", Image_Model);
