// Login.jsx
import { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/auth/login", form);
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen flex items-center justify-center
      bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
      px-4
      "
    >
      <div
        className="
        w-full max-w-md
        bg-gray-800/70 backdrop-blur-md
        border border-gray-700
        shadow-2xl
        rounded-2xl
        p-8
        transition-all duration-300
        hover:shadow-blue-500/10
        "
      >
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-1">
            Welcome Back 👋
          </h2>
          <p className="text-gray-400 text-sm">
            Login to continue to your dashboard
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="
              w-full
              bg-gray-900 border border-gray-700
              rounded-lg px-4 py-2.5
              text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition duration-200
              "
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="
              w-full
              bg-gray-900 border border-gray-700
              rounded-lg px-4 py-2.5
              text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition duration-200
              "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            bg-gradient-to-r from-blue-600 to-indigo-600
            hover:from-blue-700 hover:to-indigo-700
            text-white font-semibold
            py-2.5 rounded-lg
            shadow-md
            transition-all duration-300
            hover:shadow-lg hover:-translate-y-0.5
            active:scale-95
            disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-400 text-center mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium transition"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
