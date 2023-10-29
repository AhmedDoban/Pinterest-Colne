import React from "react";
import "./CardPreview.css";
import { saveAs } from "file-saver";

function CardPreview(props) {
  const CardData = `${process.env.REACT_APP_API_UPLOADS}/${props.Img.url}`;
  const downloadImage = () => {
    saveAs(CardData, "image.jpg");
  };
  return (
    <React.Fragment>
      <div className="CardPreview">
        <div className="container" data-aos="zoom-in">
          <div className="actions">
            <i
              className="fa-solid fa-down-long"
              onClick={() => downloadImage()}
            />
            <i
              className="fa-solid fa-xmark"
              onClick={() => props.SetPreview(false)}
            />
          </div>
          <div className="img-container">
            <img src={CardData} alt={props.Img.name} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default CardPreview;
