import axios from "axios";
import Toast_Handelar from "./Toast_Handelar";

const Handle_Delete = async (
  User_id,
  Image_id,
  SetReloadPage,
  ReloadPage,
  Delete
) => {
  const TOKEN = JSON.parse(localStorage.getItem("Pinterest-Login"));
  const { Token } = JSON.parse(localStorage.getItem("Pinterest-Login"));
  await axios
    .post(
      `${process.env.REACT_APP_API}/Images/Delete_Image`,
      {
        User_id: User_id,
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
        Delete(true);
      }
    });
};
export default Handle_Delete;
