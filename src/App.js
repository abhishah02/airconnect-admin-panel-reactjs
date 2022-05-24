import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminComponent from "./components/AdminComponent";
import Category from "./layouts/Category";
import Dashboard from "./layouts/Dashboard";
import Profile from "./layouts/Profile";
import Reset from "./layouts/Reset";
import Signin from "./layouts/Signin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AdminComponent />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/category" element={<Category />} />
        </Route>
        <Route path="/" element={<Signin />} />
      </Routes>
    </Router>
  );
};

export default App;
