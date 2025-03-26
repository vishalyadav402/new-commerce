"use client"
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, Typography } from "@mui/material";

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      
      // Check if the user has already skipped
      if (localStorage.getItem("pwaInstallSkipped") === "true") return;

      setDeferredPrompt(e);
      setIsOpen(true); // Show modal
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
    setIsOpen(false);
  };

  const handleSkip = () => {
    localStorage.setItem("pwaInstallSkipped", "true"); // Save preference
    setIsOpen(false);
  };

  return (
    <Modal open={isOpen} onClose={handleSkip}>
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "#eee1f2",
          p: 4,
          border:"1px solid #69247C",
          borderRadius: 2,
        //   boxShadow: 24,
          textAlign: "center",
        }}
        className={{}}
      >
        <p className="mb-3 text-2xl text-purple-dark font-semibold">
          Install vegacart light
        </p>
        <Typography variant="body2" mb={2}>
          Get a better experience by installing our vegacart light app on your device.
        </Typography>
        <div className="flex gap-2 justify-center">
        <button className="bg-pink-dark px-4 py-1 rounded-md shadow-lg text-beige-light" onClick={handleInstall} sx={{ mr: 1 }}>
          Install
        </button>
        <button className="border border-pink-dark px-4 py-1 rounded-md shadow-lg text-pink-dark" onClick={handleSkip}>
          Skip
        </button>
        </div>
      </Box>
    </Modal>
  );
};

export default InstallPWA;
