/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("Info");
    if (auth) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    // console.warn(email, password);
    let result = await fetch("http://localhost:5000/admin/signin", {
      method: "POST",
      body: JSON.stringify({ admin_email: email, admin_password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let res = await result.json();
    if (res.user.st) {
      if (res.user.role === 1) {
        localStorage.setItem(
          "Info",
          JSON.stringify({
            token: res.accessToken,
            user: res.user,
          })
        );
        navigate("/dashboard");
        window.location.reload();
      } else {
        localStorage.setItem(
          "Info",
          JSON.stringify({
            token: res.accessToken,
            user: res.user,
          })
        ); // remain only send token
        navigate("/dashboard");
        window.location.reload();
      }
    } else {
      alert(res.msg);
    }
  };

  return (
    <div className="page main-signin-wrapper">
      {/* <!-- Row --> */}
      <div className="row text-center ps-0 pe-0 ms-0 me-0">
        <div className=" col-xl-3 col-lg-5 col-md-5 d-block mx-auto">
          <div className="card custom-card">
            <div className="card-body pd-45">
              <h4 className="text-center">SignIn to Your Account</h4>
              <form method="POST" onSubmit={(e) => login(e)}>
                <div className="form-group text-start">
                  <label>Email</label>
                  <input
                    className="form-control"
                    placeholder="Enter your email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group text-start">
                  <label>Password</label>
                  <input
                    className="form-control"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="btn ripple btn-main-primary btn-block">
                  Sign In
                </button>
              </form>
              {/* <div className="mt-3 text-center">
          <p className="mb-1">
            <a href="">Forgot password?</a>
          </p>
          <p className="mb-0">
            Don't have an account?{" "}
            <a href="signup.html">Create an Account</a>
          </p>
        </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Row --> */}
    </div>
  );
};

export default Signin;
