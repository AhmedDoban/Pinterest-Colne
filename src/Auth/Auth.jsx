import React, { Suspense, lazy, useState } from "react";
import Navbar from "./Navbar/Navbar";
import "./Auth.css";
import Loading from "../Assets/Components/Loading/Loading";
import { Route, Routes, useNavigate } from "react-router-dom";
import Search from "./Search/Search";

const Home = lazy(() => import("./Home/Home"));
const Profile = lazy(() => import("./Profile/Profile"));
const Setting = lazy(() => import("./Profile/Setting/Setting"));
const NotFound = lazy(() => import("../Assets/Components/Not Found/NotFound"));

function Auth(props) {
  const [ReloadPage, SetReloadPage] = useState(false);
  const [SearchInput, SetSearchInput] = useState("");
  const [IsSearch, SetIsSearch] = useState(false);
  const [SerchingChange, SetSerchingChange] = useState(false);
  const Navigate = useNavigate();

  const HandleSearch = (e) => {
    if (e.key === "Enter") {
      if (SearchInput !== "") {
        Navigate("/Search");
        SetIsSearch(false);
        SetSerchingChange(!SerchingChange);
      }
    }
  };
  const HandleSearchBtn = (Query) => {
    if (SearchInput !== "") {
      Navigate("/Search");
      SetIsSearch(false);
      SetSerchingChange(!SerchingChange);
    }
    if (Query !== "") {
      Navigate("/Search");
      SetIsSearch(false);
      SetSerchingChange(!SerchingChange);
      SetSearchInput(Query);
    }
  };

  return (
    <React.Fragment>
      <div className="Auth">
        <Navbar
          SetLogin={props.SetLogin}
          Dark={props.Dark}
          HandelDarkMode={props.HandelDarkMode}
          ReloadPage={ReloadPage}
          SetIsSearch={SetIsSearch}
          Search={SearchInput}
          SetSearch={SetSearchInput}
          HandleSearch={HandleSearch}
          HandleSearchBtn={HandleSearchBtn}
        />
        <div
          className={IsSearch ? "overlay-search active" : "overlay-search"}
        />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path=""
              element={
                <Home
                  ReloadPage={ReloadPage}
                  SetReloadPage={SetReloadPage}
                  HandleSearchBtn={HandleSearchBtn}
                />
              }
            />
            <Route
              path="/Search"
              element={
                <Search
                  ReloadPage={ReloadPage}
                  SetReloadPage={SetReloadPage}
                  SearchInput={SearchInput}
                  SerchingChange={SerchingChange}
                  SetSerchingChange={SetSerchingChange}
                  HandleSearchBtn={HandleSearchBtn}
                />
              }
            />
            <Route
              path="/User/:User_id"
              element={
                <Profile
                  ReloadPage={ReloadPage}
                  SetReloadPage={SetReloadPage}
                  HandleSearchBtn={HandleSearchBtn}
                />
              }
            >
              <Route path="" exact />
              <Route path="Secret" />
              <Route path="Pins" />
              <Route path="Followers" />
              <Route path="Following" />
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
