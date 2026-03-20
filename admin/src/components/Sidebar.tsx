import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        width: 200,
        height: "100vh",
        background: "#eee",
        padding: 10,
      }}
    >
      <h3>Sidebar</h3>

      <p style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
        Dashboard
      </p>

      <p style={{ cursor: "pointer" }}>Settings</p>

      <p style={{ cursor: "pointer", color: "red" }} onClick={logout}>
        Logout
      </p>
    </div>
  );
};

export default Sidebar;