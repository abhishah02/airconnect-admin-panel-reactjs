import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminComponent from "./components/AdminComponent";
import Category from "./layouts/Products/Category";
import Dashboard from "./layouts/Dashboard/Dashboard";
import Product from "./layouts/Products/Product";
import Profile from "./layouts/Profile";
import Reset from "./layouts/Reset";
import Signin from "./layouts/Signin";
import Customer from "./layouts/Customer/Customer";
import HsnMaster from "./layouts/Customer/HSN_Master";
import Sales from "./layouts/Sales/Sales";
import SalesBill from "./layouts/Sales/Sales_bill";
import SalesBillEdit from "./layouts/Sales/Sales_bill_edit";
import SubAdmin from "./layouts/Sub-Admin/Sub_admin";
// import SubAdminComponent from "./components/SubAdminComponent";

const App = () => {
  const authAdmin = JSON.parse(localStorage.getItem("Info"));
  return (
    <Router>
      <Routes>
        {authAdmin?.user?.role === 1 ? (
          <Route element={<AdminComponent />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/hsn" element={<HsnMaster />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/sales/salesBilling" element={<SalesBill />} />
            <Route path="/sales/EditSalesBilling" element={<SalesBillEdit />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product" element={<Product />} />
            <Route path="/sub-admin" element={<SubAdmin />} />
          </Route>
        ) : (
          <Route element={<AdminComponent />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/hsn" element={<HsnMaster />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/sales/salesBilling" element={<SalesBill />} />
            <Route path="/sales/EditSalesBilling" element={<SalesBillEdit />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product" element={<Product />} />
          </Route>
        )}

        <Route path="/" element={<Signin />} />
      </Routes>
    </Router>
  );
};

export default App;
