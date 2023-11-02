import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../Assets/Components/Card/Card";
import Toast_Handelar from "../../Assets/Utils/Toast_Handelar";
import "./Home.css";
import CardLoader from "./../../Assets/Components/Card Loader/CardLoader";
import AddNewImage from "../Add New Image/AddNewImage";

function Home(props) {
  const [DataImg, SetDataImg] = useState([]);
  const [Page, SetPage] = useState(1);
  const [Loading, SetLoadin] = useState(true);
  const [EndData, SetEndData] = useState(false);

  // add new images with changes in page
  useEffect(() => {
    if (EndData) {
      return;
    }
    const GetData = async () => {
      try {
        SetLoadin(true);
        await axios
          .get(`${process.env.REACT_APP_API}/Images?Page=${Page}&Limit=10`)
          .then((Res) => {
            if (Res.data.Status === "Faild") {
              Toast_Handelar("error", Res.data.message);
              SetLoadin(false);
            } else {
              SetDataImg((prev) => [...prev, ...Res.data.Data]);
              SetLoadin(false);
              if (Res.data.Data.length === 0) {
                SetEndData(true);
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
  }, [Page]);

  // when scroll change the page with page+=1
  const HandleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      SetLoadin(true);
      SetPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", HandleScroll);
    return () => window.removeEventListener("scroll", HandleScroll);
  }, []);

  return (
    <React.Fragment>
      <div className="Home">
        <div className="container">
          {DataImg.map((Img) => (
            <Card
              Img={Img}
              ShowUSer="true"
              ShowElemnt={false}
              SetReloadPage={props.SetReloadPage}
              ReloadPage={props.ReloadPage}
            />
          ))}
          {Loading && !EndData ? <CardLoader /> : null}
          <AddNewImage />
        </div>
      </div>
    </React.Fragment>
  );
}
export default Home;
