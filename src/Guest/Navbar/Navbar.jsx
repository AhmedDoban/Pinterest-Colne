import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
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
            <li>
              <span>
                English<i className="fa-solid fa-chevron-down"></i>
              </span>
              <div className="dropdown">
                <span>Arabic</span>
                <span>Japan</span>
              </div>
            </li>
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
