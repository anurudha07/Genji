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
        <h2 style={styles.title}>Genji -- admin</h2>

        <input
          style={styles.input}
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          style={styles.button}
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
    background: "#000", // pure black
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: 300,
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },

  title: {
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },

  input: {
    padding: 10,
    border: "1px solid #333",
    background: "#000",
    color: "#fff",
    outline: "none",
  },

  button: {
    padding: 10,
    background: "#fff",
    color: "#000",
    border: "none",
    cursor: "pointer",
  },
};