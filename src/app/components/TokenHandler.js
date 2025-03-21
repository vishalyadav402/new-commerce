import { useState, useEffect } from "react";

const TokenHandler = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("loginToken");
    if (storedToken) {
      alert("Token is available");
    } else {
      alert("No token found");
    }
  }, []);

  const storeToken = () => {
    const newToken = "sample_token_12345"; // Replace with actual token
    localStorage.setItem("loginToken", newToken);
    setToken(newToken);
    alert("Token stored successfully");
  };

  const checkToken = () => {
    const storedToken = localStorage.getItem("loginToken");
    if (storedToken) {
      alert("Token exists: " + storedToken);
    } else {
      alert("No token found");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <button onClick={storeToken} className="bg-blue-500 text-white px-4 py-2 rounded">
        Store Token
      </button>
      <button onClick={checkToken} className="bg-green-500 text-white px-4 py-2 rounded">
        Check Token
      </button>
    </div>
  );
};

export default TokenHandler;
