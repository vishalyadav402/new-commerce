"use client"
import { useEffect, useState } from "react";

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true); // Show the install button
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    setDeferredPrompt(null);
    setIsVisible(false); // Hide the button after install attempt
  };

  return (
    isVisible && (
      <button
        onClick={handleInstall}
        className="fixed top-32 right-5 bg-purple-dark text-white px-4 py-2 rounded-md shadow-lg hover:bg-pink-dark"
      >
        Install App
      </button>
    )
  );
};

export default InstallPWA;
