import axios from "axios";
import Toast_Handelar from "./Toast_Handelar";

const Handle_Follow = async (Following_id, SetReloadPage, ReloadPage) => {
  const { Token, _id } = JSON.parse(localStorage.getItem("Pinterest-Login"));
  await axios
    .post(
      `${process.env.REACT_APP_API}/Users/Follow`,
      { Follower_id: _id, Following_id },
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
        SetReloadPage(!ReloadPage);
      }
    });
};
export default Handle_Follow;
