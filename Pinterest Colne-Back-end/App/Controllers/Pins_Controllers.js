import mongoose from "mongoose";
import Pins_Model from "../Models/Pins_Model.js";
import Users_Model from "../Models/Users_Model.js";
import Images_Model from "../Models/Images_Model.js";
import { validationResult } from "express-validator";

// Get user Pins
const GetPins = async (Req, Res) => {
  const { _id, Token } = Req.body;
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    Res.json({
      Status: "Faild",
      message: "data are missing !",
    });
  }

  try {
    if (_id === Token._id) {
      const UserPins = await Pins_Model.aggregate([
        {
          $match: {
            User_id: new mongoose.Types.ObjectId(_id),
          },
        },
        {
          $lookup: {
            from: "Images",
            localField: "Image_id",
            foreignField: "_id",
            pipeline: [{ $match: { Secret: false } }],
            as: "Image",
          },
        },
        {
          $lookup: {
            from: "Users",
            localField: "Image.User_id",
            foreignField: "_id",
            as: "User",
          },
        },
        { $unwind: "$User" },
        {
          $project: {
            __v: 0,
            "Image.__v": 0,
            "User._id": 0,
            "User.email": 0,
            "User.password": 0,
            "User.Devices": 0,
            "User.Role": 0,
            "User.__v": 0,
            "User.Token": 0,
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                { $arrayElemAt: ["$Image", 0] },
                { User: "$User" },
                { UserPinned: true },
              ],
            },
          },
        },
      ]);

      Res.json({
        Status: "Success",
        Data: UserPins,
      });
    } else {
      Res.json({
        Status: "Faild",
        message: "You are not authorized !",
      });
    }
  } catch (err) {
    console.log(err);
    Res.json({
      Status: "Faild",
      message: "Something Happens wrong !",
    });
  }
};

// Handle Create_Pins action
const Create_Pins = async (Req, Res) => {
  const { User_id, Token, Image_id } = Req.body;

  try {
    // body validation data for check the data that have been send
    const Errors = validationResult(Req);
    if (!Errors.isEmpty()) {
      Res.json({
        Status: "Faild",
        message: "Data are not Valid !",
      });
    }
    if (User_id === Token._id) {
      // find if the image Pinned with that user before
      const Find_Pinned_Image = await Pins_Model.findOne({ Image_id, User_id });

      if (Find_Pinned_Image) {
        // if the user Pinned that image before delte that like
        await Pins_Model.deleteOne({ Image_id, User_id });
        await Users_Model.updateOne({ _id: User_id }, { $inc: { Pins: -1 } });
        await Images_Model.updateOne(
          { _id: Image_id },
          { $inc: { Pined: -1 } }
        );

        Res.json({
          Status: "Success",
          message: "Pinned Deleted !",
        });
      } else {
        // if not that user Pinned that image before add like
        const NEW_Pin = new Pins_Model({ Image_id, User_id });
        await NEW_Pin.save();
        await Users_Model.updateOne({ _id: User_id }, { $inc: { Pins: 1 } });
        await Images_Model.updateOne({ _id: Image_id }, { $inc: { Pined: 1 } });

        Res.json({
          Status: "Success",
          message: "Pin Added !",
        });
      }
    } else {
      Res.json({
        Status: "Faild",
        message: "You are not authorized !",
      });
    }
  } catch (err) {
    console.log(err);
    Res.json({
      Status: "Faild",
      message: "Something Happens wrong !",
    });
  }
};

export default {
  GetPins,
  Create_Pins,
};
