// import files
import express from "express";
import Users_controllers from "../Controllers/Users_controllers.js";
import { body } from "express-validator";
import JWT from "../Utils/JWT.js";
import Verify_User from "../Utils/Verify_User.js";
import upload_Avatar from "./../Multer/Multer_Avatars.js";
import Follow_Controllers from "../Controllers/Follow_Controllers.js";

const Router = express.Router();

// Routes Handelar /API/Users?Page=1Limit=10
Router.route("/").post(
  JWT.Verify_Token, 
  Verify_User("ADMIN", "MANAGER"),
  Users_controllers.Get_All_Users
);

// Routes Handelar /API/Users/Login
Router.route("/Login").post(
  [
    body("email")
      .notEmpty()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)
      .withMessage("Email is not Valid"),
    body("password")
      .notEmpty()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gi)
      .withMessage("Password is not Valid"),
  ],
  Users_controllers.User_Login
);

// Routes Handelar /API/Users/Logout
Router.route("/Logout").post(
  [body("_id").notEmpty().withMessage("id is required")],
  Users_controllers.User_Logout
);

// Routes Handelar /API/Users/Register
Router.route("/Register").post(
  [
    body("email")
      .notEmpty()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/gi)
      .withMessage("Email is not Valid"),
    body("password")
      .notEmpty()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gi)
      .withMessage("Password is not Valid"),
    body("FirstName").notEmpty().withMessage("First Name is not Valid"),
    body("LastName").notEmpty().withMessage("Last Name is not Valid"),
  ],
  Users_controllers.User_Register
);

// Routes Handelar /API/Users/Posts
Router.route("/Posts").post(
  JWT.Verify_Token,
  [body("_id").notEmpty().withMessage("_id is not Valid")],
  Users_controllers.GetPosts
);

// Routes Handelar /API/Users/Secret
Router.route("/Secret").post(
  JWT.Verify_Token,
  [body("_id").notEmpty().withMessage("_id is not Valid")],
  [body("Token").notEmpty().withMessage("Tokn is not Valid")],
  Users_controllers.GetSecret
);

// Routes Handelar /API/Users/Secret
Router.route("/Follow").post(
  JWT.Verify_Token,
  [body("Follower_id").notEmpty().withMessage("Follower_id is not Valid")],
  [body("Following_id").notEmpty().withMessage("Following_id is not Valid")],
  Follow_Controllers.Handle_Follow
);

// Routes Handelar /API/Users/Secret
Router.route("/Following").post(
  JWT.Verify_Token,
  [body("Follower_id").notEmpty().withMessage("Follower_id is not Valid")],
  [body("User_ID").notEmpty().withMessage("Following_id is not Valid")],
  Follow_Controllers.Get_Following
);

// Routes Handelar /API/Users/Secret
Router.route("/Followers").post(
  JWT.Verify_Token,
  [body("Follower_id").notEmpty().withMessage("Follower_id is not Valid")],
  [body("User_ID").notEmpty().withMessage("Following_id is not Valid")],
  Follow_Controllers.Get_Followers
);

// Routes Handelar /API/Users/
Router.route("/Setting/Password").post(
  JWT.Verify_Token,
  [
    body("User_id").notEmpty().withMessage("User id is not Valid"),
    body("email")
      .notEmpty()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/gi)
      .withMessage("Email is not Valid"),
    body("password")
      .notEmpty()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gi)
      .withMessage("Password is not Valid"),
    body("NewPassword")
      .notEmpty()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gi)
      .withMessage("New Password is not Valid"),
  ],
  Users_controllers.ChangePassword
);
// Routes Handelar /API/Users/Setting/Personal
Router.route("/Setting/Personal").post(
  JWT.Verify_Token,
  [
    body("User_id").notEmpty().withMessage("User id is not Valid"),
    body("email")
      .notEmpty()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/gi)
      .withMessage("Email is not Valid"),
    body("USER").notEmpty().withMessage("Data is not Valid"),
  ],
  Users_controllers.ChangeUserData
);

// Routes Handelar /API/Users/Setting/Upload_Avatar
Router.route("/Setting/Upload_Avatar").post(
  JWT.Verify_Token,
  upload_Avatar.single("Avatar"),
  [
    body("User_id").notEmpty().withMessage("User id is not Valid"),
    body("email")
      .notEmpty()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/gi)
      .withMessage("Email is not Valid"),
  ],
  Users_controllers.ChangeUserAvatar
);

// Routes Handelar /API/Users/ID
Router.route("/:User_id").post(
  JWT.Verify_Token,
  [body("User_ID").notEmpty().withMessage("Following_id is not Valid")],
  Users_controllers.Get_Specific_User
);

export default Router;
