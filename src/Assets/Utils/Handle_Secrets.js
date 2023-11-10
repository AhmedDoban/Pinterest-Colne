import axios from "axios";
import Toast_Handelar from "./Toast_Handelar";

const Handle_Secret = async (Image_id, SetReloadPage, ReloadPage) => {
  const TOKEN = JSON.parse(localStorage.getItem("Pinterest-Login"));
  const { Token, _id } = JSON.parse(localStorage.getItem("Pinterest-Login"));
  await axios
    .post(
      `${process.env.REACT_APP_API}/Images/Secret_Image`,
      {
        User_id: _id,
        Image_id: Image_id,
        Token: TOKEN,
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
        Toast_Handelar("success", Res.data.message);
        SetReloadPage(!ReloadPage);
      }
    });
};
export default Handle_Secret;
