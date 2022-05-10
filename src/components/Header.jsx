/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const logout = () => {
    localStorage.clear();
  };
  return (
    <>
      <div className="main-header side-header sticky">
        <div className="container-fluid main-container">
          <div className="main-header-left sidemenu">
            <a className="main-header-menu-icon" href="" id="mainSidebarToggle">
              <span></span>
            </a>
          </div>
          <a
            className="main-header-menu-icon  horizontal  d-lg-none"
            href=""
            id="mainNavShow"
          >
            <span></span>
          </a>
          <div className="main-header-left horizontal">
            <a className="main-logo" href="index.html">
              <img
                src="img/brand/logo.png"
                className="header-brand-img desktop-logo"
                alt="logo"
              />
              <img
                src="img/brand/logo-light.png"
                className="header-brand-img desktop-logo theme-logo"
                alt="logo"
              />
            </a>
          </div>
          <div className="main-header-right">
            <button
              className="navbar-toggler navresponsive-toggler d-lg-none ms-auto collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent-4"
              aria-controls="navbarSupportedContent-4"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              {" "}
              <span className="navbar-toggler-icon fe fe-more-vertical "></span>
            </button>
            <div className="navbar navbar-expand-lg navbar-collapse responsive-navbar p-0">
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent-4"
              >
                <ul className="nav nav-item header-icons navbar-nav-right ms-auto">
                  {/* <!-- Theme-Layout --> */}
                  <li className="dropdown header">
                    <div className="main-form-search p-2">
                      <input
                        className="form-control"
                        placeholder="Search"
                        type="search"
                      />
                      <button className="btn">
                        <i className="fe fe-search"></i>
                      </button>
                    </div>
                  </li>

                  {/* href="profile.html" */}
                  <li className="dropdown header">
                    <a className="dropdown-item text-wrap">
                      <i className="fe fe-edit"></i> Profile
                    </a>
                  </li>

                  {/* href="settings.html" */}
                  <li className="dropdown header">
                    <a className="dropdown-item text-wrap">
                      <i className="fe fe-settings"></i> Settings
                    </a>
                  </li>

                  {/* href="signin.html" */}
                  <li className="dropdown header">
                    <a className="dropdown-item text-wrap" onClick={logout}>
                      <Link to="/" style={{ textDecoration: "none" }}>
                        <i className="fe fe-power"></i> Sign Out
                      </Link>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
