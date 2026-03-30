import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { getAllCategories } from "../../../services/categoryService";

const ViewCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllCategories();
        setCategories(data?.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError(err.response?.data?.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-dashboard-page">
        {/* Header */}
        <div className="admin-dashboard-header">
          <h1>View Categories</h1>
          <p>All available categories in your store.</p>
        </div>

        {/* Content */}
        <section className="admin-dashboard-section">
          <h2>Categories List</h2>

          {loading && <p>Loading categories...</p>}
          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
          )}

          {!loading && !error && (
            <div className="admin-dashboard-table-wrap">
              <table className="admin-dashboard-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>Description</th>
                    <th>Created At</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <tr key={category._id}>
                        <td>{index + 1}</td>
                        <td>{category.category_name}</td>
                        <td>{category.description || "N/A"}</td>
                        <td>
                          {new Date(category.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        No categories found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
};

export default ViewCategories;
