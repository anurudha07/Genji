import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SendOtpResponse {
  success: boolean;
  message: string;
}

const Login = () => {
  const [phone, setPhone] = useState<string>("");
  const navigate = useNavigate();

  const sendOtp = async (): Promise<void> => {
    const res = await fetch("http://localhost:5000/api/v1/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    });

    const data: SendOtpResponse = await res.json();

    if (data.success) {
      alert("OTP sent");
      navigate("/verify", { state: { phone } });
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input
        placeholder="Enter phone no."
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br /><br />

      <button onClick={sendOtp}>Send OTP</button>
    </div>
  );
}

export default Login;