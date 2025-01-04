import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../components/purchaselist.css";
import { saveAs } from "file-saver";

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axios
      .get("https://purchase-records.onrender.com/api/purchases/all")
      .then((res) => {
        setPurchases(res.data);
      });
  }, []);

  const deletePurchase = (id) => {
    if (window.confirm("Are you sure you want to delete this purchase?")) {
      axios
        .delete(
          `https://purchase-records.onrender.com/api/purchases/delete/${id}`
        )
        .then(() => {
          setPurchases(purchases.filter((purchase) => purchase._id !== id));
        });
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Vendor Name", "Product", "Quantity", "Cost", "Date"],
      ...purchases.map((purchase) => [
        purchase.vendorName,
        purchase.product,
        purchase.quantity,
        purchase.cost,
        purchase.date,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "purchases.csv");
  };

  const exportToPDF = async () => {
    try {
      const response = await axios.get(
        "https://purchase-records.onrender.com/api/purchases/export-pdf",
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      saveAs(pdfBlob, "purchases.pdf");
    } catch (error) {
      console.error("Error exporting to PDF:", error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Purchase Records</h1>
      <div className="d-flex justify-content-between mb-3">
        <Link to="/add" className="btn btn-primary">
          Add Purchase
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Vendor Name</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Cost</th>
              <th>Total Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase._id}>
                <td>{purchase.vendorName}</td>
                <td>{purchase.product}</td>
                <td>{purchase.quantity}</td>
                <td>{purchase.cost}</td>
                <td>{purchase.totalCost}</td>
                <td>
                  <Link
                    to={`/edit/${purchase._id}`}
                    className="btn btn-warning btn-sm mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePurchase(purchase._id)}
                    className="btn btn-danger btn-sm ms-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="btn-sm btn btn-success mx-2"
                  >
                    Export to CSV
                  </button>
                  <button onClick={exportToPDF} className="btn-sm btn btn-info">
                    Export to PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseList;
