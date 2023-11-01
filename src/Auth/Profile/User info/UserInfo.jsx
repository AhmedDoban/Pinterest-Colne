import React from "react";
import "./UserInfo.css";
import { Link, useParams } from "react-router-dom";

function UserInfo(props) {
  const param = useParams();
  const { _id } = JSON.parse(localStorage.getItem("Pinterest-Login"));

  return (
    <React.Fragment>
      <div className="UserInfo">
        <div className="left">
          <img
            src={`${process.env.REACT_APP_API_UPLOADS}/${props.ProfileData.Avatar}`}
            alt={`${props.ProfileData.FirstName} ${props.ProfileData.LastName}`}
          />
          <div className="data">
            <h3>
              {props.ProfileData.FirstName} {props.ProfileData.LastName}
            </h3>
            <p>{props.ProfileData.bio}</p>
            <div className="social">
              {props.ProfileData.Links
                ? props.ProfileData?.Links.map((Link) => (
                    <a href={Link.Link}>
                      <i class={Link.Icon} />
                      <span>{Link.Name}</span>
                    </a>
                  ))
                : null}
            </div>
            {_id === param.User_id ? null : (
              <div className="follow-action">
                <button>Follow</button>
              </div>
            )}
          </div>
        </div>
        <div className="right">
          <Link to={`/User/${param.User_id}/Setting`}>
            <i className="fa-solid fa-gears"></i>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserInfo;
