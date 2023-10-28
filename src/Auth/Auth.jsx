import axios from "axios";
import React from "react";
import Toast_Handelar from "../Assets/Utils/Toast_Handelar";

function Auth(props) {
  // handle logout basics to remove data from browser and to tell database the device is logout
  const Logout_Handelar = async () => {
    console.log("LogoutHandelar");
    try {
      const { _id } = JSON.parse(localStorage.getItem("Pinterest-Login"));
      console.log(_id);
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
      <div className="Auth">
        <h1>Auth</h1>
        <button onClick={() => Logout_Handelar()}>Logout</button>
      </div>
    </React.Fragment>
  );
}
export default Auth;
