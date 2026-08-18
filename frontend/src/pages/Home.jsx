import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  EnvelopeIcon,
  ClockIcon,
  ArrowRightOnRectangleIcon,
  CodeBracketIcon,
  UserGroupIcon,
  UserIcon
} from "@heroicons/react/24/outline";
import { UserContext } from "../context/UserContext";
function Home() {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = () => {
    logoutUser();
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-[#160d20] text-white flex">
      <aside className="w-60 bg-[#21142c] border-r border-purple-900 p-5 flex flex-col">
        <h1 className="text-2xl font-semibold mb-10">NovaVerse</h1>
        <nav className="space-y-2">
          <Link
            to="/home"
            className="flex items-center gap-3 bg-purple-900 px-4 py-3 rounded-lg">
            <HomeIcon className="w-5 h-5" />
            Home
          </Link>
          <Link
            to="/bulkmail"
            className="flex items-center gap-3 hover:bg-purple-900 px-4 py-3 rounded-lg">
            <EnvelopeIcon className="w-5 h-5" />
            Bulk Mail
          </Link>
          <Link
            to="/history"
            className="flex items-center gap-3 hover:bg-purple-900 px-4 py-3 rounded-lg">
            <ClockIcon className="w-5 h-5" />
            History
          </Link>
        </nav>
        <button
          onClick={logout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white">
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
      </aside>
      <main className="flex-1">
        <nav className="h-20 border-b border-purple-900 flex justify-end items-center px-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-purple-300">
              <UserIcon className="w-5 h-5" />
              {user?.username}
            </div>
          <button onClick={logout} className="flex items-center gap-2 text-gray-300 hover:text-white">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />Logout</button>
          </div>
        </nav>
        <section className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-semibold">
                Welcome, {user?.username}</h2>
              <p className="text-gray-400 mt-2">
                Welcome to your NovaVerse workspace.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-[#21142c] border border-purple-900 rounded-xl p-6">
              <CodeBracketIcon className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-medium">Projects</h3>
              <p className="text-gray-400 mt-2">
                Work on your development projects.</p>
            </div>
            <div className="bg-[#21142c] border border-purple-900 rounded-xl p-6">
              <UserGroupIcon className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-medium">Community</h3>
              <p className="text-gray-400 mt-2">
                Explore and share your ideas.</p>
            </div>
            <Link
              to="/bulkmail"
              className="bg-[#21142c] border border-purple-900 hover:border-purple-500 rounded-xl p-6">
              <EnvelopeIcon className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-medium">Bulk Mail</h3>
              <p className="text-gray-400 mt-2">
                Send emails to multiple recipients.</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
