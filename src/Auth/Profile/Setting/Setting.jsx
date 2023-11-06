import axios from "axios";
import React, { useEffect, useState } from "react";
import Toast_Handelar from "../../../Assets/Utils/Toast_Handelar";
import { Player } from "@lottiefiles/react-lottie-player";
import Links from "./Links/Links";
import "./Setting.css";

function Setting(props) {
  const { Token, _id } = JSON.parse(localStorage.getItem("Pinterest-Login"));

  const [ProfileData, SetProfileData] = useState({});
  const [Loading, SetLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [NewAvatarUrl, SetNewAvatarUrl] = useState("");
  const [NewLink, SetNewLink] = useState({
    Icon: "",
    Link: "",
    Name: "",
  });
  const [NewPassword, SetNewPassword] = useState({
    password: "",
    NewPassword: "",
    ReNewPassword: "",
  });

  // Get user data from backend
  useEffect(() => {
    const GetData = async () => {
      try {
        SetLoading(true);
        await axios
          .post(
            `${process.env.REACT_APP_API}/Users/${_id}`,
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
              SetLoading(false);
            }
          });
      } catch (err) {
        Toast_Handelar("error", "Something happens wrong");
      }
    };
    GetData();
  }, [_id, Token]);

  // handel change file input
  const UploadNewAvatar = (e) => {
    const File = e.target.files[0];
    setProgress(0);
    if (File.type.split("/")[0] === "image") {
      const NewDataUserClone = { ...ProfileData, Avatar: File };
      if ((File.size / 1000).toFixed(0) >= 1028) {
        Toast_Handelar("error", "File size cannot exceed more than 1MB");
      } else {
        SetProfileData(NewDataUserClone);
        SetNewAvatarUrl(URL.createObjectURL(File));
      }
    } else {
      Toast_Handelar("error", "File Must be an image !");
    }
  };

  // handel delete image file
  const HandelDelteImage = () => {
    SetNewAvatarUrl("");
    const NewDataUserClone = { ...ProfileData, Avatar: "" };
    SetProfileData(NewDataUserClone);
    setProgress(0);
  };

  // handel input change data
  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    SetProfileData({ ...ProfileData, [name]: value });
  };

  // Handel Select link data
  const HandleSelect = (e) => {
    const LinkClone = { ...NewLink };
    const EditLink = { ...LinkClone, Icon: e[0].Icon, Name: e[0].value };
    SetNewLink(EditLink);
  };

  // Handle Add Link
  const HandleAddLink = () => {
    const LinkClone = { ...NewLink };
    if (LinkClone.Name !== "" && LinkClone.Link !== "") {
      const ProfileDataClone = { ...ProfileData };
      const Links = ProfileDataClone.Links;
      Links.push(LinkClone);
      SetProfileData({ ...ProfileDataClone });
    } else {
      Toast_Handelar("error", "Some Data are Required !");
    }
  };

  // Handle Delte Link
  const HandleDelteLink = (index) => {
    const ProfileDataClone = { ...ProfileData };
    const Links = ProfileDataClone.Links;
    Links.splice(index, 1);
    SetProfileData(ProfileDataClone);
  };

  // Handel Change password inputs
  const HandleChangePasswordInput = (e) => {
    const { name, value } = e.target;
    SetNewPassword({ ...NewPassword, [name]: value });
  };

  const HandleChangePassword = () => {
    if (NewPassword.NewPassword === NewPassword.ReNewPassword) {
      try {
        axios.post(process.env.REACT_APP_API).then((res) => {
          if (res.data.Status === "Faild") {
            Toast_Handelar("error", res.data.message);
          } else {
            Toast_Handelar("success", res.data.message);
          }
        });
      } catch (err) {
        Toast_Handelar("error", "Something happens wrong !");
      }
    } else {
      Toast_Handelar(
        "error",
        "there is no match between new password and re new password"
      );
    }
  };

  return (
    <React.Fragment>
      <div className="setting">
        {Loading ? (
          <div className="loading-data">
            <Player
              autoplay
              loop
              src={require("./../../../Assets/Images/Loading.json")}
              className="player-loading"
            />
            <p>Wait a moment we are loading your data 😊</p>
          </div>
        ) : (
          <React.Fragment>
            <div className="container">
              {/**************************** Start left data handelars *************************/}
              <div className={NewAvatarUrl ? "left active" : "left"}>
                <div className="input-box">
                  {NewAvatarUrl ? (
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => HandelDelteImage()}
                    />
                  ) : (
                    <React.Fragment>
                      <input
                        type="file"
                        name="Avatar"
                        id="avatar"
                        hidden
                        onChange={(e) => UploadNewAvatar(e)}
                      />
                      <label htmlFor="avatar">Upload avatar</label>
                    </React.Fragment>
                  )}

                  <img
                    src={
                      NewAvatarUrl
                        ? NewAvatarUrl
                        : ProfileData.Avatar !== ""
                        ? `${process.env.REACT_APP_API_UPLOADS}/${ProfileData.Avatar}`
                        : `${process.env.REACT_APP_API_UPLOADS}/Uploads/avatar.jpg`
                    }
                    alt={`${ProfileData.FirstName} ${ProfileData.LastName}`}
                  />
                </div>
                <div className="progress-bar">
                  <span style={{ width: `${progress}%` }}></span>
                </div>
                {NewAvatarUrl && <button>Change Photo</button>}
              </div>
              {/**************************** End ********************************/}
              {/**************************** Start right data handelars *************************/}
              <div className="right">
                <div className="input-box-two">
                  <div className="input-box">
                    <label htmlFor="FirstName">First Name</label>
                    <input
                      type="search"
                      name="FirstName"
                      id="FirstName"
                      placeholder="Enter Your First Name"
                      value={ProfileData.FirstName}
                      onChange={(e) => HandleInputChange(e)}
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="LastName">Last Name</label>
                    <input
                      type="search"
                      name="LastName"
                      id="LastName"
                      placeholder="Enter Your Last Name"
                      value={ProfileData.LastName}
                      onChange={(e) => HandleInputChange(e)}
                    />
                  </div>
                </div>
                <div className="input-box-one">
                  <div className="input-box">
                    <label htmlFor="email">Email</label>
                    <input
                      type="search"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email !"
                      value={ProfileData.email}
                      onChange={(e) => HandleInputChange(e)}
                    />
                  </div>
                </div>
                <div className="input-box-one">
                  <div className="input-box">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      name="bio"
                      id="bio"
                      placeholder="Make your profile Awesome with your bio 😮 !"
                      value={ProfileData.bio}
                      maxLength="120"
                      onChange={(e) => HandleInputChange(e)}
                    />
                  </div>
                </div>
                {/**************************** Split ********************************/}
                <div className="split">
                  <p>Links data</p>
                </div>

                {/**************************** Split ********************************/}
                <div className="user-links">
                  <Links
                    Links={ProfileData.Links}
                    HandleSelect={HandleSelect}
                    SetNewLink={SetNewLink}
                    NewLink={NewLink}
                    HandleAddLink={HandleAddLink}
                    HandleDelteLink={HandleDelteLink}
                  />
                </div>

                {/**************************** Split ********************************/}
                <div className="split">
                  <p>Password</p>
                </div>
                <div className="input-box-one">
                  <div className="input-box">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Your Password !"
                      value={NewPassword.password}
                      onChange={(e) => HandleChangePasswordInput(e)}
                    />
                  </div>
                </div>
                <div className="input-box-one">
                  <div className="input-box">
                    <label htmlFor="NewPassword">New Passwrod</label>
                    <input
                      type="password"
                      name="NewPassword"
                      id="NewPassword"
                      placeholder="Enter Your New Password !"
                      value={NewPassword.NewPassword}
                      onChange={(e) => HandleChangePasswordInput(e)}
                    />
                  </div>
                </div>
                <div className="input-box-one">
                  <div className="input-box">
                    <label htmlFor="ReNewPassword">Re-password</label>
                    <input
                      type="password"
                      name="ReNewPassword"
                      id="ReNewPassword"
                      placeholder="Enter Your New Password Again !"
                      value={NewPassword.ReNewPassword}
                      onChange={(e) => HandleChangePasswordInput(e)}
                    />
                  </div>
                </div>
                {/**************************** Split ********************************/}
                <div className="input-box-two">
                  <div className="input-box">
                    <button>Save Changes</button>
                  </div>
                  <div className="input-box">
                    <button onClick={() => HandleChangePassword()}>
                      Updata Password
                    </button>
                  </div>
                </div>
              </div>
              {/**************************** End ********************************/}
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}
export default Setting;
