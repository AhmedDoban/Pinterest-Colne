import React, { useState } from "react";
import "./Card.css";
import CardPreview from "./Card Preview/CardPreview";
import { Link } from "react-router-dom";
import Handle_Secret from "../../Utils/Handle_Secrets";

function Card(props) {
  const [Preview, SetPreview] = useState(false);
  const [More_actions, SetMore_actions] = useState(false);

  const Condetion =
    props.Img.User_id ===
    JSON.parse(localStorage.getItem("Pinterest-Login"))._id;

  return (
    <React.Fragment>
      <div className="Maincard" key={props.Img._id} data-aos="zoom-in-up">
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
            <p>
              <i className="fa-regular fa-heart" />
              <span>{props.Img.Loves}</span>
            </p>
            <div className="more-action-menu">
              <p onClick={() => SetMore_actions(!More_actions)}>
                <i className="fa-solid fa-ellipsis" />
              </p>
              <div
                className={
                  More_actions ? "menu-container active" : "menu-container"
                }
              >
                <p>
                  <i className="fa-solid fa-thumbtack" />
                  <span>{props.Img.Pined}</span>
                </p>

                {Condetion ? (
                  <p
                    onClick={() =>
                      Handle_Secret(
                        props.Img.User_id,
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
                  </p>
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
                props.Img?.Tags.map((tag) => <span>{tag}</span>)
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
        />
      ) : null}
    </React.Fragment>
  );
}
export default Card;
