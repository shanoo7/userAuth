import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OTPReset = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [intervalId, setIntervalId] = useState(null);

  const navigate = useNavigate();

  // Timer logic
  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      const id = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      setIntervalId(id);

      return () => clearInterval(id);
    }
  }, [step, timeLeft]);

  // Handle timer expiration
  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalId);
    }
  }, [timeLeft, intervalId]);

  // Request OTP
  const requestOTP = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/generate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      alert("OTP sent to email!");
      setStep(2);
      setTimeLeft(60); // Reset timer on OTP request
    } catch (error) {
      console.error(error);
    }
  };

  // Verify OTP & Reset Password
  const verifyOTP = async () => {
    if (timeLeft <= 0) {
      alert("OTP has expired!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid OTP or error occurred");
      } else {
        alert("Password changed successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {step === 1 ? (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">Enter Email</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              className="w-full p-2 border rounded-md mb-4 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={requestOTP}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Request OTP
            </button>
          </>
        ) : (
          <>
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold">Enter OTP</h2>
              <p className="text-sm text-gray-600 mt-1">
                Sent to {email} • Expires in {formatTime(timeLeft)}
              </p>
            </div>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              className="w-full p-2 border rounded-md mb-4 outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              className="w-full p-2 border rounded-md mb-4 outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              onClick={verifyOTP}
              disabled={timeLeft <= 0}
              className={`w-full text-white py-2 rounded-md transition duration-300 ${timeLeft <= 0 ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {timeLeft > 0 ? "Verify & Reset Password" : "OTP Expired"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OTPReset;
