// import schema from user modle
import Users_Model from "../Models/Users_Model.js";
import Images_Model from "../Models/Images_Model.js";
import Follow_Model from "../Models/Follow_Model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import JWT from "../Utils/JWT.js";
import mongoose from "mongoose";
import fs from "fs";

// Get All users from database
const Get_All_Users = async (Req, Res) => {
  const Page = Req.query.Page || 1;
  const Limit = Req.query.Limit || 10;
  const Skip = (Page - 1) * Limit;
  // GEt ALl users From the Data Base
  const All_Users = await Users_Model.find({}, { __v: 0, password: 0 })
    .limit(Limit)
    .skip(Skip);
  // if the page or imit greater than number of document in the database
  if ([...All_Users] != 0) {
    Res.json({
      Status: "Success",
      Data: All_Users,
    });
  } else {
    Res.json({
      Status: "Faild",
      message: "Page NOt Found",
    });
  }
};

// Get Specific User from database
const Get_Specific_User = async (Req, Res) => {
  const _id = Req.params.User_id;
  const { User_ID } = Req.body;

  try {
    // GEt users Data From the Data Base
    const Users = await Users_Model.findOne({ _id }, { __v: 0, password: 0 });
    const FollowCheck = await Follow_Model.findOne({
      Follower_id: User_ID,
      Following_id: _id,
    });

    Res.json({
      Status: "Success",
      Data: Users,
      Follow_Check: FollowCheck ? true : false,
    });
  } catch (err) {
    Res.json({
      Status: "Faild",
      message: "User not founded",
    });
  }
};

