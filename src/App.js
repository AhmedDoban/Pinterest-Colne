import React, { useEffect, useState } from "react";
import Auth from "./Auth/Auth";
import Guest from "./Guest/Guest";
import "normalize.css";
import "./Assets/Css/root.css";
import "./Assets/Css/style.css";

function App() {
  const [Login, SetLogin] = useState(false);
  const [Theme, SetTheme] = useState(localStorage.getItem("theme") || "light");
  const [Dark, SetDark] = useState(false);

  useEffect(() => {
    const login = localStorage.getItem("Pinterest-Login");
    if (login !== null) {
      SetLogin(true);
    }
  }, [Login]);

  useEffect(() => {
    localStorage.setItem("theme", Theme);
    Theme === "light" ? SetDark(false) : SetDark(true);
    CheckCurrentTheme();
  }, [Theme]);

  const CheckCurrentTheme = () => {
    let Root = document.documentElement.style;
    if (Theme === "light") {
      Root.setProperty("--primary-bg-color", "#f1f5f9");
      Root.setProperty("--primary-dark-color", "#161518");
      Root.setProperty("--main-p-color", "#767676");
      Root.setProperty("--input-color", "#fff");
    } else {
      Root.setProperty("--primary-bg-color", "#0f0f1b");
      Root.setProperty("--primary-dark-color", "#f6f6f6");
      Root.setProperty("--main-p-color", "#ffe8e6");
      Root.setProperty("--input-color", "#393a3f");
    }
  };
  // handle Dark mode from the navbar from auth or Guest user
  const HandelDarkMode = () => {
    const Theme = localStorage.getItem("theme");
    if (Theme === "light") {
      SetTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      SetTheme("light");
      localStorage.setItem("theme", "light");
    }
    SetDark(!Dark);
  };

  return Login ? (
    <Auth Dark={Dark} SetLogin={SetLogin} HandelDarkMode={HandelDarkMode} />
  ) : (
    <Guest Dark={Dark} SetLogin={SetLogin} HandelDarkMode={HandelDarkMode} />
  );
}

export default App;
