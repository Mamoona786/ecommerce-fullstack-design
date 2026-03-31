import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";
import { createProduct } from "../../../services/productService";
import { getAllCategories } from "../../../services/categoryService";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
    description: "",
    category: "",
    brand: "",
    shortDescription: "",
    subCategory: "",
  });

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await getAllCategories();
        setCategories(data?.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      stock: "",
      image: "",
      description: "",
      category: "",
      brand: "",
      shortDescription: "",
      subCategory: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await createProduct({
        name: formData.name.trim(),
        price: Number(formData.price || 0),
        stock: Number(formData.stock || 0),
        image: formData.image.trim(),
        description: formData.description.trim(),
        category: formData.category,
        brand: formData.brand.trim(),
        shortDescription: formData.shortDescription.trim(),
        subCategory: formData.subCategory.trim(),
      });

      setSuccess("Product created successfully");
      resetForm();

      setTimeout(() => {
        navigate("/admin/products/view");
      }, 1000);
    } catch (err) {
      console.error("Failed to create product:", err);
      setError(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
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
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={inputStyle}
                disabled={categoriesLoading}
              >
                <option value="">
                  {categoriesLoading ? "Loading categories..." : "Select category"}
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Enter price"
                min="0"
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
                placeholder="Enter stock quantity"
                min="0"
              />
            </div>

            <div>
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Enter brand name"
              />
            </div>

            <div>
              <label>Sub Category</label>
              <input
                type="text"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Enter sub category"
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
                placeholder="Enter image URL"
              />
            </div>

            <div>
              <label>Short Description</label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows="3"
                style={inputStyle}
                placeholder="Enter short description"
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
                placeholder="Enter full description"
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
              {loading ? "Saving..." : "Save Product"}
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
