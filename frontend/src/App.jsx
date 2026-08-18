import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import BulkMail from "./pages/BulkMail";
import History from "./pages/History";
import { UserContext } from "./context/UserContext";
function App() {
  const { user } = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />}/>
      <Route path="/bulkmail" element={user ? <BulkMail /> : <Navigate to="/login"/>}/>
      <Route path="/history" element={user ? <History /> : <Navigate to="/login" />}/>
    </Routes>
  )};

export default App;
