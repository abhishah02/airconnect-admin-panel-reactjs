import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";

const Dashboard = () => {
  return (
    <>
      <Header />
      <SideMenu />

      <div className="text-center">
        <div className="row">
          <div className="col-md-16">
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
