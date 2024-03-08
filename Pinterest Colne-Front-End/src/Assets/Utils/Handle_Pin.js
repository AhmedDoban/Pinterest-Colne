import axios from "axios";
import Toast_Handelar from "./Toast_Handelar";

const Handle_Pin = async (Image_id, SetLike, Like, SetLoves) => {
  const { Token, _id } = JSON.parse(localStorage.getItem("Pinterest-Login"));
  const TOKEN = JSON.parse(localStorage.getItem("Pinterest-Login"));
  await axios
    .post(
      `${process.env.REACT_APP_API}/Images/Create_Pins`,
      {
        User_id: _id,
        Token: TOKEN,
        Image_id: Image_id,
      },
      {
        headers: {
          Authorization: Token,
        },
      }
    )
    .then((Res) => {
      if (Res.data.Status === "Faild") {
        Toast_Handelar("faild", Res.data.message);
      } else {
        SetLike(!Like);
        if (Like) {
          SetLoves((prev) => prev - 1);
        } else {
          SetLoves((prev) => prev + 1);
        }
      }
    });
};
export default Handle_Pin;
