"use client"
import AccountLayout from '@/app/components/AccountLayout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import toast from 'react-hot-toast';
import AddNewAddress from '@/app/components/Addnewaddress';
import Loader from '@/app/components/Loader';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loginToken, setLoginToken] = useState(null);
  const [DeliveryaddressOpen, setDeliveryaddressOpen] = useState(false);

  const fetchAddresses = async (token) => {
    if (!token) return;
    try {
      const response = await axios.get('https://api.therashtriya.com/user/delivery-address', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    setLoginToken(token);
    fetchAddresses(token);
  }, []);

  const handleDelete = async (id) => {
    if (!loginToken) return;
    try {
      setLoading(true);
      await axios.delete(`https://api.therashtriya.com/user/delivery-address/${id}`, {
        headers: {
          'Authorization': `Bearer ${loginToken}`
        }
      });
      setLoading(false);
      toast.success("Address deleted successfully!");
      fetchAddresses(loginToken);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Failed to delete the address. Please try again.");
    }
  };

  const handleOpen = () => setDeliveryaddressOpen(true);

  return (
    <AccountLayout>
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h3 className="text-md font-semibold">All Saved Addresses</h3>
        <button
          className="bg-pink-500 hover:bg-pink-600 text-[0.8em] text-white px-4 py-2 rounded-md"
          onClick={handleOpen}
        >
          Add New Address
        </button>
      </div>

      {addresses.length > 0 ? (
        addresses.map((address) => (
          <div
            key={address.id}
            className="flex items-start justify-between mb-3 md:p-2 rounded-md shadow-sm bg-white">
            <div className="flex items-start space-x-3">
              <PlaceIcon className="text-purple-600 self-center" />
              <div>
                <p className="font-semibold text-sm text-gray-800">{address.delivery_type}</p>
                <p className="text-gray-400 text-[0.8em]">
                  {address.receiver_name}, {address.house_no}, {address.society_name}, {address.landmark}, {new Date(address.created_at).toLocaleString()}, Phone- {address.mobile_no}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              {/* <IconButton color="gray">
                <Edit />
              </IconButton> */}
              {loading?<Loader/>:
              <IconButton color="gray" onClick={() => handleDelete(address.id)}>
                <Delete />
              </IconButton>
              }
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No saved addresses.</p>
      )}

      <AddNewAddress 
        open={DeliveryaddressOpen} 
        setOpen={setDeliveryaddressOpen} 
        handleOpen={handleOpen} 
        filladdress={false}
        onAddressSaved={() => fetchAddresses(loginToken)}
      />
    </AccountLayout>
  );
};

export default Page;
