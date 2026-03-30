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

        {loading && <p>Loading products...</p>}
        {error && <p className="admin-dashboard-error">{error}</p>}

        {!loading && !error && (
          <section className="admin-dashboard-section">
            <h2>Products List</h2>

            <div className="admin-dashboard-table-wrap">
              <table className="admin-dashboard-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.category?.category_name || "N/A"}</td>
                      <td>{product.stock}</td>
                      <td>{formatCurrency(product.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </AdminLayout>
  );
};

export default ViewProducts;
