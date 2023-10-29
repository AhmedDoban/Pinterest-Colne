import React from "react";
import axios from "axios";
import Toast_Handelar from "./../../Assets/Utils/Toast_Handelar";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(props) {
  const { _id } = JSON.parse(localStorage.getItem("Pinterest-Login"));
  // handle logout basics to remove data from browser and to tell database the device is logout
  const Logout_Handelar = async () => {
    try {
      await axios
        .post(`${process.env.REACT_APP_API}/Users/Logout`, { _id })
        .then((response) => {
          if (response.data.Status === "Faild") {
            Toast_Handelar("error", response.data.message);
          } else {
            localStorage.removeItem("Pinterest-Login");
            props.SetLogin(false);
            Toast_Handelar("success", response.data.message);
          }
        });
    } catch (err) {
      Toast_Handelar("error", "can't connect to the database");
    }
  };

  return (
    <React.Fragment>
      <div className="navbar">
        <div className="container">
          <Link className="logo" to="/">
            <img
              src={require("../../Assets/Images/logo.svg").default}
              alt="Logo"
            />
          </Link>
          <div className="search" to="/">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="search" placeholder="Search" />
          </div>
          <div className="setting-nav">
            <div className="Theme">
              <input
                type="checkbox"
                name="darkmode"
                id="darkmode"
                checked={props.Dark}
              />
              <div className="darkmodeimg">
                <label
                  htmlFor="darkmode"
                  onClick={() => props.HandelDarkMode()}
                />
              </div>
            </div>
            <Link to={`/User/${_id}`}>
              <i className="fa-solid fa-user" />
            </Link>
            <Link to="/">
              <i
                className="fa-solid fa-right-from-bracket"
                onClick={() => Logout_Handelar()}
              />
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
