// import schema from user modle
import Images_Model from "../Models/Images_Model.js";
import Users_Model from "../Models/Users_Model.js";
import Likes_Model from "../Models/Likes_Model.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import fs from "fs";

// Get All Images from database
const Get_All_Images = async (Req, Res) => {
  const Page = Req.query.Page || 1;
  const Limit = Req.query.Limit || 20;
  const Skip = (Page - 1) * Limit;
  const User_id = Req.body.User_id;
  // GEt ALL Images From the Data Base with the user who post that image

  const New_Feed = await Images_Model.aggregate([
    { $sort: { Created_At: -1 } },
    { $match: { Secret: false } },
    {
      $lookup: {
        from: "Users",
        localField: "User_id",
        foreignField: "_id",
        as: "User",
      },
    },
    { $unwind: "$User" },
    {
      $lookup: {
        from: "Likes",
        localField: "_id",
        foreignField: "Image_id",
        as: "Users_Liked",
      },
    },
    {
      $lookup: {
        from: "Pins",
        localField: "_id",
        foreignField: "Image_id",
        as: "Pins",
      },
    },

    {
      $project: {
        __v: 0,
        "User._id": 0,
        "User.email": 0,
        "User.password": 0,
        "User.Devices": 0,
        "User.Role": 0,
        "User.__v": 0,
        "User.Token": 0,
      },
    },

    { $skip: +Skip },
    { $limit: +Limit },
  ]);

  const Data_Feed = await New_Feed.map((Feed) => ({
    ...Feed,
    If_User_Like: Feed.Users_Liked.map((img) =>
      User_id == img.User_id ? true : false
    ).includes(true),
    UserPinned: Feed.Pins.map((img) =>
      User_id == img.User_id ? true : false
    ).includes(true),
  }));

  Res.json({
    Status: "Success",
    Data: Data_Feed,
  });
};

// Get Searched Image from database
const Search_Images = async (Req, Res) => {
  const Page = Req.query.Page || 1;
  const Limit = Req.query.Limit || 20;
  const Skip = (Page - 1) * Limit;
  const { User_id, Query } = Req.body;
  // GEt ALL Images From the Data Base with the user who post that image

  const New_Feed = await Images_Model.aggregate([
    { $sort: { Created_At: -1 } },
    {
      $match: {
        $or: [
          {
            Secret: false,
            name: { $regex: new RegExp(Query, "i") },
          },
          { Secret: false, Tags: { $in: [new RegExp(Query, "i")] } },
        ],
      },
    },
    {
      $lookup: {
        from: "Users",
        localField: "User_id",
        foreignField: "_id",
        as: "User",
      },
    },
    { $unwind: "$User" },
    {
      $lookup: {
        from: "Likes",
        localField: "_id",
        foreignField: "Image_id",
        as: "Users_Liked",
      },
    },
    {
      $lookup: {
        from: "Pins",
        localField: "_id",
        foreignField: "Image_id",
        as: "Pins",
      },
    },

    {
      $project: {
        __v: 0,
        "User._id": 0,
        "User.email": 0,
        "User.password": 0,
        "User.Devices": 0,
        "User.Role": 0,
        "User.__v": 0,
        "User.Token": 0,
      },
    },

    { $skip: +Skip },
    { $limit: +Limit },
  ]);

  const Search_Feed = await New_Feed.map((Feed) => ({
    ...Feed,
    If_User_Like: Feed.Users_Liked.map((img) =>
      User_id == img.User_id ? true : false
    ).includes(true),
    UserPinned: Feed.Pins.map((img) =>
      User_id == img.User_id ? true : false
    ).includes(true),
  }));

  Res.json({
    Status: "Success",
    Data: Search_Feed,
  });
};

