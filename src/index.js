import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import Aos from "aos";
import 'aos/dist/aos.css';
Aos.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
