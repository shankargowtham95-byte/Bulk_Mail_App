import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  HomeIcon,
  EnvelopeIcon,
  ClockIcon,
  ArrowRightOnRectangleIcon,
  PaperAirplaneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { UserContext } from "../context/UserContext";
function BulkMail() {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const logout = () => {
    logoutUser();
    navigate("/");
  };
  const sendEmail = async (event) => {
    event.preventDefault();
    setMessage("");
    if(!user){
      setMessage("Please login first");
      return;
    }
    if (!recipients || !subject || !body) {
      setMessage("Please fill all fields");
      return;
    }
    setSending(true);
    try {
      const response = await axios.post("http://localhost:5000/send-email", {
        username: user?.username,
        recipients,
        subject,
        body,
      });
      setMessage(response.data);
      if (response.data === "Emails sent successfully") {
        setRecipients("");
        setSubject("");
        setBody("");
      }
    } catch {
      setMessage("Email sending failed");
    }
    setSending(false);
  };
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
            className="flex items-center gap-3 bg-purple-900 px-4 py-3 rounded-lg">
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
          <div className="flex items-center gap-2 text-purple-300">
            <UserIcon className="w-5 h-5" />
            {user?.username}
          </div>
        </nav>
        <section className="p-8">
          <h2 className="text-3xl font-semibold">Bulk Mail</h2>
          <p className="text-gray-400 mt-2 mb-8">
            Send emails to multiple recipients.
          </p>
          <div className="max-w-3xl bg-[#21142c] border border-purple-900 rounded-xl p-7">
            <form onSubmit={sendEmail}>
              <label className="block mb-2">Recipients</label>
              <textarea
                value={recipients}
                onChange={(event) => setRecipients(event.target.value)}
                placeholder="example@gmail.com, test@gmail.com"
                className="w-full bg-[#160d20] border border-purple-900 rounded-lg p-3 outline-none min-h-24"/>
              <p className="text-gray-500 text-sm mt-1">
                Separate email addresses with commas.</p>
              <label className="block mt-5 mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="Enter subject"
                className="w-full bg-[#160d20] border border-purple-900 rounded-lg p-3 outline-none"/>
              <label className="block mt-5 mb-2">Email Body</label>
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder="Write your email..."
                className="w-full bg-[#160d20] border border-purple-900 rounded-lg p-3 outline-none min-h-44"/>
              <button
                type="submit"
                disabled={sending}
                className="mt-6 bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg flex items-center gap-2">
                <PaperAirplaneIcon className="w-5 h-5" />
                {sending ? "Sending..." : "Send Email"}
              </button>
              {message && <p className="text-purple-300 mt-4">{message}</p>}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default BulkMail;
