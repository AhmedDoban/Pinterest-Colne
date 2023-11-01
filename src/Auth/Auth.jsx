import React, { Suspense, lazy } from "react";
import Navbar from "./Navbar/Navbar";
import "./Auth.css";
import Loading from "../Assets/Components/Loading/Loading";
import { Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./Home/Home"));
const Profile = lazy(() => import("./Profile/Profile"));

function Auth(props) {
  return (
    <React.Fragment>
      <div className="Auth">
        <Navbar
          SetLogin={props.SetLogin}
          Dark={props.Dark}
          HandelDarkMode={props.HandelDarkMode}
        />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/User/:User_id" element={<Profile />}>
              <Route path="" exact />
              <Route path="Secret" />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </React.Fragment>
  );
}
export default Auth;
