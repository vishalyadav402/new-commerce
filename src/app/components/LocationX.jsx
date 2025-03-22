"use client";

import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const LocationX = ({ isOpen, setIsOpen }) => {

  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLocation = localStorage.getItem("delivery-location");
      if (storedLocation) {
        setSelectedLocation(storedLocation);
      }
    }
  }, []); // Empty dependency array ensures it runs only once  
  

  const handleOpenModal = () => setIsOpen(true);
  
  const handleCloseModal = () =>
  {
    if (localStorage.getItem("delivery-location")) {
      setIsOpen(false);
    } 
  }

  const locations = [
    "Near PowerHouse",
    "Near Raipur Road",
    "Near Dhakwa Mod",
    "Near ByPass Road",
    "Near Chowk",
    "Near SBI Bank",
    "Near PNB Bank",
    "Near Reliance Trends",
    "Near Hero Agency",
    "Near Avadh Restaurant",
    "Near Bajaj Agency",
    "Near Swaraj Agency",
    "Near Mahindra Agency",
  ];

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    localStorage.setItem("delivery-location", location);
    handleCloseModal();
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "black",
              borderRadius: "2px",
            }}
          >
            <button className="text-left flex gap-2" onClick={handleOpenModal}>
                  <div className="justify-center">
                    <p className="text-md font-normal text-gray-600"><span className="text-green-600 text-md font-semibold">Delivery in 30 Minutes</span></p>
                    <div className="flex">
                      <p className="text-sm font-semibold">{selectedLocation}</p>
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
                width: { xs: "95%", sm: "70%", md: "60%", lg: "50%", xl: "40%" }, // Responsive width
                bgcolor: "background.paper",
                boxShadow: 24,
                // p: 2,
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
                <div className="flex justify-between p-3 bg-cyan-50 rounded-md">
                  <div>
                    <p className="font-bold md:text-3xl text-2xl">Where should we deliver?</p>
                    <p className="font-light my-2">Provide your location to serve you better</p>
                  </div>
                  <ClearIcon onClick={handleCloseModal} style={{ cursor: "pointer",color:'red' }} />
                </div>


                <div className="grid grid-cols-3 p-2 md:grid-cols-4 gap-2 mt-2">
                  {locations.map((location, index) => (
                    <button
                      key={index}
                      className={`text-xs border-2 border-dashed rounded-md border-cyan-100 text-gray-700 font-semibold px-1 py-1 h-10 self-center text-ellipsis overflow-hidden line-clamp-2 hover:bg-cyan-100 hover:text-gray-900 ${
                        location === selectedLocation ? "bg-green-700 border-green-700 text-green-100" : ""
                      }`}
                      onClick={() => handleLocationClick(location)}
                    >
                      {location}
                    </button>
                  ))}
                </div>

                <div className="text-center my-3 py-2">
                  <h2 className="text-yellow-700 text-2xl font-semibold">
                    अब घर बैठे किराना का सामान मंगवाएं!📱
                  </h2>
                  {/* <h3 className="font-medium text-green-700">
                    डिलीवरी सेवा केवल पट्टी-टाउन 230135 (प्रतापगढ़) में उपलब्ध है🙏
                  </h3> */}
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