// login user authentication
const User_Login = async (Req, Res) => {
  const { email, password } = Req.body;
  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: "Faild",
      message: "Can't login please Try again later",
      data: Errors.array().map((arr) => arr.msg),
    });
  }

  try {
    // Searching in the database with email may be email is wrong
    const USER = await Users_Model.findOne({ email }, { __v: 0 });
    if (USER === null) {
      // invalid data in the body and not match the data in the database
      return Res.json({
        Status: "Faild",
        message: "Your Email not Valid .Please try again !",
      });
    }
    const USER_Password = await bcrypt.compare(password, USER.password);

    if (USER && USER_Password) {
      if (USER.Devices) {
        return Res.json({
          Status: "Faild",
          message: "There is a device login already",
        });
      } else {
        await Users_Model.updateOne({ email }, { $set: { Devices: true } });
        // return ther user data
        return Res.json({
          Status: "Success",
          Data: await Users_Model.findOne({ email }, { Token: 1, _id: 1 }),
        });
      }
    } // here found email but the password does not match
    else {
      return Res.json({
        Status: "Faild",
        message: "Sorry Password is wrong !",
      });
    }
  } catch (err) {
    // Error in serching handelar
    return Res.json({
      Status: "Faild",
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

// logout user authentication
const User_Logout = async (Req, Res) => {
  const USER_ID = Req.body._id;
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: "Faild",
      message: "ID is required !",
    });
  }
  try {
    const USER_Data = await Users_Model.findById(USER_ID);

    if (USER_Data === null) {
      return Res.json({
        Status: "Faild",
        message: "Your ID not Valid. Please try again !",
      });
    }
    await Users_Model.updateOne({ _id: USER_ID }, { $set: { Devices: false } });

    return Res.json({
      Status: "Success",
      message: "Logged out successfully!",
    });
  } catch (err) {
    // Error in serching handelar
    return Res.json({
      Status: "Faild",
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

// register user authentication and store him into database
const User_Register = async (Req, Res) => {
  const { FirstName, LastName, email, password, Role } = Req.body;
  const Errors = validationResult(Req);
  const Check_User = await Users_Model.findOne({ email });
  // Body Validation Before Searching in the database to increase performance
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: "Faild",
      message: "Can't Register please Try again later",
      data: Errors.array().map((arr) => arr.msg),
    });
  }
  // Searching in the database to find if the user is exist
  if (Check_User) {
    return Res.json({
      Status: "Faild",
      message: "User Is already exist",
    });
  }

  try {
    const Hashed_Password = await bcrypt.hash(
      password,
      +process.env.HASH_PASSWORD
    );

    const USER = new Users_Model({
      FirstName,
      LastName,
      email,
      password: Hashed_Password,
      Role,
    });

    USER.Token = await JWT.Genetate_Token(USER);

    await USER.save();

    // return user data after saving it in the database
    return Res.json({
      Status: "Success",
      message: "User Created Successfully",
    });
  } catch (err) {
    // Error in Saving handelar
    return Res.json({
      Status: "Faild",
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

// Get user Posts
const GetPosts = async (Req, Res) => {
  const { _id } = Req.body;
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    Res.json({
      Status: "Faild",
      message: "data are missing !",
    });
  }
  try {
    const UserPosts = await Images_Model.aggregate([
      { $sort: { Created_At: -1 } },
      {
        $match: {
          User_id: new mongoose.Types.ObjectId(_id),
          Secret: false,
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
    ]);

    const Data_Posts = await UserPosts.map((Feed) => ({
      ...Feed,
      If_User_Like: Feed.Users_Liked.map((img) =>
        _id == img.User_id ? true : false
      ).includes(true),
    }));

    Res.json({
      Status: "Success",
      Data: Data_Posts,
    });
  } catch (err) {
    Res.json({
      Status: "Faild",
      message: "Something Happens wrong !",
    });
  }
};

// Get user Secrerts
const GetSecret = async (Req, Res) => {
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
      const UserPosts = await Images_Model.aggregate([
        { $sort: { Created_At: -1 } },
        {
          $match: {
            User_id: new mongoose.Types.ObjectId(_id),
            Secret: true,
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
      ]);

      const Data_Secret = await UserPosts.map((Feed) => ({
        ...Feed,
        If_User_Like: Feed.Users_Liked.map((img) =>
          _id == img.User_id ? true : false
        ).includes(true),
      }));

      Res.json({
        Status: "Success",
        Data: Data_Secret,
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
      message: "Something Happens wrong !",
    });
  }
};

// Handle User password and change his password
const ChangePassword = async (Req, Res) => {
  const { User_id, email, password, NewPassword } = Req.body;
  // body validation data for check the data that have been send
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    Res.json({
      Status: "Faild",
      message: "Data are not Valid !",
    });
  }

  try {
    // find the user with email and id to get user password to chek password
    const USER = await Users_Model.findOne({
      _id: new mongoose.Types.ObjectId(User_id),
      email: email,
    });
    // check the password in the body if password the same with user password
    const USER_Password = await bcrypt.compare(password, USER.password);
    // if user exist and password true
    if (USER && USER_Password) {
      // create a new password for user
      const New_Hashed_Password = await bcrypt.hash(
        NewPassword,
        +process.env.HASH_PASSWORD
      );
      // update the user data
      const Update_User_Password = await Users_Model.updateOne(
        {
          _id: new mongoose.Types.ObjectId(User_id),
          email: email,
          password: USER.password,
        },
        { $set: { password: New_Hashed_Password } }
      );
      // return the data for the user after update
      Res.json({
        Status: "Success",
        message: "password changes successfully !",
      });
    } else {
      // if the user or the password not founded
      Res.json({
        Status: "Faild",
        message: "Check Your password and try again !",
      });
    }
  } catch (err) {
    // catch errors
    Res.json({
      Status: "Faild",
      message: "You are not authorized !",
    });
  }
};

// Handle change User data
const ChangeUserData = async (Req, Res) => {
  const { User_id, email, USER } = Req.body;
  // body validation data for check the data that have been send
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    Res.json({
      Status: "Faild",
      message: "Data are not Valid !",
    });
  }

  try {
    // update the user data
    await Users_Model.updateOne(
      {
        _id: new mongoose.Types.ObjectId(User_id),
        email: email,
      },
      { $set: USER }
    );
    // return the data for the user after update
    Res.json({
      Status: "Success",
      message: "personal data changed successfully !",
    });
  } catch (err) {
    // catch errors
    Res.json({
      Status: "Faild",
      message: "You are not authorized !",
    });
  }
};

// Handle change User Avatar
const ChangeUserAvatar = async (Req, Res) => {
  const { User_id, email } = Req.body;
  // body validation data for check the data that have been send
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    Res.json({
      Status: "Faild",
      message: "Data are not Valid !",
    });
  }

  try {
    // find the user with email and id to 
    const USER = await Users_Model.findOne({
      _id: new mongoose.Types.ObjectId(User_id),
      email: email,
    });
    const { Avatar } = USER;

    if (Avatar !== "Uploads/avatar.jpg") {
      await fs.unlinkSync(Avatar);
    }
    // update the user data
    await Users_Model.updateOne(
      {
        _id: new mongoose.Types.ObjectId(User_id),
        email: email,
      },
      { $set: { Avatar: `Uploads/Avatars/${Req.file.filename}` } }
    );
    // return the data for the user after update
    Res.json({
      Status: "Success",
      message: "Avatar changed successfully !",
    });
  } catch (err) {
    // catch errors
    Res.json({
      Status: "Faild",
      message: "You are not authorized !",
    });
  }
};

// export all function to routes
export default {
  Get_All_Users,
  User_Login,
  User_Register,
  User_Logout,
  Get_Specific_User,
  GetPosts,
  GetSecret,
  ChangePassword,
  ChangeUserData,
  ChangeUserAvatar,
};
