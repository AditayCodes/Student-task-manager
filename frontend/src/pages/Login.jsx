import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/";

    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
    ">
      <div className="w-full max-w-md bg-white dark:bg-gray-800
        rounded-2xl shadow-2xl p-8
      ">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
          Login to your account
        </p>

        {error && (
          <p className="mt-4 text-center text-red-600 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg
                border border-gray-300
                focus:ring-2 focus:ring-indigo-500
                dark:bg-gray-700 dark:border-gray-600 dark:text-white
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-lg
                border border-gray-300
                focus:ring-2 focus:ring-indigo-500
                dark:bg-gray-700 dark:border-gray-600 dark:text-white
              "
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg
              bg-indigo-600 text-white font-semibold
              hover:bg-indigo-700 transition
            "
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
