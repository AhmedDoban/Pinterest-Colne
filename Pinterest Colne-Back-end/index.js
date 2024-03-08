// import files
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import Users_Routes from "./App/Routes/Users_Routes.js";
import Images_Routes from "./App/Routes/Image_Routes.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// make a conection to data base
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log(`Connected to Server Successfully`));

// middlewares
const App = express();
App.use(express.json());
App.use(cors());

App.use("/Uploads", express.static(path.join(__dirname, "/Uploads")));
App.use("/API/Users", Users_Routes);
App.use("/API/Images", Images_Routes);
App.use("*", (Req, Res) => {
  Res.status(200).json({
    Status: "Faild",
    message: "Can't access this Route. ",
  });
});

// Server
App.listen(3000, () => {
  console.log("Listen in port 3000");
});
