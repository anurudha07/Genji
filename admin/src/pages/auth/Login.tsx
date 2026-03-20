import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import toast from "react-hot-toast";

interface SendOtpResponse {
  success: boolean;
  message: string;
}

const Login = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!phone) {
      toast.error("Enter phone number");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post<SendOtpResponse>("/auth/send-otp", { phone });

      if (res.data.success) {
        toast.success("OTP sent");
        navigate("/verify", { state: { phone } });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>GENJI</h2>
        <p style={styles.subtitle}>Admin Access</p>

        <input
          style={styles.input}
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendOtp()}
        />

        <button
          style={{
            ...styles.button,
            opacity: loading ? 0.5 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onClick={sendOtp}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default Login;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    width: "100vw",
    background: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: 320,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },

  title: {
    color: "#fff",
    letterSpacing: 4,
    fontSize: 20,
  },

  subtitle: {
    color: "#666",
    fontSize: 13,
    marginBottom: 10,
  },

  input: {
    width: "100%",
    padding: 12,
    border: "1px solid #333",
    background: "#000",
    color: "#fff",
    outline: "none",
    textAlign: "center",
  },

  button: {
    width: "100%",
    padding: 12,
    background: "#fff",
    color: "#000",
    border: "none",
  },
};