import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PurchaseList from "./components/PurchaseList";
import AddPurchase from "./components/AddPurchase";
import EditPurchase from "./components/EditPurchase";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/sidebar";

const App = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <BrowserRouter>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<PurchaseList />} />
            <Route path="/add" element={<AddPurchase />} />
            <Route path="/edit/:id" element={<EditPurchase />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
