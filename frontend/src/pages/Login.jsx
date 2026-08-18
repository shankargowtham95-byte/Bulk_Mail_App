import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { UserContext } from "../context/UserContext";
function Login() {
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");
    if (!email || !password) {
      setMessage("Please fill all fields");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if (typeof response.data === "string") {
        setMessage(response.data);
        return;
      }
      loginUser(response.data);
      navigate("/home");
    } catch {
      setMessage("Login failed");
    }
  };
  return (
    <div className="min-h-screen bg-[#160d20] text-white">
      <nav className="h-20 flex items-center justify-between px-8 border-b border-purple-900">
        <h1 className="text-2xl font-semibold">NovaVerse</h1>
        <div className="flex items-center gap-6">
          <Link to="/signup" className="text-purple-300 hover:text-white">
            Sign Up
          </Link>
          <Link to="/" className="text-gray-400 hover:text-white">
            Back
          </Link>
        </div>
      </nav>
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5">
        <div className="w-full max-w-md bg-[#21142c] border border-purple-900 rounded-xl p-8">
          <h2 className="text-3xl font-semibold text-center">Login</h2>
          <p className="text-gray-400 text-center mt-2 mb-7">
            Login to continue to NovaVerse</p>
          <form onSubmit={handleLogin}>
            <label className="block mb-2">Email</label>
            <div className="flex items-center gap-3 bg-[#160d20] border border-purple-900 rounded-lg px-3">
              <EnvelopeIcon className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email"
                className="w-full bg-transparent outline-none py-3"/>
            </div>
            <label className="block mt-5 mb-2">Password</label>
            <div className="flex items-center gap-3 bg-[#160d20] border border-purple-900 rounded-lg px-3">
              <LockClosedIcon className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                className="w-full bg-transparent outline-none py-3"/>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg mt-6">
              Login</button>
            {message && (
              <p className="text-red-400 text-sm text-center mt-4">{message}</p>)}
          </form>
          <p className="text-gray-400 text-center mt-6">
            Don't have an account?
            <Link to="/signup" className="text-purple-400 ml-1">
              Sign Up</Link></p>
        </div>
      </main>
    </div>
  );
}

export default Login;
