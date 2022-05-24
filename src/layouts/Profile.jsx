/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

const Profile = () => {
  // const [items, setItems] = useState([]);
  const [data, setData] = useState({
    admin_name: "",
    admin_number: "",
    admin_email: "",
  });

  const { id } = useParams();
  // console.warn(id);
  // console.warn(admin_id);
  useEffect(() => {
    // const items = JSON.parse(localStorage.getItem("Info"));
    profileLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const profileLoad = async () => {
    // console.warn(id);
    const items = JSON.parse(localStorage.getItem("Info"));
    // console.log(setItems);
    // console.log(items.token);
    let token = "bearer " + items.token;
    let result = await fetch(`http://localhost:5000/admin/profile/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    if (result) {
      let res = await result.json();
      setData(res.profile);
    } else {
      localStorage.removeItem("Info");
      window.location.reload();
    }

    // console.log(res.profile);

    // console.warn(setData);
  };
  return (
    <>
      <Header />
      <SideMenu />

      <br />
      <div className="main-content side-content pt-0">
        <div className="side-app">
          <div className="main-container container-fluid">
            {/* <!-- Page Header --> */}
            <div className="page-header">
              <h2 className="main-content-title tx-24 mg-b-5">Profile</h2>
            </div>
            {/* <!-- End Page Header --> */}

            {/* <!-- Row --> */}
            <div className="row">
              <div className="col-xl-4 col-md-12">
                <div className="card custom-card">
                  <div className="card-body text-center">
                    <div className="main-profile-overview widget-user-image text-center">
                      <div className="item-user pro-user">
                        <h4 className="pro-user-username text-dark mt-2 mb-0">
                          ID : {data.admin_id}
                        </h4>
                        {/* <img alt="avatar" src="./img/users/1.jpg" /> */}
                      </div>
                    </div>

                    <div className="item-user pro-user">
                      <h4 className="pro-user-username text-dark mt-2 mb-0">
                        NAME : {data.admin_name}
                      </h4>
                      <p className="pro-user-desc text-muted mb-1">
                        EMAIL : {data.admin_email}
                      </p>
                      <p className="pro-user-desc text-muted mb-1">
                        NUMBER : {data.admin_number}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Row --> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
