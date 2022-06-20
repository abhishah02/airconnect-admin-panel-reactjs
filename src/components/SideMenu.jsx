/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
  const authAdmin = JSON.parse(localStorage.getItem("Info"));
  return (
    <>
      <div className="main-sidebar main-sidemenu main-sidebar-sticky side-menu">
        <div className="sidemenu-logo">
          <a className="main-logo">
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <img
                src="/img/brand/logo.png"
                className="header-brand-img desktop-logo"
                alt="logo"
              />
            </Link>
            <img
              src="/img/brand/icon.png"
              className="header-brand-img icon-logo"
              alt="logo"
            />
            <img
              src="/img/brand/logo-light.png"
              className="header-brand-img desktop-logo theme-logo"
              alt="logo"
            />
            <img
              src="/img/brand/icon-light.png"
              className="header-brand-img icon-logo theme-logo"
              alt="logo"
            />
          </a>
        </div>
        <div className="main-sidebar-body">
          <div className="slide-left disabled" id="slide-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#7b8191"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
            </svg>
          </div>

          <ul className="nav  hor-menu">
            <li className="nav-label">Dashboard</li>

            <li className="nav-item">
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <a className="nav-link">
                  <i className="fe fe-airplay"></i>
                  <span className="sidemenu-label">Dashboard</span>
                </a>
              </Link>
            </li>
          </ul>

          <ul className="nav  hor-menu">
            <li className="nav-label">Category</li>

            <li className="nav-item">
              <Link to="/category" style={{ textDecoration: "none" }}>
                <a className="nav-link">
                  <i className="fe fe-airplay"></i>
                  <span className="sidemenu-label">Category</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/product" style={{ textDecoration: "none" }}>
                <a className="nav-link">
                  <i className="fe fe-airplay"></i>
                  <span className="sidemenu-label">Product</span>
                </a>
              </Link>
            </li>
          </ul>

          <ul className="nav  hor-menu">
            <li className="nav-label">Customer</li>

            <li className="nav-item">
              <Link to="/customer" style={{ textDecoration: "none" }}>
                <a className="nav-link">
                  <i className="fe fe-airplay"></i>
                  <span className="sidemenu-label">Customer</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/hsn" style={{ textDecoration: "none" }}>
                <a className="nav-link">
                  <i className="fe fe-airplay"></i>
                  <span className="sidemenu-label">HSN Master</span>
                </a>
              </Link>
            </li>
          </ul>

          <ul className="nav  hor-menu">
            <li className="nav-label">Sales</li>

            <li className="nav-item">
              <Link to="/sales" style={{ textDecoration: "none" }}>
                <a className="nav-link">
                  <i className="fe fe-airplay"></i>
                  <span className="sidemenu-label">Sales</span>
                </a>
              </Link>
            </li>
          </ul>
          {authAdmin?.user?.role === 1 ? (
            <ul className="nav  hor-menu">
              <li className="nav-label">Sub Admin</li>

              <li className="nav-item">
                <Link to="/sub-admin" style={{ textDecoration: "none" }}>
                  <a className="nav-link">
                    <i className="fe fe-airplay"></i>
                    <span className="sidemenu-label">Sub-Admin</span>
                  </a>
                </Link>
              </li>
            </ul>
          ) : (
            ""
          )}

          <div className="slide-right" id="slide-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#7b8191"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
