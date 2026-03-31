import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";
import { createCategory } from "../../../services/categoryService";

const AddCategory = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category_name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      category_name: "",
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await createCategory({
        category_name: formData.category_name.trim(),
        description: formData.description.trim(),
      });

      setSuccess("Category created successfully");
      resetForm();

      setTimeout(() => {
        navigate("/admin/categories/view");
      }, 1000);
    } catch (err) {
      console.error("Failed to create category:", err);
      setError(err.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-header">
          <h1>Add Category</h1>
          <p>Create a new category for your store.</p>
        </div>

        <section className="admin-dashboard-section">
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
            <div>
              <label>Category Name</label>
              <input
                type="text"
                name="category_name"
                value={formData.category_name}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Enter category name"
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
                placeholder="Enter category description"
              />
            </div>

            {error && (
              <p style={{ color: "#dc2626", margin: 0, fontWeight: "500" }}>
                {error}
              </p>
            )}

            {success && (
              <p style={{ color: "#16a34a", margin: 0, fontWeight: "500" }}>
                {success}
              </p>
            )}

            <button type="submit" style={buttonStyle} disabled={loading}>
              {loading ? "Saving..." : "Save Category"}
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

export default AddCategory;
