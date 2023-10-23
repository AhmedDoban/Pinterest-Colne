import React, { useState } from "react";
import BlurCircle from "../../Assets/Components/Blur Circle/BlurCircle";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
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

  return (
    <React.Fragment>
      <div className="login">
        <div className="container">
          <BlurCircle />
          <div className="left">
            <h1>Sign In to Recharge Direct</h1>
            <p>
              if you don’t an account you can
              <Link to="Register">Register here!</Link>
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
                <button>Sign in</button>
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
