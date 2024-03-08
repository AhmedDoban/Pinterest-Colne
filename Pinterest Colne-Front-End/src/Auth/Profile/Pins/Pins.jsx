import React, { useState, useEffect } from "react";
import "./Pins.css";
import { useParams } from "react-router-dom";
import Card from "../../../Assets/Components/Card/Card";
import Toast_Handelar from "../../../Assets/Utils/Toast_Handelar";
import axios from "axios";
import CardLoader from "../../../Assets/Components/Card Loader/CardLoader";
import { Player } from "@lottiefiles/react-lottie-player";

function Pins(props) {
  const Param = useParams();
  const [Pins, SetPins] = useState([]);
  const [Loading, SetLoadin] = useState(true);
  const [More, SetMore] = useState(8);
  const { Token, _id } = JSON.parse(localStorage.getItem("Pinterest-Login"));
  const TOKEN = JSON.parse(localStorage.getItem("Pinterest-Login"));

  // Get user Pins from backend
  useEffect(() => {
    const GetData = async () => {
      try {
        SetLoadin(true);
        await axios
          .post(
            `${process.env.REACT_APP_API}/Images/Pins`,
            { _id: _id, Token: TOKEN },
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
              SetPins(Res.data.Data);
              SetLoadin(false);
            }
          });
      } catch (err) {
        Toast_Handelar("error", "Something happens wrong");
      }
    };
    GetData();
  }, [Param.User_id, Token, props.ReloadPage]);

  return (
    <React.Fragment>
      <div className="Pins">
        {Pins.length > 0 ? (
          <React.Fragment>
            <div className="container">
              {Pins.slice(0, More).map((Img) => (
                <Card
                  Img={Img}
                  ShowUSer="true"
                  ShowElemnt={false}
                  SetReloadPage={props.SetReloadPage}
                  ReloadPage={props.ReloadPage}
                  HandleSearchBtn={props.HandleSearchBtn}
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
              src={require("./../../../Assets/Images/ImagePin.json")}
              style={{ height: "300px", width: "300px" }}
            />
            <p>You haven't pinned any images yet. 📌</p>
          </div>
        )}

        {Pins.length > More && (
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
export default Pins;
