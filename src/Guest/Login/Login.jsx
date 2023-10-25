import React, { useState } from "react";
import BlurCircle from "../../Assets/Components/Blur Circle/BlurCircle";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Login(props) {
  const [User, SetUser] = useState({
    email: "",
    password: "",
    ShowPassword: false,
  });
  const HandelSeePassword = () => {
    const colne_user_data = { ...User };
    colne_user_data.ShowPassword = !colne_user_data.ShowPassword;
    SetUser(colne_user_data);
  };
  const HandleInput = (e) => {
    SetUser({ ...User, [e.name]: e.value });
  };

  const LoginHandelar = async () => {
    try {
      await axios
        .post(`${process.env.REACT_APP_API}/Users/Login`, {
          email: User.email,
          password: User.password,
        })
        .then((response) => {
          if (response.data.Status === "Faild") {
            toast.error(response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: localStorage.getItem("theme"),
            });
          } else {
            localStorage.setItem(
              "Pinterest-Login",
              JSON.stringify(response.data.Data)
            );
            props.SetLogin(true);
          }
        });
    } catch (err) {
      toast.error("can't connect to the database", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.getItem("theme"),
      });
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
      <ToastContainer />
    </React.Fragment>
  );
}
export default Login;
