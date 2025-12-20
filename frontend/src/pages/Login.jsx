import { useState } from "react";
import API from "../services/api";

export default function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-80 p-6 rounded shadow bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">
          Login
        </h2>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 mb-2">
            {error}
          </p>
        )}

        <input
          className="w-full mb-2 p-2 border rounded
                     bg-white dark:bg-gray-700
                     text-gray-900 dark:text-gray-100"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 border rounded
                     bg-white dark:bg-gray-700
                     text-gray-900 dark:text-gray-100"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={submit}
          className="w-full bg-blue-600 hover:bg-blue-700
                     text-white py-2 rounded transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <button
            onClick={onRegister}
            className="text-blue-600 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
