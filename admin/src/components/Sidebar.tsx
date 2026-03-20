import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/users" },
    { name: "Analytics", path: "/analytics" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div style={styles.container}>
      {/* 🔝 TOP */}
      <div style={styles.top}>
        <h2 style={styles.logo}>GENJI</h2>
      </div>

      {/* 📂 MIDDLE */}
      <div style={styles.menu}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <div
              key={item.name}
              onClick={() => navigate(item.path)}
              style={{
                ...styles.item,
                ...(isActive ? styles.activeItem : {}),
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>

      {/* 🔻 BOTTOM */}
      <div style={styles.bottom}>
        <div style={styles.logout} onClick={logout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: 220,
    height: "100vh",
    background: "#000",
    borderRight: "1px solid #222",
    display: "flex",
    flexDirection: "column",
  },

  top: {
    padding: "20px 20px 10px",
    borderBottom: "1px solid #111",
  },

  logo: {
    color: "#fff",
    letterSpacing: 4,
    fontSize: 18,
  },

  menu: {
    flex: 1,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  item: {
    padding: "10px 12px",
    color: "#777",
    cursor: "pointer",
    borderLeft: "2px solid transparent",
  },

  activeItem: {
    color: "#fff",
    borderLeft: "2px solid #fff",
  },

  bottom: {
    padding: 20,
    borderTop: "1px solid #111",
  },

  logout: {
    color: "#fff",
    cursor: "pointer",
  },
};