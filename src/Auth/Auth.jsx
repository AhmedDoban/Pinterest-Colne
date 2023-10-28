import React from "react";
import Navbar from "./Navbar/Navbar";
import "./Auth.css";

function Auth(props) {
  return (
    <React.Fragment>
      <div className="Auth">
        <Navbar
          SetLogin={props.SetLogin}
          Dark={props.Dark}
          HandelDarkMode={props.HandelDarkMode}
        />
      </div>
    </React.Fragment>
  );
}
export default Auth;
