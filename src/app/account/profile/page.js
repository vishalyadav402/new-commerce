"use client"
import AccountLayout from '@/app/components/AccountLayout';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Page = () => {
  const [msglbl, setmsgLbl] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const token = localStorage.getItem("loginToken");
    if (!token) return;

    try {
      const response = await axios.get("https://api.therashtriya.com/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      setFormData({
        name: data.name || "",
        email: data.email || "",
      });

      reset(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const [randomnumber, setRandomNumber] =  useState("");
  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    setRandomNumber(number);
  };

  const handleProfileUpdate = async (data) => {
    const token = localStorage.getItem("loginToken");
    if (!token) return;

    try {
      const response = await axios.put("https://api.therashtriya.com/api/profile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      generateRandomNumber();
      console.log("Profile updated successfully:", response.data);
      setmsgLbl("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setmsgLbl("Error updating profile!");
    }
  };

  return (
    <AccountLayout refresh={randomnumber}>
      <form onSubmit={handleSubmit(handleProfileUpdate)} className="bg-white p-6 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name *</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email Address *</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" },
            })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          <p className="text-gray-500 text-xs">We promise not to spam you</p>

          <p className="text-green-500 text-xs">{msglbl}</p>
        </div>

        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Update"}
        </button>
      </form>
    </AccountLayout>
  );
};

export default Page;
