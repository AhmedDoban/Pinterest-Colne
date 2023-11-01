import React, { lazy, useEffect, useState } from "react";
import UserInfo from "./User info/UserInfo";
import UserNavlink from "./User Navlink/UserNavlink";
import { Route, Routes, useParams } from "react-router-dom";
import Toast_Handelar from "../../Assets/Utils/Toast_Handelar";
import axios from "axios";

const Posts = lazy(() => import("./Posts/Posts"));
const Secret = lazy(() => import("./Secret/Secret"));
const AddNewImage = lazy(() => import("./../Add New Image/AddNewImage"));

function Profile() {
  const [ProfileData, SetProfileData] = useState({});
  const { Token } = JSON.parse(localStorage.getItem("Pinterest-Login"));
  const Param = useParams();

  // Get user data from backend
  useEffect(() => {
    const GetData = async () => {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API}/Users/${Param.User_id}`,
            {},
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
              SetProfileData(Res.data.Data[0]);
            }
          });
      } catch (err) {
        Toast_Handelar("error", "Something happens wrong");
      }
    };
    GetData();
  }, [Param.User_id, Token]);

  return (
    <React.Fragment>
      <div className="Profile">
        <div className="container">
          <UserInfo ProfileData={ProfileData} />
          <UserNavlink ProfileData={ProfileData} />
          <Routes>
            <Route path="" element={<Posts />} />
            <Route path="Secret" element={<Secret />} />
          </Routes>
        </div>
        <AddNewImage />
      </div>
    </React.Fragment>
  );
}
export default Profile;
