"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react'

const Whatsapp = () => {
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await fetch("https://apiv2.adamyasansthan.org/qr");
        const data = await response.json();
        setQrCode(data.qr);
      } catch (error) {
        console.error("Error fetching QR code:", error);
      }
    };

    fetchQRCode(); // Fetch initially
    const interval = setInterval(fetchQRCode, 1000); // Fetch every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      {qrCode ? <Image height={400} width={400} src={qrCode} alt="QR Code" /> : <p>Loading...</p>}
    </div>
  );
};

export default Whatsapp;
    