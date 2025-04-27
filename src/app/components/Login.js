"use client";
import React, { useState, useEffect, useRef } from "react";
import 'tailwindcss/tailwind.css';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Image from "next/image";

const Login = ({ isOpen = null, onClose = null }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Resend OTP Timer State
  const [timer, setTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);

  const mobileInputRef = useRef(null);
  const otpInputsRef = useRef([]);

  useEffect(() => {
    if (isOpen !== null) {
      setIsModalOpen(isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    if (otpSent) {
      setTimeout(() => otpInputsRef.current[0]?.focus(), 100);
      startTimer();
    } else {
      setTimeout(() => mobileInputRef.current?.focus(), 100);
    }
  }, [otpSent]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && otpSent) {
      setCanResendOtp(true);
    }
    return () => clearInterval(interval);
  }, [timer, otpSent]);

  const startTimer = () => {
    setTimer(60);
    setCanResendOtp(false);
  };

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
    setTimer(0);
    setCanResendOtp(false);
  };

  const sendOtp = async () => {
    if (mobileNumber.length === 10) {
      try {
        setIsLoading(true);
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
          setIsLoading(false);
          startTimer();
        } else {
          setIsLoading(false);
          setErrorMessage(data.message || "Failed to send OTP. Please try again.");
        }
      } catch (error) {
        setIsLoading(false);
        setErrorMessage("Network error. Please try again.");
      }
    } else {
      setIsLoading(false);
      setErrorMessage("Please enter a valid Whatsapp Number.");
    }
  };

  const resendOtp = async () => {
    if (canResendOtp && mobileNumber.length === 10) {
      sendOtp();
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    if (otp.length === 6) {
      try {
        const response = await fetch("https://api.therashtriya.com/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: mobileNumber, otp: otp }),
        });

        const data = await response.json();
        if (response.ok) {
          setOtpVerified(null);
          setErrorMessage("");

          setTimeout(() => {
            const newToken = data.token;
            localStorage.setItem("loginToken", newToken);

            setOtpVerified(true);
            setSuccessMessage("You are logged in successfully!");
            setIsLoading(false);
            setTimeout(() => closeModal(), 3000);
          }, 3000);
        } else {
          setIsLoading(false);
          setErrorMessage(data.message || "Failed to verify OTP. Please try again.");
        }
      } catch (error) {
        setIsLoading(false);
        setErrorMessage("Network error. Please try again.");
      }
    } else {
      setOtpVerified(false);
      setErrorMessage("Incorrect OTP. Please try again.");
      setIsLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const otpArray = otp.split('');
    otpArray[index] = value;
    const updatedOtp = otpArray.join('').padEnd(6, '');
    setOtp(updatedOtp);

    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const otpArray = otp.split('');
      otpArray[index - 1] = '';
      setOtp(otpArray.join('').padEnd(6, ''));
      otpInputsRef.current[index - 1]?.focus();
    }
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
          <div className="bg-gradient-to-b from-purple-100 to-white p-8 pt-2 m-5 rounded-xl shadow-lg max-w-xl w-full relative">
            <button onClick={closeModal} className="absolute top-6 left-6 text-gray-600 hover:text-gray-900">
              <KeyboardBackspaceIcon />
            </button>

            <div className="flex justify-center mb-4">
              <Image src="/icon.png" height={80} width={80} className="text-gray-700" alt="logo" />
            </div>

            <button onClick={closeModal} className="absolute top-6 right-6 text-pink-dark hover:text-purple-dark">
              <CloseIcon />
            </button>

            <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">Same Day Delivery App</h2>
            <p className="text-center font-normal mb-6">Log in or Sign up with Whatsapp</p>

            <div className="mb-4 w-full flex flex-col items-center">
              {!otpSent ? (
                <div className="flex flex-col mt-1 w-full max-w-80 relative">
                  <div className="flex mt-1 w-full max-w-80 relative">
                    <input
                      ref={mobileInputRef}
                      type="text"
                      className="flex-1 block w-full pl-14 pr-3 py-3 placeholder:text-base placeholder:tracking-wide text-xl tracking-widest bg-white border border-purple-300 rounded-xl focus:outline-none focus:ring-0"
                      placeholder="Enter Whatsapp Number"
                      maxLength="10"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ""))}
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <WhatsAppIcon className="text-green-500 h-8 w-8" />
                    </span>
                  </div>
                  <button
                    onClick={sendOtp}
                    disabled={mobileNumber.length !== 10}
                    className={`w-full font-medium mt-4 py-3 rounded-xl ${
                      mobileNumber.length === 10 ? "bg-green-700" : "bg-gray-300"
                    } text-white`}
                  >
                    {isLoading ? "Sending OTP.." : "Send OTP on WhatsApp"}
                  </button>
                  {errorMessage && <p className="text-red-500 text-xs mt-2">{errorMessage}</p>}
                </div>
              ) : (
                <div className="flex flex-col w-full max-w-80 items-center justify-center mb-4">
                  <p className="text-green-500 text-md mb-2">
                    <WhatsAppIcon /> OTP sent on {mobileNumber}.
                  </p>

                  <div className="flex justify-center gap-2 mt-2">
                    {[...Array(6)].map((_, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpInputsRef.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={otp[index] || ""}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        className="w-12 h-12 text-center border border-purple-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    ))}
                  </div>

                  <button
                    onClick={verifyOtp}
                    disabled={otp.length !== 6 || isLoading}
                    className={`w-full font-medium max-w-80 mt-4 py-3 rounded-xl ${
                      otp.length === 6 ? "bg-green-700" : "bg-gray-300"
                    } text-white`}
                  >
                    {isLoading ? "Verifying OTP..." : "Verify OTP"}
                  </button>

                  {timer > 0 ? (
                    <p className="text-xs text-gray-500 mt-2">Resend OTP in {timer} sec</p>
                  ) : (
                    <button
                      onClick={resendOtp}
                      className="text-sm mt-2 text-blue-600 hover:underline focus:outline-none"
                    >
                      Resend OTP ?
                    </button>
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
