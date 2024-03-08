// import schema from user modle
import Follow_Model from "../Models/Follow_Model.js";
import Users_Model from "../Models/Users_Model.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

// Handle Follow aaction
const Handle_Follow = async (Req, Res) => {
  const { Follower_id, Following_id } = Req.body;

  // body validation data for check the data that have been send
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    Res.json({
      Status: "Faild",
      message: "Data are not Valid !",
    });
  }
  try {
    // find if the image liked with that user before
    const Find_Like_Image = await Follow_Model.findOne({
      Follower_id,
      Following_id,
    });

    if (Find_Like_Image) {
      // if the user liked that image before delte that like
      await Follow_Model.deleteOne({ Follower_id, Following_id });
      await Users_Model.updateOne(
        {
          _id: Follower_id,
        },
        { $inc: { Following: -1 } }
      );
      await Users_Model.updateOne(
        {
          _id: Following_id,
        },
        { $inc: { Followers: -1 } }
      );

      Res.json({
        Status: "Success",
        message: "Follow Deleted !",
      });
    } else {
      // if not that user liked that image before add like
      const NEW_Follow = new Follow_Model({ Follower_id, Following_id });
      await NEW_Follow.save();
      await Users_Model.updateOne(
        {
          _id: Follower_id,
        },
        { $inc: { Following: 1 } }
      );
      await Users_Model.updateOne(
        {
          _id: Following_id,
        },
        { $inc: { Followers: 1 } }
      );

      Res.json({
        Status: "Success",
        message: "Follow Added !",
      });
    }
  } catch (err) {
    Res.json({
      Status: "Faild",
      message: "Something happens wrong !",
    });
  }
};

// Handle Followers of the User
const Get_Followers = async (Req, Res) => {
  const { Follower_id, User_ID } = Req.body;
  // body validation data for check the data that have been send
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    Res.json({
      Status: "Faild",
      message: "Data are not Valid !",
    });
  }

  try {
    const UserFollowers = await Follow_Model.aggregate([
      {
        $match: {
          Following_id: new mongoose.Types.ObjectId(Follower_id),
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "Follower_id",
          foreignField: "_id",
          as: "User",
        },
      },
      { $unwind: "$User" },

      {
        $project: {
          __v: 0,
          _id: 0,
          "User._id": 0,
          "User.email": 0,
          "User.password": 0,
          "User.Devices": 0,
          "User.Role": 0,
          "User.__v": 0,
          "User.Token": 0,
          "User.Secret": 0,
        },
      },
    ]);

    const FollowTable = await Follow_Model.find({ Follower_id: User_ID });

    const Data_Followers = await UserFollowers.map((Follow) => ({
      ...Follow,
      If_User_Follow: FollowTable.map((followEle) =>
        followEle.Following_id.toString()
      ).includes(Follow.Follower_id.toString()),
    }));

    Res.json({
      Status: "Success",
      Data: Data_Followers,
    });
  } catch (err) {
    Res.json({
      Status: "Faild",
      message: "Something happens wrong !",
    });
  }
};

// Handle Following of the User
const Get_Following = async (Req, Res) => {
  const { Follower_id, User_ID } = Req.body;

  // body validation data for check the data that have been send
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    Res.json({
      Status: "Faild",
      message: "Data are not Valid !",
    });
  }

  try {
    const UserFollowers = await Follow_Model.aggregate([
      {
        $match: {
          Follower_id: new mongoose.Types.ObjectId(Follower_id),
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "Following_id",
          foreignField: "_id",
          as: "User",
        },
      },
      { $unwind: "$User" },

      {
        $project: {
          __v: 0,
          _id: 0,
          "User._id": 0,
          "User.email": 0,
          "User.password": 0,
          "User.Devices": 0,
          "User.Role": 0,
          "User.__v": 0,
          "User.Token": 0,
          "User.Secret": 0,
        },
      },
    ]);

    const FollowTable = await Follow_Model.find({ Follower_id: User_ID });

    const Data_Followers = await UserFollowers.map((Follow) => ({
      ...Follow,
      If_User_Follow:
        Follower_id == User_ID
          ? FollowTable.map((followEle) =>
              followEle.Follower_id.toString()
            ).includes(Follower_id.toString())
          : FollowTable.map((followEle) =>
              followEle.Following_id.toString()
            ).includes(Follow.Following_id.toString()),
    }));

    Res.json({
      Status: "Success",
      Data: Data_Followers,
    });
  } catch (err) {
    Res.json({
      Status: "Faild",
      message: "Something happens wrong !",
    });
  }
};

export default {
  Handle_Follow,
  Get_Followers,
  Get_Following,
};
