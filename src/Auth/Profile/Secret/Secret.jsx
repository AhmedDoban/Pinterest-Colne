import React, { useState, useEffect } from "react";
import "./Secret.css";
import { useParams } from "react-router-dom";
import Card from "../../../Assets/Components/Card/Card";
import Toast_Handelar from "../../../Assets/Utils/Toast_Handelar";
import axios from "axios";
import CardLoader from "../../../Assets/Components/Card Loader/CardLoader";
import { Player } from "@lottiefiles/react-lottie-player";

function Secret(props) {
  const Param = useParams();
  const [Secret, SetSecret] = useState([]);
  const [Loading, SetLoadin] = useState(true);
  const [More, SetMore] = useState(8);
  const { Token } = JSON.parse(localStorage.getItem("Pinterest-Login"));
  const USerToken = JSON.parse(localStorage.getItem("Pinterest-Login"));

  // Get user Secret from backend
  useEffect(() => {
    const GetData = async () => {
      try {
        SetLoadin(true);
        await axios
          .post(
            `${process.env.REACT_APP_API}/Users/Secret`,
            { _id: Param.User_id, Token: USerToken },
            {
              headers: {
                Authorization: Token,
              },
            }
          )
          .then((Res) => {
            if (Res.data.Status === "Faild") {
              Toast_Handelar("error", Res.data.message);
              SetLoadin(false);
            } else {
              SetSecret(Res.data.Data);
              SetLoadin(false);
            }
          });
      } catch (err) {
        Toast_Handelar("error", "Something happens wrong");
      }
    };
    GetData();
  }, [Param.User_id, props.ReloadPage]);

  return (
    <React.Fragment>
      <div className="Secret">
        {Secret.length > 0 ? (
          <React.Fragment>
            <div className="container">
              {Secret.slice(0, More).map((Img) => (
                <Card
                  Img={Img}
                  ShowElemnt={true}
                  ShowUSer={false}
                  SetReloadPage={props.SetReloadPage}
                  ReloadPage={props.ReloadPage}
                />
              ))}
              {Loading && <CardLoader />}
            </div>
          </React.Fragment>
        ) : (
          <div className="no_data">
            <Player
              autoplay
              loop
              src={require("./../../../Assets/Images/Image.json")}
              style={{ height: "300px", width: "300px" }}
            />
            <p>There is no secrets 😊</p>
          </div>
        )}
        {Secret.length > More && (
          <button
            onClick={() => SetMore((prev) => prev + 10)}
            className="Seemore"
          >
            See more
          </button>
        )}
      </div>
    </React.Fragment>
  );
}
export default Secret;
