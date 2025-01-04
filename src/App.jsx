import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PurchaseList from "./components/PurchaseList";
import AddPurchase from "./components/AddPurchase";
import EditPurchase from "./components/EditPurchase";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PurchaseList />} />
          <Route path="/add" element={<AddPurchase />} />
          <Route path="/edit/:id" element={<EditPurchase />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
