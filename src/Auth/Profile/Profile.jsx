import React, { lazy, useEffect, useState } from "react";
import UserInfo from "./User info/UserInfo";
import UserNavlink from "./User Navlink/UserNavlink";
import { Route, Routes, useParams } from "react-router-dom";
import Toast_Handelar from "../../Assets/Utils/Toast_Handelar";
import axios from "axios";

const Posts = lazy(() => import("./Posts/Posts"));
const Secret = lazy(() => import("./Secret/Secret"));
const Pins = lazy(() => import("./Pins/Pins"));
const AddNewImage = lazy(() => import("./../Add New Image/AddNewImage"));
const Followers = lazy(() => import("./Followers/Followers"));
const Following = lazy(() => import("./Following/Following"));

function Profile(props) {
  const [ProfileData, SetProfileData] = useState({});
  const [IsFollow, SetIsFollow] = useState();

  const { Token, _id } = JSON.parse(localStorage.getItem("Pinterest-Login"));
  const Param = useParams();

  // Get user data from backend
  useEffect(() => {
    const GetData = async () => {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API}/Users/${Param.User_id}`,
            { User_ID: _id },
            {
              headers: {
                Authorization: Token,
              },
            }
          )
          .then((Res) => {
            if (Res.data.Status === "Faild") {
              Toast_Handelar("error", Res.data.message);
            } else {
              SetProfileData(Res.data.Data);
              SetIsFollow(Res.data.Follow_Check);
            }
          });
      } catch (err) {
        Toast_Handelar("error", "Something happens wrong");
      }
    };
    GetData();
  }, [Param.User_id, Token, props.ReloadPage, _id]);

  return (
    <React.Fragment>
      <div className="Profile">
        <div className="container">
          <UserInfo
            ProfileData={ProfileData}
            IsFollow={IsFollow}
            ReloadPage={props.ReloadPage}
            SetReloadPage={props.SetReloadPage}
          />
          <UserNavlink ProfileData={ProfileData} />
          <Routes>
            <Route
              path=""
              element={
                <Posts
                  ReloadPage={props.ReloadPage}
                  SetReloadPage={props.SetReloadPage}
                  HandleSearchBtn={props.HandleSearchBtn}
                />
              }
            />
            <Route
              path="Secret"
              element={
                <Secret
                  ReloadPage={props.ReloadPage}
                  SetReloadPage={props.SetReloadPage}
                  HandleSearchBtn={props.HandleSearchBtn}
                />
              }
            />
            <Route
              path="Pins"
              element={
                <Pins
                  ReloadPage={props.ReloadPage}
                  SetReloadPage={props.SetReloadPage}
                  HandleSearchBtn={props.HandleSearchBtn}
                />
              }
            />
            <Route
              path="Followers"
              element={
                <Followers
                  ReloadPage={props.ReloadPage}
                  SetReloadPage={props.SetReloadPage}
                />
              }
            />
            <Route
              path="Following"
              element={
                <Following
                  ReloadPage={props.ReloadPage}
                  SetReloadPage={props.SetReloadPage}
                />
              }
            />
          </Routes>
        </div>
        <AddNewImage />
      </div>
    </React.Fragment>
  );
}
export default Profile;
