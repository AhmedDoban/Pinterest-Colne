import React, { useState } from "react";
import "./CardLoader.css";

function CardLoader() {
  const [Loadin, SetLoadin] = useState(new Array(10).fill(" "));
  return (
    <React.Fragment>
      {Loadin.map((card) => (
        <div className="CardLoader">
          <div className="img"></div>
          <div className="info">
            <h3></h3>
            <p>
              <i className="fa-solid fa-thumbtack" />
              <span></span>
            </p>
          </div>
          <div className="user">
            <div className="img"></div>
            <div className="data">
              <h4></h4>
              <div className="tags">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}
export default CardLoader;
