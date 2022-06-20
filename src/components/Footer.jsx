/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="main-footer text-center">
      <div className="">
        <div className="row">
          <div className="col-md-12">
            <span>
              Copyright © 2022{" "}
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <a className="text-primary">Dashlead</a>.
              </Link>
              Designed with <span className="fa fa-heart text-danger"></span> by{" "}
              <a href="https://www.spruko.com/" className="text-primary">
                Spruko
              </a>
              All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
