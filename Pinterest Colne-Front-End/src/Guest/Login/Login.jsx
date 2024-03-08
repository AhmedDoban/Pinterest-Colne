import React, { useState } from "react";
import BlurCircle from "../../Assets/Components/Blur Circle/BlurCircle";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import Toast_Handelar from "../../Assets/Utils/Toast_Handelar";

function Login(props) {
  const [User, SetUser] = useState({
    email: "",
    password: "",
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
  // handle login button with the database api
  const LoginHandelar = async () => {
    try {
      await axios
        .post(`${process.env.REACT_APP_API}/Users/Login`, {
          email: User.email,
          password: User.password,
        })
        .then((response) => {
          if (response.data.Status === "Faild") {
            Toast_Handelar("error", response.data.message);
          } else {
            localStorage.setItem(
              "Pinterest-Login",
              JSON.stringify(response.data.Data)
            );
            props.SetLogin(true);
          }
        });
    } catch (err) {
      Toast_Handelar("error", "can't connect to the database");
    }
  };

  return (
    <React.Fragment>
      <div className="login">
        <div className="container">
          <BlurCircle />
          <div className="left" data-aos="zoom-in">
            <h1>Sign In to Recharge Direct</h1>
            <p>
              if you don’t have an account you can
              <Link to="Register">Register here !</Link>
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
              <h1>Login</h1>
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
              <p className="recover">Recover Password ?</p>
              <div className="Sign-box">
                <button onClick={() => LoginHandelar()}>Sign in</button>
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
export default Login;
