import React, { useEffect, useState } from "react";
import Toast_Handelar from "../../../Assets/Utils/Toast_Handelar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import CardLoader from "../../../Assets/Components/Card Loader/CardLoader";
import "./Following.css";
import FollowCard from "../../../Assets/Components/FollowCard/FollowCard";

function Following(props) {
  const Param = useParams();
  const [Followers_Data, SetFollowers_Data] = useState([]);
  const [Loading, SetLoadin] = useState(true);
  const [More, SetMore] = useState(8);
  const { Token, _id } = JSON.parse(localStorage.getItem("Pinterest-Login"));

  // Get user Followers from backend
  useEffect(() => {
    const GetData = async () => {
      try {
        SetLoadin(true);
        await axios
          .post(
            `${process.env.REACT_APP_API}/Users/Following`,
            {
              Follower_id: Param.User_id,
              User_ID: _id,
            },
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
              SetFollowers_Data(Res.data.Data);
              SetLoadin(false);
            }
          });
      } catch (err) {
        Toast_Handelar("error", "Something happens wrong");
      }
    };
    GetData();
  }, [Param.User_id, Token, props.ReloadPage, _id]);

  return (
    <React.Fragment>
      <div className="Following">
        {Followers_Data.length > 0 ? (
          <React.Fragment>
            <div className="container">
              {Followers_Data.slice(0, More).map((Follow) => (
                <FollowCard
                  Follow={Follow}
                  _id={Follow.Following_id}
                  key={Follow._id}
                  ReloadPage={props.ReloadPage}
                  SetReloadPage={props.SetReloadPage}
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
              src={require("./../../../Assets/Images/following.json")}
              style={{ height: "300px", width: "300px" }}
            />
            <p>There is no Following yet 😮</p>
          </div>
        )}

        {Followers_Data.length > More && (
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
export default Following;
