import React, { useState } from "react";
import "./Card.css";
import CardPreview from "./Card Preview/CardPreview";
import { Link } from "react-router-dom";

function Card(props) {
  const [Preview, SetPreview] = useState(false);

  return (
    <React.Fragment>
      <div className="Maincard" key={props.Img._id} data-aos="fade-up">
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
              <i className="fa-solid fa-thumbtack" />
              <span>{props.Img.Pined}</span>
            </p>
            <p>
              <i className="fa-regular fa-heart" />
              <span>{props.Img.Loves}</span>
            </p>
          </div>
        </div>
        <div className="user">
          <Link to={`User/${props.Img.User_id}`}>
            <img
              src={`${process.env.REACT_APP_API_UPLOADS}/${props.Img.User.Avatar}`}
              alt={props.Img.User.FirstName}
            />
          </Link>

          <div className="data">
            <h4>
              {props.Img.User.FirstName} {props.Img.User.LastName}
            </h4>
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
        />
      ) : null}
    </React.Fragment>
  );
}
export default Card;
