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

  // 🧪 fake data
  const stats = [
    { title: "Users", value: "1,240" },
    { title: "Active Today", value: "320" },
    { title: "Reports", value: "18" },
    { title: "Revenue", value: "₹12,400" },
  ];

  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.content}>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.subtitle}>Welcome back, Admin</p>

        {/* 📊 Stats */}
        <div style={styles.grid}>
          {stats.map((item) => (
            <div key={item.title} style={styles.card}>
              <p style={styles.cardTitle}>{item.title}</p>
              <h2 style={styles.cardValue}>{item.value}</h2>
            </div>
          ))}
        </div>

        {/* 📋 Section */}
        <div style={styles.section}>
          <p style={styles.sectionTitle}>Recent Activity</p>

          <div style={styles.activity}>
            <p>User John signed up</p>
            <p>Report generated</p>
            <p>Payment received</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    background: "#000",
  },

  content: {
    flex: 1,
    padding: 30,
    color: "#fff",
  },

  title: {
    marginBottom: 5,
  },

  subtitle: {
    color: "#666",
    marginBottom: 30,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 20,
    marginBottom: 40,
  },

  card: {
    border: "1px solid #222",
    padding: 20,
  },

  cardTitle: {
    color: "#666",
    marginBottom: 10,
    fontSize: 14,
  },

  cardValue: {
    margin: 0,
  },

  section: {
    border: "1px solid #222",
    padding: 20,
  },

  sectionTitle: {
    marginBottom: 15,
    color: "#aaa",
  },

  activity: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    color: "#ccc",
  },
};