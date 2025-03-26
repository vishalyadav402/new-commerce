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
      <>
      {/* <button
        onClick={handleInstall}
        className="fixed top-32 right-5 bg-purple-dark text-white px-4 py-2 rounded-md shadow-lg hover:bg-pink-dark"
      >
        Install App
      </button> */}
       <div className="fixed top-32 right-5 transform -translate-x-1/2 -translate-y-1/2 w-[350px] bg-[#eee1f2] p-4 border border-[#69247C] rounded-md text-center">
        <p className="mb-3 text-2xl text-purple-dark font-semibold">
          Install VegaCart Light
        </p>
        <p className="mb-2">
          Get a better experience by installing our VegaCart Light app on your device.
        </p>
        <div className="flex gap-2 justify-center">
          <button
            className="bg-pink-dark px-4 py-1 rounded-md shadow-lg text-beige-light"
            onClick={handleInstall}
          >
            Install
          </button>
          <button
            className="border border-pink-dark px-4 py-1 rounded-md shadow-lg text-pink-dark"
            onClick={setIsVisible(false)}
          >
            Skip
          </button>
        </div>
      </div>
      </>
    )
  );
};

export default InstallPWA;
