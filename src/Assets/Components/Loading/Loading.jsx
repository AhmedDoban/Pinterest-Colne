import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <React.Fragment>
      <div className="loading">
        <div className="container">
          <div className="img-box">
            <img
              src={require("../../Images/CLoudObject.png")}
              alt="CLoud Object"
            />
          </div>
          <div className="loadingText">
            <p>l</p>
            <p>o</p>
            <p>a</p>
            <p>d</p>
            <p>i</p>
            <p>n</p>
            <p>g</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Loading;
