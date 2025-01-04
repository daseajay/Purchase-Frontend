import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Addpurchase.css";
const AddPurchase = () => {
  const navigate = useNavigate(); // Fix typo: naviget -> navigate
  const [formData, setFormData] = useState({
    vendorName: "",
    product: "",
    quantity: "",
    cost: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://purchase-records.onrender.com/api/purchases/add", formData)
      .then(() => {
        alert("Purchase added successfully!");
        navigate("/"); // Redirect to the purchase list page
      })
      .catch((err) => {
        alert("Error adding purchase.");
        console.error(err);
      });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Add New Purchase</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Vendor Name</label>
              <input
                type="text"
                name="vendorName"
                className="form-control"
                value={formData.vendorName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Product</label>
              <input
                type="text"
                name="product"
                className="form-control"
                value={formData.product}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Cost</label>
              <input
                type="number"
                name="cost"
                className="form-control"
                value={formData.cost}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Submit Purchase
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPurchase;
