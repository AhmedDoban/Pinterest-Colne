// import files
import express from "express";
import Images_Controllers from "../Controllers/Images_Controllers.js";
import upload_image from "./../Multer/Multer_Images.js";
import JWT from "../Utils/JWT.js";
import { body } from "express-validator";
import Pins_Controllers from "../Controllers/Pins_Controllers.js";

const Router = express.Router();

// Routes Handelar /API/Images?Page=1&Limit=10
Router.route("/").post(
  JWT.Verify_Token,
  [body("User_id").notEmpty().withMessage("User id is not Valid")],
  Images_Controllers.Get_All_Images
);

Router.route("/Search").post(
  JWT.Verify_Token,
  [body("User_id").notEmpty().withMessage("User id is not Valid")],
  [body("Query").notEmpty().withMessage("Query is Required !")],
  Images_Controllers.Search_Images
);

// Routes Handelar /API/Images/Upload_IMG
Router.route("/Upload_IMG").post(
  JWT.Verify_Token,
  upload_image.single("url"),
  [
    body("name").notEmpty().withMessage("Name of image is required"),
    body("User_id").notEmpty().withMessage("id of User is required"),
  ],
  Images_Controllers.Upload_Image
);

// Routes Handelar /API/Images/Secret_Image
Router.route("/Secret_Image").post(
  JWT.Verify_Token,
  [body("User_id").notEmpty().withMessage("User id is not Valid")],
  [body("Token").notEmpty().withMessage("Tokn is not Valid")],
  [body("Image_id").notEmpty().withMessage("Image id is not Valid")],
  Images_Controllers.Secret_Image
);
// Routes Handelar /API/Images/Delete_Image
Router.route("/Delete_Image").post(
  JWT.Verify_Token,
  [body("User_id").notEmpty().withMessage("User id is not Valid")],
  [body("Token").notEmpty().withMessage("Tokn is not Valid")],
  [body("Image_id").notEmpty().withMessage("Image id is not Valid")],
  Images_Controllers.Delete_Image
);
// Routes Handelar /API/Images/Like_Image
Router.route("/Like_Image").post(
  JWT.Verify_Token,
  [body("User_id").notEmpty().withMessage("User id is not Valid")],
  [body("Image_id").notEmpty().withMessage("Image id is not Valid")],
  Images_Controllers.Like_Image
);
// Routes Handelar /API/Images/Pins
Router.route("/Pins").post(
  JWT.Verify_Token,
  [body("_id").notEmpty().withMessage("_id is not Valid")],
  [body("Token").notEmpty().withMessage("Tokn is not Valid")],
  Pins_Controllers.GetPins
);

// Routes Handelar /API/Images/Create_Pins
Router.route("/Create_Pins").post(
  JWT.Verify_Token,
  [body("User_id").notEmpty().withMessage("_id is not Valid")],
  [body("Image_id").notEmpty().withMessage("Image_id is not Valid")],
  [body("Token").notEmpty().withMessage("Tokn is not Valid")],
  Pins_Controllers.Create_Pins
);

export default Router;
