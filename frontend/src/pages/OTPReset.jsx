import { useState } from "react";

const OTPReset = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter OTP

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
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };

  // Verify OTP & Reset Password
  const verifyOTP = async () => {
    const res = await fetch("http://localhost:3000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    const data = await res.json();
    alert(data.message);
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
            <h2 className="text-xl font-semibold text-center mb-4">Enter OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 border rounded-md mb-4 outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setOtp(e.target.value)}
            />
            <h2 className="text-xl font-semibold text-center mb-4">New Password</h2>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-2 border rounded-md mb-4 outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={verifyOTP}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
            >
              Verify & Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OTPReset;
