import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/EditPurchase.css";
const EditPurchase = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    vendorName: "",
    product: "",
    quantity: "",
    cost: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://purchase-records.onrender.com/api/purchases/all`)
      .then((response) => {
        const purchase = response.data;
        setFormData({
          vendorName: purchase.vendorName,
          product: purchase.product,
          quantity: purchase.quantity,
          cost: purchase.cost,
        });
      })
      .catch((err) => {
        setError("Failed to load purchase data.");
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (
      !formData.vendorName ||
      !formData.product ||
      !formData.quantity ||
      !formData.cost
    ) {
      setError("All fields are required.");
      return;
    }

    const dataToSubmit = {
      ...formData,
      quantity: Number(formData.quantity),
      cost: Number(formData.cost),
    };

    axios
      .put(
        `https://purchase-records.onrender.com/api/purchases/edit/${id}`,
        dataToSubmit
      )
      .then(() => {
        alert("Purchase updated successfully!");
        navigate("/"); // Navigate to the purchase list after successful update
      })
      .catch((err) => {
        setError("Failed to update purchase.");
        console.error(err);
      });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Edit Purchase</h1>
      <form onSubmit={handleSubmit} className="form-container">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group">
          <label>Vendor Name</label>
          <input
            type="text"
            name="vendorName"
            className="form-control"
            onChange={handleChange}
            value={formData.vendorName}
          />
        </div>
        <div className="form-group">
          <label>Product</label>
          <input
            type="text"
            name="product"
            className="form-control"
            onChange={handleChange}
            value={formData.product}
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            onChange={handleChange}
            value={formData.quantity}
          />
        </div>
        <div className="form-group">
          <label>Cost</label>
          <input
            type="number"
            name="cost"
            className="form-control"
            onChange={handleChange}
            value={formData.cost}
          />
        </div>
        <button type="submit" className="btn btn-success w-100 mt-2">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPurchase;
