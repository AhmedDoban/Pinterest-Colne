import React from "react";
import { Link } from "react-router-dom";
import "./FollowCard.css";
import Handle_Follow from "../../Utils/Handle_Follow";

function FollowCard(props) {
  const { _id } = JSON.parse(localStorage.getItem("Pinterest-Login"));

  return (
    <React.Fragment>
      <div className="FollowCard">
        <Link className="head_image" to={`/User/${props._id}`}>
          <img
            src={`${process.env.REACT_APP_API_UPLOADS}/${props.Follow.User.Avatar}`}
            alt={props.Follow.User.FirstName}
          />
        </Link>
        <div className="Card_Data">
          <div className="info">
            <Link to={`/User/${props._id}`} className="UserName">
              {props.Follow.User.FirstName} {props.Follow.User.LastName}
            </Link>
            <p>{props.Follow.User.bio}</p>
            <div className="follow-number">
              <p>
                {props.Follow.User.Followers}
                <span>Followers</span>
              </p>
              <p>
                {props.Follow.User.Following}
                <span>Following</span>
              </p>
            </div>
            {props._id == _id ? null : (
              <div className="action">
                <button
                  onClick={() =>
                    Handle_Follow(
                      props._id,
                      props.SetReloadPage,
                      props.ReloadPage
                    )
                  }
                >
                  <i className="fa-solid fa-user-plus"></i>
                  {props.Follow.If_User_Follow ? "UnFollow" : "Follow"}
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
