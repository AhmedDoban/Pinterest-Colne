import React, { useState } from "react";
import BlurCircle from "../../Assets/Components/Blur Circle/BlurCircle";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import Toast_Handelar from "../../Assets/Utils/Toast_Handelar";
import axios from "axios";

function Register() {
  // To go to login page after User Successfully login
  const Navigate = useNavigate("");
  // input form data
  const [User, SetUser] = useState({
    email: "",
    password: "",
    FirstName: "",
    LastName: "",
    ShowPassword: false,
  });
  // Show or hide password
  const HandelSeePassword = () => {
    const colne_user_data = { ...User };
    colne_user_data.ShowPassword = !colne_user_data.ShowPassword;
    SetUser(colne_user_data);
  };
  // handle inputs from the form to the object USER
  const HandleInput = (e) => {
    SetUser({ ...User, [e.name]: e.value });
  };
  // handle Register button with the database api
  const Handle_Register = async () => {
    try {
      await axios
        .post(`${process.env.REACT_APP_API}/Users/Register`, {
          FirstName: User.FirstName,
          LastName: User.LastName,
          email: User.email,
          password: User.password,
        })
        .then((res) => {
          if (res.data.Status === "Faild") {
            Toast_Handelar("error", res.data.message);
          } else {
            Toast_Handelar("success", res.data.message);
            Navigate("/");
          }
        });
    } catch (err) {
      Toast_Handelar("error", "can't connect to the database");
    }
  };
  return (
    <React.Fragment>
      <div className="Register">
        <div className="container">
          <BlurCircle />
          <div className="left" data-aos="zoom-in">
            <h1>Register to Recharge Direct</h1>
            <p>
              if you have an account you can
              <Link to="/">login here !</Link>
            </p>
          </div>
          <div className="center">
            <img
              src={require("../../Assets/Images/FlyObject.png")}
              alt="FlyObject"
            />
          </div>
          <div className="right">
            <div className="form">
              <h1>Register</h1>
              <div className="infomation-box">
                <div className="input-box">
                  <input
                    type="search"
                    value={User.FirstName}
                    onChange={(e) => HandleInput(e.target)}
                    name="FirstName"
                    placeholder="First Name"
                  />
                </div>
                <div className="input-box">
                  <input
                    type="search"
                    value={User.LastName}
                    onChange={(e) => HandleInput(e.target)}
                    name="LastName"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="input-box">
                <input
                  type="search"
                  value={User.email}
                  onChange={(e) => HandleInput(e.target)}
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="input-box">
                <input
                  type={User.ShowPassword ? "text" : "password"}
                  value={User.password}
                  onChange={(e) => HandleInput(e.target)}
                  name="password"
                  placeholder="password"
                />
                {User.password.length > 0 ? (
                  <i
                    className={
                      User.ShowPassword
                        ? "fa-solid fa-eye"
                        : "fa-solid fa-eye-slash"
                    }
                    onClick={() => HandelSeePassword()}
                  />
                ) : null}
              </div>
              <p className="recover">
                when register you will accept all privilege
              </p>
              <div className="Register-box">
                <button onClick={() => Handle_Register()}>Register now</button>
              </div>
            </div>
            <span className="other-action-span">or continue with</span>
            <div className="other-action">
              <i className="fa-brands fa-google" />
              <i className="fa-brands fa-twitter" />
              <i className="fa-brands fa-facebook-f" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Register;
