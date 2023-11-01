import React, { useState, useEffect } from "react";
import "./Posts.css";
import { useParams } from "react-router-dom";
import Card from "../../../Assets/Components/Card/Card";
import Toast_Handelar from "../../../Assets/Utils/Toast_Handelar";
import axios from "axios";
import CardLoader from "../../../Assets/Components/Card Loader/CardLoader";

function Posts() {
  const Param = useParams();
  const [Posts, SetPosts] = useState([]);
  const [Loading, SetLoadin] = useState(true);
  const [More, SetMore] = useState(8);
  const { Token } = JSON.parse(localStorage.getItem("Pinterest-Login"));

  // Get user posts from backend
  useEffect(() => {
    const GetData = async () => {
      try {
        SetLoadin(true);
        await axios
          .post(
            `${process.env.REACT_APP_API}/Users/Posts`,
            { _id: Param.User_id },
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
              SetPosts(Res.data.Data);
              SetLoadin(false);
              if (Res.data.Data.length === 0) {
                Toast_Handelar(
                  "",
                  "Awesome, you reached all the data 😮",
                  "bottom-center"
                );
              }
            }
          });
      } catch (err) {
        Toast_Handelar("error", "Something happens wrong");
      }
    };
    GetData();
  }, [Param.User_id, Token]);

  return (
    <React.Fragment>
      <div className="Posts">
        <div className="container">
          {Posts.slice(0, More).map((Img) => (
            <Card Img={Img} />
          ))}
        </div>
        {Loading && <CardLoader />}

        {Posts.length > More && (
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
export default Posts;
