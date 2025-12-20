import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      setSuccess("Account created successfully. Please login.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("User already exists or invalid data");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-green-500 via-teal-500 to-blue-500
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
    ">
      <div className="w-full max-w-md bg-white dark:bg-gray-800
        rounded-2xl shadow-2xl p-8
      ">
        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Create Account ✨
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
          Start managing your tasks
        </p>

        {/* ERROR */}
        {error && (
          <p className="mt-4 text-center text-red-600 text-sm">
            {error}
          </p>
        )}

        {/* SUCCESS */}
        {success && (
          <p className="mt-4 text-center text-green-600 text-sm">
            {success}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleRegister} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-1 w-full px-4 py-2 rounded-lg
                border border-gray-300
                focus:ring-2 focus:ring-green-500
                focus:outline-none
                dark:bg-gray-700 dark:border-gray-600 dark:text-white
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 rounded-lg
                border border-gray-300
                focus:ring-2 focus:ring-green-500
                focus:outline-none
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
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 rounded-lg
                border border-gray-300
                focus:ring-2 focus:ring-green-500
                focus:outline-none
                dark:bg-gray-700 dark:border-gray-600 dark:text-white
              "
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg
              bg-green-600 text-white font-semibold
              hover:bg-green-700 transition
            "
          >
            Register
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 hover:underline font-medium"
          >
            Login
          </Link>

        </p>
      </div>
    </div>
  );
};

export default Register;