// Upload new Image
const Upload_Image = async (Req, Res) => {
  const { User_id, name, Tags } = Req.body;
  try {
    const USER = await Users_Model.find(new mongoose.Types.ObjectId(User_id));
    const User_Posts = +USER[0].Posts;

    const Errors = validationResult(Req);
    if (!Errors.isEmpty()) {
      return Res.json({
        Status: "Faild",
        message: "Some data missing to send !",
      });
    }
    const New_image = new Images_Model({
      User_id,
      name,
      url: `Uploads/Images/${Req.file.filename}`,
      Created_At: new Date(),
      Tags,
    });
    const UPDATEUSER = await Users_Model.updateOne(
      { _id: new mongoose.Types.ObjectId(User_id) },
      { $set: { Posts: User_Posts + 1 } }
    );

    await New_image.save();

    Res.json({
      Status: "Success",
      message: "New image added",
    });
  } catch (err) {
    Res.json({
      Status: "Faild",
      message: "Some data missing to send !",
    });
  }
};

// Handle User Secrets add to secret
const Secret_Image = async (Req, Res) => {
  const { User_id, Token, Image_id } = Req.body;

  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    Res.json({
      Status: "Faild",
      message: "data are missing !",
    });
  }

  try {
    if (User_id === Token._id) {
      const IMAGE = await Images_Model.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(Image_id),
          User_id: new mongoose.Types.ObjectId(User_id),
        },
        [{ $set: { Secret: { $not: "$Secret" } } }]
      );

      const USER = await Users_Model.updateOne(
        {
          _id: new mongoose.Types.ObjectId(User_id),
        },
        {
          $inc: IMAGE.Secret
            ? { Posts: 1, Secret: -1 }
            : { Posts: -1, Secret: 1 },
        }
      );

      Res.json({
        Status: "Success",
        message: IMAGE.Secret
          ? "Image Shown Successfully"
          : "Image hidden Successfully",
      });
    } else {
      Res.json({
        Status: "Faild",
        message: "You are not authorized !",
      });
    }
  } catch (err) {
    Res.json({
      Status: "Faild",
      message: "Something happens wrong !",
    });
  }
};

// Handle User delete an image
const Delete_Image = async (Req, Res) => {
  const { User_id, Token, Image_id } = Req.body;

  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    Res.json({
      Status: "Faild",
      message: "data are missing !",
    });
  }

  try {
    if (User_id === Token._id) {
      const IMAGE = await Images_Model.findOneAndDelete({
        _id: Image_id,
        User_id: User_id,
      });

      fs.unlinkSync(IMAGE.url);

      const USER = await Users_Model.updateOne(
        {
          _id: new mongoose.Types.ObjectId(User_id),
        },
        {
          $inc: IMAGE.Secret ? { Secret: -1 } : { Posts: -1 },
        }
      );
      await Likes_Model.deleteMany({ Image_id });

      Res.json({
        Status: "Success",
        message: "Image Deleted Succfully !",
      });
    } else {
      Res.json({
        Status: "Faild",
        message: "You are not authorized !",
      });
    }
  } catch (err) {
    Res.json({
      Status: "Faild",
      message: "Something happens wrong !",
    });
  }
};

// Handle User like an image
const Like_Image = async (Req, Res) => {
  const { User_id, Image_id } = Req.body;

  const Errors = validationResult(Req);
  // handel body Validation
  if (!Errors.isEmpty()) {
    Res.json({
      Status: "Faild",
      message: "data are missing !",
    });
  }

  try {
    // find if the image liked with that user before
    const Find_Like_Image = await Likes_Model.findOne({ User_id, Image_id });

    if (Find_Like_Image) {
      // if the user liked that image before delte that like
      await Likes_Model.deleteOne({ User_id, Image_id });
      await Images_Model.updateOne(
        {
          _id: Image_id,
        },
        { $inc: { Loves: -1 } }
      );

      Res.json({
        Status: "Success",
        message: "Like Deleted !",
      });
    } else {
      // if not that user liked that image before add like
      const NEW_Like = new Likes_Model({ User_id, Image_id });
      await NEW_Like.save();
      await Images_Model.updateOne(
        {
          _id: Image_id,
        },
        { $inc: { Loves: 1 } }
      );
      Res.json({
        Status: "Success",
        message: "Like Added !",
      });
    }
  } catch (err) {
    Res.json({
      Status: "Faild",
      message: "Something happens wrong !",
    });
  }
};

export default {
  Get_All_Images,
  Upload_Image,
  Secret_Image,
  Delete_Image,
  Like_Image,
  Search_Images,
};
