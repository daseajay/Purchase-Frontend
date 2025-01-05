import React, { forwardRef } from "react";
import invoiceLogo from "../assets/Invoice.png";

const Invoice = forwardRef(({ purchase }, ref) => {
  console.log("purchase", purchase);
  if (!purchase) {
    return null;
  }

  const GST_RATE = 0.18; // 18% GST
  const invoiceId = `INV-${Date.now()}`; // Generate a unique Invoice ID using timestamp

  // Calculate GST and Total
  const productTotal = purchase.quantity * purchase.cost;
  const gstAmount = productTotal * GST_RATE;
  const totalAmount = productTotal + gstAmount;

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "'Arial', sans-serif",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
    logo: {
      width: "120px",
      height: "auto",
      marginBottom: "10px",
    },
    companyDetails: {
      fontSize: "14px",
      color: "#555",
    },
    invoiceTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      margin: "10px 0",
    },
    info: {
      marginBottom: "20px",
    },
    infoRow: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
      marginBottom: "10px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
    },
    th: {
      borderBottom: "2px solid #ddd",
      padding: "10px",
      textAlign: "left",
      fontWeight: "bold",
      backgroundColor: "#f5f5f5",
    },
    td: {
      borderBottom: "1px solid #ddd",
      padding: "10px",
    },
    summary: {
      textAlign: "right",
      fontSize: "16px",
      fontWeight: "bold",
    },
    footer: {
      marginTop: "20px",
      textAlign: "center",
      fontSize: "12px",
      color: "#777",
    },
  };

  return (
    <div ref={ref} style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <img src={invoiceLogo} alt="Logo" style={styles.logo} />
        <div style={styles.companyDetails}>
          <p>ABC Company Pvt. Ltd.</p>
          <p>123 Business Street, City, Country</p>
          <p>Phone: 8455874865 | Email: contact@abc.com</p>
        </div>
        <div style={styles.invoiceTitle}>Invoice</div>
      </div>

      <div style={styles.info}>
        <div style={styles.infoRow}>
          <p>
            <strong>Invoice ID:</strong> {invoiceId}
          </p>
          <p>
            <strong>Date:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>
        <div style={styles.infoRow}>
          <p>
            <strong>Customer Name:</strong> {purchase.vendorName}
          </p>
          <p>
            <strong>Product:</strong> {purchase.product}
          </p>
        </div>
      </div>

      {/* Product Details Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Cost</th>
            <th style={styles.th}>GST</th>
            <th style={styles.th}>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>{purchase.product}</td>
            <td style={styles.td}>{purchase.quantity}</td>
            <td style={styles.td}>&#8377;{purchase.cost.toFixed(2)}</td>
            <td style={styles.td}>&#8377;{gstAmount.toFixed(2)}</td>
            <td style={styles.td}>&#8377;{totalAmount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Summary Section */}
      <div style={styles.summary}>
        <p>
          <strong>Subtotal:</strong> &#8377;{productTotal.toFixed(2)}
        </p>
        <p>
          <strong>GST ({(GST_RATE * 100).toFixed(0)}%):</strong> &#8377;
          {gstAmount.toFixed(2)}
        </p>
        <p>
          <strong>Total Amount:</strong> &#8377;{totalAmount.toFixed(2)}
        </p>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
});

export default Invoice;
