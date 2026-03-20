import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

interface VerifyResponse {
  success: boolean;
  message: string;
  token?: string;
}

interface LocationState {
  phone: string;
}

const Verify = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | null;
  const phone = state?.phone || "";

  const verifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      const res = await api.post<VerifyResponse>("/auth/verify-otp", {
        phone,
        otp,
      });

      if (res.data.success && res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error)
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Verify OTP</h2>

      <p>Phone: {phone}</p>

      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <br /><br />

      <button onClick={verifyOtp}>Verify</button>
    </div>
  );
};

export default Verify;