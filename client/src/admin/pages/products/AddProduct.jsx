import React, { useState } from "react";
import AdminLayout from "../../layout/AdminLayout";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Add Product API will be connected here.");
  };

  return (
    <AdminLayout>
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-header">
          <h1>Add Product</h1>
          <p>Create a new product for your store.</p>
        </div>

        <section className="admin-dashboard-section">
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
            <div>
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                style={inputStyle}
              />
            </div>

            <button type="submit" style={buttonStyle}>
              Save Product
            </button>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
};

const inputStyle = {
  width: "100%",
  marginTop: "8px",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  outline: "none",
};

const buttonStyle = {
  background: "#55c7a2",
  color: "#fff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
};

export default AddProduct;
