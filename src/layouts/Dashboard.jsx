import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

const Dashboard = () => {
  return (
    <>
      <Header />
      <SideMenu />

      <div class="text-center">
        <div class="row">
          <div class="col-md-16">
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
