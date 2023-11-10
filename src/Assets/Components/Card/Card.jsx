import React, { useState } from "react";
import "./Card.css";
import CardPreview from "./Card Preview/CardPreview";
import { Link } from "react-router-dom";
import Handle_Secret from "../../Utils/Handle_Secrets";
import Handle_Delete from "../../Utils/Handle_Delete";
import Handle_Likes from "../../Utils/Handle_Likes";
import Handle_Pin from "../../Utils/Handle_Pin";

function Card(props) {
  const { _id } = JSON.parse(localStorage.getItem("Pinterest-Login"));
  const [Preview, SetPreview] = useState(false);
  const [Delete, SetDelete] = useState(false);
  const [Loves, SetLoves] = useState(props.Img.Loves);
  const [Like, SetLike] = useState(props.Img.If_User_Like || false);
  const [Pin, SetPin] = useState(props.Img.Pined);
  const [IFPin, SetIFPin] = useState(props.Img.UserPinned || false);
  const Condetion = props.Img.User_id === _id;

  return (
    <React.Fragment>
      <div
        className={Delete ? "Maincard delete" : "Maincard"}
        data-aos="zoom-in-up"
      >
        <div className="img">
          <img
            src={`${process.env.REACT_APP_API_UPLOADS}/${props.Img.url}`}
            alt={props.Img.name}
            onClick={() => SetPreview(true)}
          />
        </div>
        <div className="info">
          <h3>{props.Img.name}</h3>
          <div className="actions">
            <p
              onClick={() =>
                Handle_Likes(props.Img._id, SetLike, Like, SetLoves)
              }
            >
              <i
                className={
                  Like ? "fa-solid fa-heart like_active" : "fa-regular fa-heart"
                }
              />
              <span>{Loves}</span>
            </p>
            <div className="more-action-menu">
              <p>
                <i className="fa-solid fa-ellipsis" />
              </p>
              <div className="menu-container">
                <p
                  className={IFPin ? "active" : ""}
                  onClick={() =>
                    Handle_Pin(props.Img._id, SetIFPin, IFPin, SetPin)
                  }
                >
                  <i className="fa-solid fa-thumbtack" />
                  <span>{Pin}</span>
                </p>

                {Condetion ? (
                  <React.Fragment>
                    <p
                      onClick={() =>
                        Handle_Secret(
                          props.Img._id,
                          props.SetReloadPage,
                          props.ReloadPage
                        )
                      }
                    >
                      <i
                        className={
                          props.ShowElemnt === true
                            ? "fa-solid fa-eye"
                            : "fa-solid fa-eye-slash"
                        }
                      />
                      {props.ShowElemnt === true ? "Show" : "Hide"}
                    </p>
                    <p
                      onClick={() =>
                        Handle_Delete(
                          props.Img._id,
                          props.SetReloadPage,
                          props.ReloadPage,
                          SetDelete
                        )
                      }
                    >
                      <i className="fa-solid fa-trash" /> Delete
                    </p>
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="user">
          {props.ShowUSer === "true" ? (
            <Link to={`User/${props.Img.User_id}`}>
              <img
                src={`${process.env.REACT_APP_API_UPLOADS}/${props.Img.User.Avatar}`}
                alt={props.Img.User.FirstName}
              />
            </Link>
          ) : null}

          <div className="data">
            {props.ShowUSer === "true" ? (
              <h4>
                {props.Img.User.FirstName} {props.Img.User.LastName}
              </h4>
            ) : null}

            <div className="tags">
              {props.Img?.Tags.length > 0 ? (
                props.Img?.Tags.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))
              ) : (
                <span>there is no Tags</span>
              )}
            </div>
          </div>
        </div>
      </div>
      {Preview ? (
        <CardPreview
          Img={props.Img}
          SetPreview={SetPreview}
          User={props.Img.User}
          ShowElemnt={props.ShowElemnt}
          SetReloadPage={props.SetReloadPage}
          ReloadPage={props.ReloadPage}
          SetDelete={SetDelete}
          SetLike={SetLike}
          Like={Like}
          SetLoves={SetLoves}
          Loves={Loves}
          Pin={Pin}
          SetPin={SetPin}
          SetIFPin={SetIFPin}
          IFPin={IFPin}
        />
      ) : null}
    </React.Fragment>
  );
}
export default Card;
