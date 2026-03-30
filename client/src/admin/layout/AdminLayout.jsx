import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminLayout.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-layout-content">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
