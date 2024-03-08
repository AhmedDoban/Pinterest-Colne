import React from "react";
import "./UserNavlink.css";
import { NavLink, useParams } from "react-router-dom";

function UserNavlink(props) {
  const param = useParams();
  const { _id } = JSON.parse(localStorage.getItem("Pinterest-Login"));

  return (
    <React.Fragment>
      <ul className="UserNavlink">
        <li>
          <NavLink to={`/User/${param.User_id}`} className="action" end>
            <p>{props.ProfileData.Posts}</p>
            <span>Posts</span>
          </NavLink>
        </li>

        {_id === param.User_id ? (
          <React.Fragment>
            <li>
              <NavLink to={`/User/${param.User_id}/Secret`} className="action">
                <p>{props.ProfileData.Secret}</p>
                <span>Secret</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/User/${param.User_id}/Pins`} className="action">
                <p>{props.ProfileData.Pins}</p>
                <span>Pins</span>
              </NavLink>
            </li>
          </React.Fragment>
        ) : null}

        <li>
          <NavLink to={`/User/${param.User_id}/Followers`} className="action">
            <p>{props.ProfileData.Followers}</p>
            <span>Followers</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/User/${param.User_id}/Following`} className="action">
            <p>{props.ProfileData.Following}</p>
            <span>Following</span>
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
}
export default UserNavlink;
