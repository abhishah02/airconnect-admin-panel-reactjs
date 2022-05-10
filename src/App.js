import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminComponent from "./components/AdminComponent";
import Dashboard from "./layouts/Dashboard";
import Signin from "./layouts/Signin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AdminComponent />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Signin />} />
      </Routes>
    </Router>
  );
};

export default App;
