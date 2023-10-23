import React, { Suspense, lazy } from "react";
import "./Guest.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Loading from "../Assets/Components/Loading/Loading";
const Login = lazy(() => import("./Login/Login"));
const Register = lazy(() => import("./Register/Register"));

function Guest() {
  return (
    <React.Fragment>
      <div className="Guest">
        <Navbar />
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
