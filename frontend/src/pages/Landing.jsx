import { Link } from "react-router-dom";
import {
  RocketLaunchIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
function Landing() {
  return (
    <div className="min-h-screen bg-[#160d20] text-white">
      <nav className="h-20 flex items-center justify-between px-8 border-b border-purple-900">
        <h1 className="text-2xl font-semibold">NovaVerse</h1>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-gray-300 hover:text-white">
            Login</Link>
          <Link to="/signup" className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg">
            Get Started</Link>
        </div>
      </nav>
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-semibold">
            Welcome to NovaVerse</h2>
          <p className="text-purple-300 mt-4 text-lg">
            A Universe of New Possibilities and Innovation.</p>
          <p className="text-gray-400 mt-5 leading-7">
            Discover ideas, create projects and explore useful tools in one
            simple workspace.</p>
          <div className="flex justify-center gap-4 mt-8">
            <Link
              to="/signup"
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg flex items-center gap-2">
              <RocketLaunchIcon className="w-5 h-5" />
              Get Started</Link>
            <Link
              to="/login"
              className="border border-purple-600 px-6 py-3 rounded-lg flex items-center gap-2">
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Login</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Landing;