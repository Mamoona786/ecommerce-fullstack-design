import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";
import { createAdminUser } from "../../../services/adminService";

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
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
      username: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await createAdminUser({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
      });

      setSuccess("User created successfully");
      resetForm();

      setTimeout(() => {
        navigate("/admin/users/view");
      }, 1000);
    } catch (err) {
      console.error("Failed to create user:", err);
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-header">
          <h1>Add User</h1>
          <p>Create a new user or admin.</p>
        </div>

        <section className="admin-dashboard-section">
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Enter username"
              />
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Enter password"
              />
            </div>

            <div>
              <label>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
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
              {loading ? "Saving..." : "Save User"}
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

export default AddUser;
