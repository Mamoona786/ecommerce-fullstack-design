import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { getAdminProducts } from "../../../services/adminService";

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminProducts();
        setProducts(data?.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(err.response?.data?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-header">
          <h1>View Products</h1>
          <p>All store products are listed below.</p>
        </div>

        <section className="admin-dashboard-section">
          <h2>Products List</h2>

          {loading && <p>Loading products...</p>}
          {error && <p className="admin-dashboard-error">{error}</p>}

          {!loading && !error && (
            <div className="admin-dashboard-table-wrap">
              <table className="admin-dashboard-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Created At</th>
                  </tr>
                </thead>

                <tbody>
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.category?.category_name || "N/A"}</td>
                        <td>{product.brand || "N/A"}</td>
                        <td>{product.stock ?? 0}</td>
                        <td>{product.stockStatus || "N/A"}</td>
                        <td>{formatCurrency(product.price)}</td>
                        <td>
                          {product.createdAt
                            ? new Date(product.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center" }}>
                        No products found
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

export default ViewProducts;
