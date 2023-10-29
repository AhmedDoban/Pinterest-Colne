import React, { useState, useEffect } from "react";
import "./Card.css";
import axios from "axios";
import CardPreview from "./Card Preview/CardPreview";
import { Link } from "react-router-dom";

function Card(props) {
  const [User, SetUser] = useState({});
  const [Preview, SetPreview] = useState(false);

  useEffect(() => {
    const Get_User = async () => {
      try {
        const { Token } = JSON.parse(localStorage.getItem("Pinterest-Login"));
        await axios
          .post(
            `${process.env.REACT_APP_API}/Users/${props.Img.User_id}`,
            {},
            {
              headers: {
                Authorization: Token,
              },
            }
          )
          .then((Res) => {
            if (Res.data.Status === "Faild") {
              SetUser("Faild", Res.data.message);
            } else {
              SetUser(Res.data.Data[0]);
            }
          });
      } catch (err) {
        console.log(err);
      }
    };
    Get_User();
  }, [props.Img.User_id]);

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
          <Link to={`User/${User._id}`}>
            <img
              src={`${process.env.REACT_APP_API_UPLOADS}/${User.Avatar}`}
              alt={User.FirstName}
            />
          </Link>

          <div className="data">
            <h4>
              {User.FirstName} {User.LastName}
            </h4>
            <div className="tags">
              {props.Img?.Tags.map((tag) => (
                <span>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {Preview ? (
        <CardPreview Img={props.Img} SetPreview={SetPreview} User={User} />
      ) : null}
    </React.Fragment>
  );
}
export default Card;
