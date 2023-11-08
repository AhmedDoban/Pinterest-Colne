import React, { useState } from "react";
import "./CardPreview.css";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import Handle_Secret from "../../../Utils/Handle_Secrets";
import Handle_Delete from "../../../Utils/Handle_Delete";

function CardPreview(props) {
  const [Menu, SetMenu] = useState(false);
  const CardDataImg = `${process.env.REACT_APP_API_UPLOADS}`;
  const downloadImage = () => {
    saveAs(`${CardDataImg}/${props.Img.url}`, "image.jpg");
  };

  const Condetion =
    props.Img.User_id ===
    JSON.parse(localStorage.getItem("Pinterest-Login"))._id;

  return (
    <React.Fragment>
      <div className="CardPreview">
        <div className="container" data-aos="zoom-in">
          <div className="actions">
            <i
              className="fa-solid fa-xmark"
              onClick={() => props.SetPreview(false)}
            />
            <div className="other-action-menu">
              <i
                className={Menu ? "fa-solid fa-minus" : "fa-solid fa-bars"}
                onClick={() => SetMenu(!Menu)}
              />
              <div className={Menu ? "menu active" : "menu"}>
                <Link to={`User/${props.Img.User_id}`}>
                  <img
                    src={`${CardDataImg}/${props.User.Avatar}`}
                    alt={props.User.FirstName}
                  />
                </Link>
                <h1 className="USER_NAME">
                  {props.User.FirstName} {props.User.LastName}
                </h1>
                <p>
                  <i className="fa-solid fa-thumbtack" />
                  <span>{props.Img.Pined}</span>
                </p>
                <p>
                  <i className="fa-regular fa-heart" />
                  <span>{props.Img.Loves}</span>
                </p>
                {Condetion && (
                  <React.Fragment>
                    <i
                      className={
                        props.ShowElemnt === true
                          ? "fa-solid fa-eye"
                          : "fa-solid fa-eye-slash"
                      }
                      onClick={() =>
                        Handle_Secret(
                          props.Img.User_id,
                          props.Img._id,
                          props.SetReloadPage
                        )
                      }
                    />
                    <i
                      className="fa-solid fa-trash"
                      onClick={() =>
                        Handle_Delete(
                          props.Img.User_id,
                          props.Img._id,
                          props.SetReloadPage,
                          props.ReloadPage,
                          props.SetDelete
                        )
                      }
                    />
                  </React.Fragment>
                )}

                <i
                  className="fa-solid fa-cloud-arrow-down"
                  onClick={() => downloadImage()}
                />
              </div>
            </div>
          </div>
          <div className="img-container">
            <img src={`${CardDataImg}/${props.Img.url}`} alt={props.Img.name} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default CardPreview;
