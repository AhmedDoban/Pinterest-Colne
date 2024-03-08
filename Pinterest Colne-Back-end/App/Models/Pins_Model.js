import mongoose from "mongoose";

const Pins_Model = mongoose.Schema(
  {
    Image_id: { type: mongoose.Schema.ObjectId, required: true },
    User_id: { type: mongoose.Schema.ObjectId, required: true },
  },
  {
    collection: "Pins",
  }
);

export default mongoose.model("Pins_Model", Pins_Model);
