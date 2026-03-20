import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import toast from "react-hot-toast";

interface VerifyResponse {
    success: boolean;
    message: string;
    token?: string;
}

interface LocationState {
    phone: string;
}

const OTP_LENGTH = 6;

const Verify = () => {
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const [loading, setLoading] = useState(false);

    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state as LocationState | null;
    const phone = state?.phone || "";

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < OTP_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const verifyOtp = async () => {
        const finalOtp = otp.join("");

        if (finalOtp.length !== OTP_LENGTH) {
            toast.error("Enter full OTP");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post<VerifyResponse>("/auth/verify-otp", {
                phone,
                otp: finalOtp,
            });

            if (res.data.success && res.data.token) {
                localStorage.setItem("token", res.data.token);
                toast.success("Login success");
                navigate("/dashboard");
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
                <h2 style={styles.title}>Verify OTP</h2>

                <p style={styles.phone}>{phone}</p>

                <div style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputsRef.current[index] = el;
                            }}
                            style={styles.otpInput}
                            value={digit}
                            maxLength={1}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>

                <button
                    style={styles.button}
                    onClick={verifyOtp}
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify"}
                </button>
            </div>
        </div>
    );
};

export default Verify;

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
        gap: 25,
    },

    title: {
        color: "#fff",
    },

    phone: {
        color: "#666",
        fontSize: 14,
    },

    otpContainer: {
        display: "flex",
        gap: 10,
    },

    otpInput: {
        width: 40,
        height: 45,
        textAlign: "center",
        fontSize: 18,
        border: "1px solid #333",
        background: "#000",
        color: "#fff",
        outline: "none",
    },

    button: {
        width: "100%",
        padding: 12,
        background: "#fff",
        color: "#000",
        border: "none",
        cursor: "pointer",
    },
};