import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import "../styles/register.css";
import { registerUser } from "../services/authService";

const registerHeroImg = "/login-hero.png";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    const data = await registerUser(formData);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Registration failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="register-page">
      <div className="register-shell">
        <div className="register-card">
          <div className="register-left">
            <div className="register-left-inner">
              <p className="register-welcome-small">Nice to see you again</p>
              <h2 className="register-welcome-title">Welcome back</h2>

              <div className="register-bubbles">
                <span className="register-bubble register-bubble-1" />
                <span className="register-bubble register-bubble-2" />
                <span className="register-bubble register-bubble-3" />
                <span className="register-bubble register-bubble-4" />
                <span className="register-bubble register-bubble-5" />
                <span className="register-bubble register-bubble-6" />
                <span className="register-bubble register-bubble-7" />
                <span className="register-bubble register-bubble-8" />
                <span className="register-bubble register-bubble-9" />
              </div>

              <div className="register-hero-wrap">
                <img
                  src={registerHeroImg}
                  alt="Welcome illustration"
                  className="register-hero-image"
                />
              </div>
            </div>
          </div>

          <div className="register-right">
            <div className="register-brand">eCommerce Store</div>

            <div className="register-copy">
              <h1>Register.</h1>
              <p>Create an account to access all our awesome features.</p>
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="register-field">
                <label htmlFor="username">Enter your username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="register-field">
                <label htmlFor="email">Enter your email address</label>
                <div className="register-input-wrap">
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <span className="register-input-icon">
                    <FiMail />
                  </span>
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="password">Create a password</label>
                <div className="register-input-wrap">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="atleast 8 characters"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {error && (
                <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
              )}

              <button
                type="submit"
                className="register-submit-btn"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>

              <p className="register-login-text">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
