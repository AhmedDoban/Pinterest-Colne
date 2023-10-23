import React, { Suspense, lazy } from "react";
import "./Guest.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Loading from "../Assets/Components/Loading/Loading";
const Login = lazy(() => import("./Login/Login"));
const Register = lazy(() => import("./Register/Register"));

function Guest(props) {
  return (
    <React.Fragment>
      <div className="Guest">
        <Navbar
          SetDark={props.SetDark}
          Dark={props.Dark}
          SetTheme={props.SetTheme}
        />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </Suspense>
      </div>
    </React.Fragment>
  );
}
export default Guest;
