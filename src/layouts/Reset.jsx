import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  // const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  let navigate = useNavigate();

  const updateData = async (e) => {
    e.preventDefault();

    const items = JSON.parse(localStorage.getItem("Info"));
    let token = "bearer " + items.token;
    let result = await fetch("http://localhost:5000/admin/reset", {
      method: "PUT",
      body: JSON.stringify({
        admin_id: items.user.id,
        admin_password: password,
        admin_new_password: newpassword,
        admin_confirm_password: confirmpassword,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (result) {
      let res = await result.json();
      if (res.statement.st) {
        alert(res.statement.msg);
        navigate("/dashboard");
      } else {
        alert(res.statement.msg);
      }
    } else {
      localStorage.removeItem("Info");
      window.location.reload();
    }
  };
  return (
    <>
      <Header />
      <SideMenu />

      <br />
      <div class="row text-center ps-0 pe-0 ms-0 me-0">
        <div class="col-xl-3 col-lg-5 col-md-5 d-block mx-auto">
          <div class="card custom-card">
            <div class="card-body pd-45">
              <h4 class="text-center">Reset Your Password</h4>
              <form method="PUT" onSubmit={(e) => updateData(e)}>
                <div class="form-group text-start">
                  <label>Old Password</label>
                  <input
                    class="form-control"
                    placeholder="Enter your old password"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div class="form-group text-start">
                  <label>New Password</label>
                  <input
                    class="form-control"
                    placeholder="Enter your password"
                    type="text"
                    value={newpassword}
                    onChange={(e) => setNewpassword(e.target.value)}
                  />
                </div>
                <div class="form-group text-start">
                  <label>Confirm Password</label>
                  <input
                    class="form-control"
                    placeholder="Enter your password"
                    type="text"
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                  />
                </div>
                <button class="btn ripple btn-main-primary btn-block">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Reset;
