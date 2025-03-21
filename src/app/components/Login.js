"use client";
import React, { useState, useEffect } from "react";
import 'tailwindcss/tailwind.css';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Login = ({ isOpen = null, onClose = null }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen !== null) {
      setIsModalOpen(isOpen);
    }
  }, [isOpen]);

  const openModal = () => {
    if (isOpen === null) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    if (onClose) {
      onClose();
    } else {
      setIsModalOpen(false);
    }
    resetState();
  };

  const resetState = () => {
    setOtpSent(false);
    setOtp("");
    setOtpVerified(null);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const sendOtp = async () => {
    if (mobileNumber.length === 10) {
      try {
        const response = await fetch("https://api.therashtriya.com/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: mobileNumber }),
        });

        const data = await response.json();
        if (response.ok) {
          setOtpSent(true);
          setOtpVerified(null);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message || "Failed to send OTP. Please try again.");
        }
      } catch (error) {
        setErrorMessage("Network error. Please try again.");
      }
    } else {
      setErrorMessage("Please enter a valid Whatsapp Number.");
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    if (otp.length === 6) {
      try {
        const response = await fetch("https://api.therashtriya.com/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: mobileNumber,otp: otp}),
        });

        const data = await response.json();
        if (response.ok) {
          setOtpSent(true);
          setOtpVerified(null);
          setErrorMessage("");
         //store token value 
          setTimeout(() => {
            const newToken = data.token;
            localStorage.setItem("loginToken", newToken);
            
            setOtpVerified(true);
            setSuccessMessage("You are logged in successfully!");
            setIsLoading(false);
            setTimeout(() => closeModal(), 3000);
          }, 3000);

        } else {
          setErrorMessage(data.message || "Failed to verify OTP. Please try again.");
        }
      } catch (error) {
        setErrorMessage("Network error. Please try again.");
      }
    
    } else {
      setOtpVerified(false);
      setErrorMessage("Incorrect OTP. Please try again.");
      setIsLoading(false);
    }
  };


  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("loginToken"); 
    window.location.reload(); // Refresh the page to apply logout state
  };

  return (
    <>
        {isOpen === null && (
          <button
            onClick={openModal}
            className="text-gray-700 font-medium hover:text-gray-900 mb-2 md:mb-0 md:ml-4">
            Login
          </button>
        )}
     

      {(isModalOpen || isOpen) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 pt-2 m-5 rounded-xl shadow-lg max-w-xl w-full relative">
            <button onClick={closeModal} className="absolute top-6 left-6 text-gray-600 hover:text-gray-900">
              <KeyboardBackspaceIcon />
            </button>

            <div className="flex justify-center mb-4">
              <img src="/images/logo/vishcart_icon.png" alt="logo" className="h-20" />
            </div>

            <button onClick={closeModal} className="absolute top-6 right-6 text-red-600 hover:text-red-800">
              <CloseIcon />
            </button>

            <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">Same Day Delivery App</h2>
            <p className="text-center font-normal mb-6">Log in or Sign up with Whatsapp</p>

            <div className="mb-4 w-full flex flex-col items-center">
              {!otpSent ? (
                <div className="flex flex-col mt-1 w-full max-w-80 relative">
                  <div className="flex mt-1 w-full max-w-80 relative">
                    <input
                      type="text"
                      className="flex-1 block w-full pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-0"
                      placeholder="Enter Whatsapp Number"
                      maxLength="10"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ""))}
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"><span className="text-green-500"><WhatsAppIcon/></span></span>
                  </div>
                  <button
                    onClick={sendOtp}
                    disabled={mobileNumber.length !== 10}
                    className={`w-full font-medium mt-4 py-3 rounded-xl ${
                      mobileNumber.length === 10 ? "bg-green-700" : "bg-gray-300"
                    } text-white`}
                  >
                    Send OTP on WhatsApp
                  </button>
                  {errorMessage && <p className="text-red-500 text-xs mt-2">{errorMessage}</p>}
                </div>
              ) : (
                <div className="flex flex-col w-full max-w-80 items-center justify-center mb-4">
                  <p className="text-green-500 text-xs mb-2">OTP sent on <span className="text-green-500"><WhatsAppIcon/></span> {mobileNumber}.</p>
                  <input
                    type="text"
                    className="flex-1 text-center block w-full px-3 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-0"
                    placeholder="Enter OTP"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    onClick={verifyOtp}
                    disabled={otp.length !== 6 || isLoading}
                    className={`w-full font-medium max-w-80 mt-4 py-3 rounded-xl ${
                      otp.length === 6 ? "bg-green-700" : "bg-gray-300"
                    } text-white`}
                  >
                    {isLoading ? "Verifying OTP..." : "Verify OTP"}
                  </button>

                  {otpVerified !== null && (
                    <div className="mt-4">
                      {otpVerified ? (
                        <div className="flex gap-2">
                          <CheckCircleIcon className="text-green-700" fontSize="large" /> OTP Verified!
                        </div>
                      ) : (
                        <CancelIcon className="text-red-500" fontSize="large" />
                      )}
                    </div>
                  )}
                  {errorMessage && <p className="text-red-500 text-xs mt-2">{errorMessage}</p>}
                  {successMessage && <p className="text-green-500 text-xs mt-2">{successMessage}</p>}
                </div>
              )}
              <p className="text-xs text-center text-gray-500 mt-4">
                By continuing, you agree to our{" "}
                <a href="/policies/terms" className="text-blue-600 hover:underline">Terms of service</a> &{" "}
                <a href="/policies/privacypolicy" className="text-blue-600 hover:underline">Privacy policy</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
