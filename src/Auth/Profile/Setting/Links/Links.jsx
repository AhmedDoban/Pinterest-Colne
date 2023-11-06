import React from "react";
import "./Links.css";
import Select from "react-dropdown-select";

function Links(props) {
  const Social = [
    {
      value: "Facebook",
      label: (
        <div className="drop-data">
          <i className="fa-brands fa-facebook-f" />
          <p>Facebook</p>
        </div>
      ),
      Icon: "fa-brands fa-facebook-f",
    },
    {
      value: "Instagram",
      label: (
        <div className="drop-data">
          <i className="fa-brands fa-instagram" />
          <p>Instagram</p>
        </div>
      ),
      Icon: "fa-brands fa-instagram",
    },
    {
      value: "Twitter",
      label: (
        <div className="drop-data">
          <i className="fa-brands fa-twitter" />
          <p>Twitter</p>
        </div>
      ),
      Icon: "fa-brands fa-twitter",
    },
    {
      value: "Github",
      label: (
        <div className="drop-data">
          <i className="fa-brands fa-github" />
          <p>Github</p>
        </div>
      ),
      Icon: "fa-brands fa-github",
    },
    {
      value: "Linkedin",
      label: (
        <div className="drop-data">
          <i className="fa-brands fa-linkedin" />
          <p>Linkedin</p>
        </div>
      ),
      Icon: "fa-brands fa-linkedin",
    },
    {
      value: "Resume",
      label: (
        <div className="drop-data">
          <i className="fa-solid fa-link" />
          <p>Resume</p>
        </div>
      ),
      Icon: "fa-solid fa-link",
    },
  ];

  const HandleSelectedValue = () => {};
  return (
    <React.Fragment>
      <div className="links-container">
        <Select
          options={Social}
          searchBy="value"
          onChange={(e) => props.HandleSelect(e)}
          className="Select"
          dropdownPosition="auto"
          placeholder="Select a link !"
        />
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter an link here !"
            value={props.NewLink.Link}
            onChange={(e) =>
              props.SetNewLink({ ...props.NewLink, Link: e.target.value })
            }
          />
          <i
            className="fa-solid fa-plus"
            onClick={() => props.HandleAddLink()}
          />
        </div>
      </div>
      {props.Links &&
        props.Links.map((Link, index) => (
          <div className="links-container" key={index}>
            <div className="Select-data">
              <i className={Link.Icon} />
              {Link.Name}
            </div>
            <div className="input-box">
              <input
                type="text"
                name={Link.Name}
                value={Link.Link}
                placeholder="Enter an link here !"
              />
              <i
                className="fa-solid fa-trash"
                onClick={() => props.HandleDelteLink(index)}
              />
            </div>
          </div>
        ))}
    </React.Fragment>
  );
}
export default Links;
