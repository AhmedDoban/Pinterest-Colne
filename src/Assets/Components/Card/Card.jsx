import React, { useState, useEffect } from "react";
import "./Card.css";
import axios from "axios";

function Card(props) {
  const [User, SetUser] = useState({});
  console.log(User);
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
      <div className="card" key={props.Img._id}>
        <div className="img">
          <img
            src={`${process.env.REACT_APP_API_UPLOADS}/${props.Img.url}`}
            alt={props.Img.name}
          />
        </div>
        <div className="info">
          <h3>{props.Img.name}</h3>
          <p>
            <i className="fa-solid fa-thumbtack" />
            <span>{props.Img.Pined}</span>
          </p>
        </div>
        <div className="user">
          <img
            src={`${process.env.REACT_APP_API_UPLOADS}/${User.Avatar}`}
            alt={User.FirstName}
          />
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
    </React.Fragment>
  );
}
export default Card;
