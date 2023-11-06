import React, { useState } from "react";
import "./AddNewImage.css";
import BlurCircle from "./../../Assets/Components/Blur Circle/BlurCircle";
import Toast_Handelar from "../../Assets/Utils/Toast_Handelar";
import axios from "axios";
function AddNewImage(props) {
  // local state storage for some handelar
  const [AddCard, SetAddCard] = useState(false);
  const [NewImageUrl, SetNewImageUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [NewImage, SetNewImage] = useState({
    name: "",
    TagInput: "",
    Url: "",
    Tags: [],
  });
  // handel change file input
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setProgress(0);
    if (file.type.split("/")[0] === "image") {
      const NewImageClone = { ...NewImage, Url: file };
      if ((file.size / 1000).toFixed(0) >= 1028) {
        Toast_Handelar("error", "File size cannot exceed more than 1MB");
      } else {
        SetNewImage(NewImageClone);
        SetNewImageUrl(URL.createObjectURL(file));
      }
    } else {
      Toast_Handelar("error", "File Must be an image !");
    }
  };
  // handel change inputs for name and tag input
  const HabdleInputChange = (e) => {
    SetNewImage({ ...NewImage, [e.name]: e.value });
    setProgress(0);
  };
  // handel tags arry basic function
  const HandleTagsFunction = () => {
    const NewImageClone = { ...NewImage };
    setProgress(0);
    if (NewImage.TagInput !== "") {
      if (NewImage.TagInput.startsWith("#")) {
        NewImageClone.Tags.push(NewImage.TagInput);
        const EditData = { ...NewImageClone, TagInput: "" };
        SetNewImage(EditData);
      } else {
        NewImageClone.Tags.push(`#${NewImage.TagInput}`);
        const EditData = { ...NewImageClone, TagInput: "" };
        SetNewImage(EditData);
      }
    }
  };
  // handel add to tags arry with basic function with enter key
  const HadleTagsEnterkey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      HandleTagsFunction();
    }
  };
  // handel delete from tags arry
  const HadleDeletTags = (index) => {
    const NewImageClone = { ...NewImage };
    setProgress(0);
    NewImage.Tags.splice(index, 1);
    SetNewImage(NewImageClone);
  };
  // handel delete image file
  const HandelDelteImage = () => {
    SetNewImageUrl("");
    const NewImageClone = { ...NewImage, Url: "" };
    SetNewImage(NewImageClone);
    setProgress(0);
  };
  // call the api if the all data are right
  const HandleUPloadNewImage = async () => {
    const { _id, Token } = JSON.parse(localStorage.getItem("Pinterest-Login"));

    if (NewImage.name !== "" && NewImageUrl !== "") {
      await axios
        .post(
          `${process.env.REACT_APP_API}/Images/Upload_IMG`,
          {
            name: NewImage.name,
            url: NewImage.Url,
            User_id: _id,
            Tags: NewImage.Tags,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: Token,
            },
            onUploadProgress: (e) => {
              const progress = (e.loaded / e.total) * 100;
              setProgress(progress);
            },
          }
        )
        .then((res) => {
          if (res.data.Status === "Faild") {
            Toast_Handelar("error", res.data.message);
          } else {
            SetNewImage({
              name: "",
              TagInput: "",
              Url: "",
              Tags: [],
            });
            window.location.reload();
            SetNewImageUrl("");
            Toast_Handelar("success", res.data.message);
          }
        });
    } else {
      Toast_Handelar("error", "Some data are missing !");
    }
  };

  return (
    <React.Fragment>
      <div className="AddNewImage">
        <i
          className="fa-solid fa-plus"
          onClick={() => {
            SetAddCard(true);
          }}
        />
        {AddCard && (
          <div className="container">
            <div
              className={AddCard ? "addCard active" : "addCard"}
              data-aos="zoom-in"
            >
              <BlurCircle />
              <i
                className="fa-solid fa-xmark"
                onClick={() => {
                  SetAddCard(false);
                }}
              />
              <div className="left">
                <div className="img-container">
                  <img
                    src={
                      NewImageUrl
                        ? NewImageUrl
                        : require("../../Assets/Images/CLoudObject.png")
                    }
                    alt="CLoudObject"
                  />
                  {NewImageUrl ? (
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => HandelDelteImage()}
                    />
                  ) : (
                    <React.Fragment>
                      <input
                        type="file"
                        id="File"
                        name="Url"
                        onChange={(e) => handleFileInput(e)}
                      />
                      <label htmlFor="File"></label>
                    </React.Fragment>
                  )}
                </div>
                <div className="progress-bar">
                  <span style={{ width: `${progress}%` }}></span>
                </div>
              </div>
              <div className="right">
                <div className="input-box">
                  <input
                    type="search"
                    name="name"
                    placeholder="Enter name of image"
                    value={NewImage.name}
                    onChange={(e) => HabdleInputChange(e.target)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="search"
                    name="TagInput"
                    placeholder="ex: #nature"
                    value={NewImage.TagInput}
                    onChange={(e) => HabdleInputChange(e.target)}
                    onKeyPress={(e) => HadleTagsEnterkey(e)}
                  />
                </div>
                <div className="add-box">
                  <button onClick={() => HandleTagsFunction()}>Add Tag</button>
                </div>
                <div className="Upload-box">
                  <button onClick={() => HandleUPloadNewImage()}>
                    <i className="fa-solid fa-cloud-arrow-up" />
                    Upload
                  </button>
                </div>
                <div className="Tags-box">
                  {NewImage.Tags.map((Tag, index) => (
                    <span key={index} onClick={() => HadleDeletTags(index)}>
                      {Tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default AddNewImage;
