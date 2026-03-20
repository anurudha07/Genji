import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: 20 }}>
        <h2>Dashboard</h2>

        <p>Welcome Admin 👋</p>

        <p>Your Token:</p>
        <p style={{ wordBreak: "break-all" }}>{token}</p>
      </div>
    </div>
  );
};

export default Dashboard;