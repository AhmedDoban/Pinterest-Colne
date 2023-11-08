import axios from "axios";
import Toast_Handelar from "./Toast_Handelar";

const Handle_Likes = async (User_id, Image_id, SetLike, Like, SetLoves) => {
  const { Token, _id } = JSON.parse(localStorage.getItem("Pinterest-Login"));
  await axios
    .post(
      `${process.env.REACT_APP_API}/Images/Like_Image`,
      {
        User_id: _id,
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
        console.log("Likes");
        SetLike(!Like);
        if (Like) {
          SetLoves((prev) => prev - 1);
        } else {
          SetLoves((prev) => prev + 1);
        }
      }
    });
};
export default Handle_Likes;
