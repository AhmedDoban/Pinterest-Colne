import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar(props) {
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
          <Link className="logo" to="/">
            <img
              src={require("../../Assets/Images/logo.svg").default}
              alt="logo"
            />
            <input
              type="checkbox"
              name="darkmode"
              id="darkmode"
              checked={props.Dark}
            />
            <label htmlFor="darkmode" onClick={() => props.HandelDarkMode()} />
          </Link>
          <ul className="main_nav_menu">
            <div className="language">
              <span>
                {Language.value}
                <i
                  className={
                    Language.active
                      ? "fa-solid fa-chevron-down"
                      : "fa-solid fa-chevron-up"
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
