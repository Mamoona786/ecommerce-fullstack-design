import React from "react";
import AdminLayout from "../../layout/AdminLayout";

const AdminCart = () => {
  return (
    <AdminLayout>
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-header">
          <h1>Cart</h1>
          <p>Admin cart overview page.</p>
        </div>

        <section className="admin-dashboard-section">
          <h2>Cart Management</h2>
          <p style={{ color: "#6b7280", lineHeight: "1.7" }}>
            This page is reserved for cart-related admin functionality.
            Later, you can use this page to show active user carts,
            abandoned carts, or cart analytics.
          </p>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminCart;
