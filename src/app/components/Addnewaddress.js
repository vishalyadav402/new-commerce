"use client";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const AddNewAddress = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState({
    buildingName: "",
    floor: "",
    landmark: "",
    addressLabel: "",
    receiverName: "",
    mobileNumber: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (open) {
      const savedAddress = localStorage.getItem("savedAddress");
      if (savedAddress) {
        setFormData(JSON.parse(savedAddress));
      }
    }
  }, [open]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLabelChange = (newLabel) => {
    setFormData((prev) => ({ ...prev, addressLabel: newLabel }));
  };

  const onSubmit = async () => {
    if (!formData.buildingName || !formData.floor || !formData.receiverName || !formData.mobileNumber) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    const requestData = {
      society_name: formData.buildingName,
      house_no: formData.floor,
      landmark: formData.landmark,
      delivery_type: formData.addressLabel || "Other",
      receiver_name: formData.receiverName,
      mobile_no: formData.mobileNumber,
    };

    const LoginToken = localStorage.getItem('loginToken') || "";


    try {
      const response = await axios.post("https://api.therashtriya.com/user/delivery-address", requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LoginToken}`, // Replace with actual token
        },
      });

      console.log("Address saved successfully!", response.data);
      localStorage.setItem("savedAddress", JSON.stringify(formData));
      handleClose();
    } catch (error) {
      console.error("Error saving address:", error.response?.data || error.message);
      setErrorMessage("Failed to save address. Please try again.");
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${open ? "block" : "hidden"} bg-black bg-opacity-50`}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
        <div className="flex justify-between mb-3">
          <p className="text-xl font-semibold">Add New Address</p>
          <p className="text-lg font-semibold cursor-pointer text-red-500" onClick={handleClose}><CloseIcon /></p>
        </div>

        <input
          name="buildingName"
          placeholder="Society & Block No.*"
          className="w-full p-1.5 text-sm border rounded mb-3"
          value={formData.buildingName}
          onChange={handleInputChange}
        />

        <input
          name="floor"
          placeholder="House No. & Floor*"
          className="w-full p-1.5 text-sm border rounded mb-3"
          value={formData.floor}
          onChange={handleInputChange}
        />

        <input
          name="landmark"
          placeholder="Landmark & Area Name (Optional)"
          className="w-full p-1.5 text-sm border rounded mb-3"
          value={formData.landmark}
          onChange={handleInputChange}
        />

        <h2 className="text-xl font-semibold mt-4 mb-3">Add Address Label</h2>
        <div className="flex gap-2 mb-3">
          {["Home", "Work", "Hotel", "Other"].map((option) => (
            <button
              key={option}
              className={`px-2 py-1 border rounded text-sm ${formData.addressLabel === option ? "bg-[#14803c] text-white" : "bg-gray-50"}`}
              onClick={() => handleLabelChange(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <input
          name="receiverName"
          placeholder="Receiver Name"
          className="w-full p-1.5 text-sm border rounded mb-3"
          value={formData.receiverName}
          onChange={handleInputChange}
        />

        <input
          name="mobileNumber"
          placeholder="Mobile Number"
          className="w-full p-1.5 text-sm border rounded mb-3"
          value={formData.mobileNumber}
          onChange={handleInputChange}
        />

        {errorMessage && <p className="text-red-500 text-sm mb-3">{errorMessage}</p>}
        
        <button className="w-full p-2 bg-[#14803c] text-white rounded" onClick={onSubmit}>Save Address</button>
      </div>
    </div>
  );
};

export default AddNewAddress;
