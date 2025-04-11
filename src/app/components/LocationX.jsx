"use client";

import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const LocationX = ({ isOpen, setIsOpen }) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [pincodeInput, setPincodeInput] = useState("");
  const [availableLocations, setAvailableLocations] = useState([]);

  const pincodeLocations = {
    "225001": ["Nawabganj, Barabanki", "Near Chowk", "Near Avadh Restaurant"],
    "230134": ["Near Raipur Road", "Near PNB Bank"],
    "230135": ["Near Dhakwa Mod", "Near Reliance Trends"],
    "222004": ["Near ByPass Road", "Near SBI Bank"],
    "222005": ["Near Hero Agency", "Near Bajaj Agency"],
    "222006": ["Near Swaraj Agency", "Near Mahindra Agency"],
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLocation = localStorage.getItem("delivery-location");
      if (storedLocation) {
        setSelectedLocation(storedLocation);
      }
    }
  }, []);

  const handleOpenModal = () => setIsOpen(true);

  const handleCloseModal = () => {
    if (localStorage.getItem("delivery-location")) {
      setIsOpen(false);
    }
  };

  const handlePincodeChange = (e) => {
    const pin = e.target.value;
    setPincodeInput(pin);
    if (pincodeLocations[pin]) {
      setAvailableLocations(pincodeLocations[pin]);
    } else {
      setAvailableLocations([]);
    }
  };

  const handleLocationClick = (fullLocation) => {
    setSelectedLocation(fullLocation);
    localStorage.setItem("delivery-location", fullLocation);
    handleCloseModal();
  };

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=3406c1f5810e43938ae277ffd3c961b6`
          );
          const data = await res.json();

          const detectedPincode = data?.features?.[0]?.properties?.postcode;

          if (detectedPincode) {
            setPincodeInput(detectedPincode);
            if (pincodeLocations[detectedPincode]) {
              setAvailableLocations(pincodeLocations[detectedPincode]);
            } else {
              setAvailableLocations([]);
            }
          } else {
            alert("Could not detect pincode from your location.");
          }
        } catch (error) {
          console.error("Geoapify error:", error);
          alert("Something went wrong while detecting your location.");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to detect your location.");
      }
    );
  };

  return (
    <div id="divLocation">
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0px",
            borderRadius: "2px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", color: "black" }}>
            <button className="text-left flex gap-2" onClick={handleOpenModal}>
              <div className="justify-center">
                <p className="text-lg text-gray-900 font-bold">
                  Delivery in{" "}
                  <span className="text-pink-dark text-md font-bold">30 Mins</span>
                </p>
                <div className="flex">
                  <p className="text-sm font-semibold">
                    {selectedLocation || "222001, Jaunpur"}
                  </p>
                  <ArrowDropDownIcon />
                </div>
              </div>
            </button>

            <Modal open={isOpen} onClose={handleCloseModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { xs: "95%", sm: "70%", md: "60%", lg: "50%", xl: "40%" },
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <div className="flex justify-between p-3 bg-gradient-to-b from-purple-100 to-white rounded-md">
                  <div>
                    <p className="font-bold md:text-3xl text-2xl">Where should we deliver?</p>
                    <p className="font-light my-2">Provide your pincode to serve you better</p>
                  </div>
                  <ClearIcon onClick={handleCloseModal} className="text-pink-dark cursor-pointer" />
                </div>
                <div className="flex justify-start mt-2 px-4">
                    <button
                      onClick={detectLocation}
                      className="text-sm text-purple-600 hover:text-purple-800"
                    >
                      📍 Detect My Location
                    </button>
                  </div>
                <div className="px-4 pt-2">
                  <input
                    type="text"
                    placeholder="Enter your pincode"
                    value={pincodeInput}
                    onChange={handlePincodeChange}
                    maxLength={6}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />

                  
                </div>
               <div className="px-2">
                {availableLocations.length > 0 && (
                  <div className="grid grid-cols-3 p-2 md:grid-cols-4 gap-2 mt-4">
                    {availableLocations.map((loc, index) => {
                      const fullLocation = `${loc}, ${pincodeInput}`;
                      return (
                        <button
                          key={index}
                          onClick={() => handleLocationClick(fullLocation)}
                          className={`text-xs border rounded-md border-purple-300 text-black font-normal px-1 py-1 h-12 self-center hover:bg-purple-dark hover:text-white ${
                            fullLocation === selectedLocation ? "bg-purple-dark text-white" : ""
                          }`}
                        >
                          <span className="block font-semibold leading-none">{loc}</span>
                          <span className="block text-[11px]">{pincodeInput}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
                </div>

                {pincodeInput.length === 6 && availableLocations.length === 0 && (
                  <div className="text-center text-red-500 mt-4">
                    No locations found for this pincode.
                  </div>
                )}

                <div className="text-center my-3 py-2">
                  <h2 className="text-pink-dark text-2xl font-semibold">
                    अब घर बैठे किराना का सामान मंगवाएं!📱
                  </h2>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationX;
