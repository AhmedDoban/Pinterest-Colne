import React from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "../Blur Circle/BlurCircle";
import "./NotFound.css";

function NotFound() {
  const Navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="NotFound">
        <div className="container">
          <BlurCircle />
          <div className="img-box">
            <img src={require("../../Images/SmartObject.png")} alt="" />
          </div>
          <h1>Sorry ! Page 404 </h1>
          <button onClick={() => Navigate(-1)}>Go back</button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default NotFound;
