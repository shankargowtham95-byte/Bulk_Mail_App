import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  HomeIcon,
  EnvelopeIcon,
  ClockIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { UserContext } from "../context/UserContext";
function History() {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const logout = () => {
    logoutUser();
    navigate("/");
  };
  useEffect(() => {
    if(!user){
      return;
    }
    console.log("History user:",user);
    axios
      .get(`https://bulk-mail-app-phi.vercel.app/history/${user.username}`)
      .then((response) => {
        console.log("History from MongoDB:",response.data);
        setHistory(response.data);
      })
      .catch((error)=>{
        console.log("History loading error:",error);
      });
  }, [user]);
  return (
    <div className="min-h-screen bg-[#160d20] text-white flex">
      <aside className="w-60 bg-[#21142c] border-r border-purple-900 p-5 flex flex-col">
        <h1 className="text-2xl font-semibold mb-10">NovaVerse</h1>
        <nav className="space-y-2">
          <Link
            to="/home"
            className="flex items-center gap-3 hover:bg-purple-900 px-4 py-3 rounded-lg">
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
            className="flex items-center gap-3 bg-purple-900 px-4 py-3 rounded-lg">
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
          <div className="flex items-center gap-2 text-purple-300">
            <UserIcon className="w-5 h-5" />
            {user?.username}
          </div>
        </nav>
        <section className="p-8">
          <h2 className="text-3xl font-semibold">Email History</h2>
          <p className="text-gray-400 mt-2 mb-8">Previously sent emails.</p>
          {history.length === 0 ? (<div className="bg-[#21142c] border border-purple-900 rounded-xl p-10 text-center">
              <ClockIcon className="w-10 h-10 text-purple-400 mx-auto" />
              <h3 className="text-xl mt-4">No emails sent yet</h3>
              <p className="text-gray-400 mt-2">
                Sent emails will appear here.</p>
            </div>) : (<div className="space-y-4">
              {history.map((mail) => (
                <div
                  key={mail._id}
                  className="bg-[#21142c] border border-purple-900 rounded-xl p-5">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">{mail.subject}</h3>
                    <span className="text-gray-500 text-sm">
                      {new Date(mail.date).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-purple-300 mt-3">To: {mail.recipients}</p>
                  <p className="text-gray-400 mt-3">{mail.body}</p>
                  <p className="text-green-400 mt-3">Status: {mail.status}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default History;
