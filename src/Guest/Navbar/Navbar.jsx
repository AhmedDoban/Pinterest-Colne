import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [Language, Setlanguage] = useState({
    active: false,
    value: "English",
  });
  const Handlelanguage = () => {
    const language = { ...Language };
    language.active = !language.active;
    Setlanguage(language);
  };
  return (
    <React.Fragment>
      <div className="navbar">
        <div className="container">
          <div className="logo">
            <img src={require("../../Assets/Images/logo.png")} alt="logo" />
            <input type="checkbox" name="darkmode" id="darkmode" />
            <label htmlFor="darkmode"></label>
          </div>
          <ul className="main_nav_menu">
            <div className="language">
              <span>
                {Language.value}
                <i
                  className={
                    Language.active
                      ? "fa-solid fa-chevron-up"
                      : "fa-solid fa-chevron-down"
                  }
                  onClick={() => Handlelanguage()}
                />
              </span>
              <div className={Language.active ? "dropdown active" : "dropdown"}>
                <span>Arabic</span>
                <span className="active">English</span>
                <span>Japan</span>
              </div>
            </div>
            <li>
              <NavLink to="">Login</NavLink>
            </li>
            <li>
              <NavLink to="/Register">Register</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Navbar;
