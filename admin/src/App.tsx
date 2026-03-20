
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Verify from "./pages/auth/Verify";
import Dashboard from "./pages/auth/Dashboard";


function App() {


  return (
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/dashboard" element={<Dashboard />} />
     </Routes>
  )
}

export default App;
