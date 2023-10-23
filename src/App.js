import React, { useEffect, useState } from "react";
import Auth from "./Auth/Auth";
import Guest from "./Guest/Guest";
import "normalize.css";
import "./Assets/Css/root.css";
import "./Assets/Css/style.css";

function App() {
  const [Login, SetLogin] = useState(false);

  useEffect(() => {
    const login = localStorage.getItem("Login");
    if (login !== null) {
      SetLogin(true);
    }
  }, [Login]);
  return Login ? <Auth /> : <Guest />;
}

export default App;
