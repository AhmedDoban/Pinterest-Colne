import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FollowCard.css";

function FollowCard(props) {
  const [FollowAction, SetFollowAction] = useState(props.Follow.If_User_Follow);
  const { _id } = JSON.parse(localStorage.getItem("Pinterest-Login"));

  return (
    <React.Fragment>
      <div className="FollowCard">
        <Link className="head_image" to={``}>
          <img
            src={`${process.env.REACT_APP_API_UPLOADS}/${props.Follow.User.Avatar}`}
            alt={props.Follow.User.FirstName}
          />
        </Link>
        <div className="Card_Data">
          <div className="info">
            <Link to={``} className="UserName">
              {props.Follow.User.FirstName} {props.Follow.User.LastName}
            </Link>
            <p>{props.Follow.User.bio}</p>
            {props._id == _id ? null : (
              <div className="action">
                <button>
                  <i className="fa-solid fa-user-plus"></i>{" "}
                  {FollowAction ? "UnFollow" : "Follow"}
                </button>
              </div>
            )}

            <div className="links">
              {props.Follow.User?.Links.map((Link) => (
                <a href={Link.Link}>
                  <i className={Link.Icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default FollowCard;
