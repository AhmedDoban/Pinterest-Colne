import React, { Suspense, lazy, useState } from "react";
import Navbar from "./Navbar/Navbar";
import "./Auth.css";
import Loading from "../Assets/Components/Loading/Loading";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./Home/Home"));
const Profile = lazy(() => import("./Profile/Profile"));
const Setting = lazy(() => import("./Profile/Setting/Setting"));
const NotFound = lazy(() => import("../Assets/Components/Not Found/NotFound"));

function Auth(props) {
  const [ReloadPage, SetReloadPage] = useState(false);

  return (
    <React.Fragment>
      <div className="Auth">
        <Navbar
          SetLogin={props.SetLogin}
          Dark={props.Dark}
          HandelDarkMode={props.HandelDarkMode}
          ReloadPage={ReloadPage}
        />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path=""
              element={
                <Home ReloadPage={ReloadPage} SetReloadPage={SetReloadPage} />
              }
            />
            <Route
              path="/User/:User_id"
              element={
                <Profile
                  ReloadPage={ReloadPage}
                  SetReloadPage={SetReloadPage}
                />
              }
            >
              <Route path="" exact />
              <Route path="Secret" />
            </Route>
            <Route path="/Setting" element={<Setting />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </React.Fragment>
  );
}
export default Auth;
