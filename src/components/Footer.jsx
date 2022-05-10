/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Footer = () => {
  return (
    <div className="main-footer text-center">
      <div className="">
        <div className="row">
          <div className="col-md-12">
            <span>
              Copyright © 2022{" "}
              <a href="/dashboard" className="text-primary">
                Dashlead
              </a>
              . Designed with <span className="fa fa-heart text-danger"></span>{" "}
              by{" "}
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
