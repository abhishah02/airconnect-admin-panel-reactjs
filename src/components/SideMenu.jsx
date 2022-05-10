/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <>
      <div class="main-sidebar main-sidemenu main-sidebar-sticky side-menu">
        <div class="sidemenu-logo">
          <a class="main-logo">
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <img
                src="img/brand/logo.png"
                class="header-brand-img desktop-logo"
                alt="logo"
              />
            </Link>
            <img
              src="img/brand/icon.png"
              class="header-brand-img icon-logo"
              alt="logo"
            />
            <img
              src="img/brand/logo-light.png"
              class="header-brand-img desktop-logo theme-logo"
              alt="logo"
            />
            <img
              src="img/brand/icon-light.png"
              class="header-brand-img icon-logo theme-logo"
              alt="logo"
            />
          </a>
        </div>
        <div class="main-sidebar-body">
          <div class="slide-left disabled" id="slide-left">
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
          <ul class="nav  hor-menu">
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <li class="nav-label">Dashboard</li>
            </Link>
            <li class="nav-item">
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <a class="nav-link">
                  <i class="fe fe-airplay"></i>
                  <span class="sidemenu-label">Dashboard</span>
                </a>
              </Link>
            </li>
          </ul>
          <div class="slide-right" id="slide-right">
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
