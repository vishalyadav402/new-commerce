"use client"
import AccountLayout from "@/app/components/AccountLayout";
import Image from "next/image";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import ReceiptIcon from '@mui/icons-material/Receipt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useParams } from "next/navigation";
import FormattedDate from "@/app/components/FormattedDate";
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';

const OrderDetails = () => {
  const params = useParams();
const orderDetails = JSON.parse(decodeURIComponent(params["order-details"]));
console.log(orderDetails); // Output: 9

  return (
    <AccountLayout>
    <div className="max-w-3xl mx-auto bg-gray-100 shadow-md rounded-lg">
     
      {/* Order Header */}
      <div className="flex justify-between bg-white items-center border-b mb-2 p-4">
        <div>
          <h2 className="text-[0.8em] font-semibold">Order #0000{orderDetails.order_id}</h2>
          <p className="text-gray-700 text-[0.8em]">3 items</p>
        </div>
        <button className="text-gray-900 border border-gray-200 px-3 py-1 text-[0.9em] rounded-xl"><InfoOutlinedIcon fontSize="5px"/> Help</button>
      </div>
      
      {/* Delivery Status */}
      <div className="flex justify-between bg-white p-4 mb-2">
      <div className="text-green-600 flex gap-2 items-center">
        <FaCheckCircle size={20} />
        <span className="font-semibold text-lg text-black capitalize">{orderDetails.status}</span>
      </div>
      <div className="text-gray-500 text-[0.8em] flex flex-col">Arrived in <span className="bg-green-100 font-semibold text-green-600 px-1 py-1 ps-2 text-[0.9em] rounded-md uppercase"><FlashOnRoundedIcon fontSize="14px" color="#4FFFB0"/> 7 mins</span></div>
      </div>
      {/* Items List */}
      <div className="mt-4 border-t bg-white p-4 mb-2">
        <h3 className="text-sm font-semibold">3 items in Shipment 1</h3>
        <div className="mt-2 space-y-3">
          {[
            { name: "Luvlap Diaper (Pants, 5-8 kg)",image:'/logo.png', price: 327, qty: "1 Pack (38 Pieces)" },
            { name: "Stayfree Secure Sanitary Pads - XL",image:'/logo.png', price: 121, qty: "18 pieces - 1 Unit" },
            { name: "Toys Category Flyer",image:'/logo.png', price: 0, qty: "1 piece - 1 Unit" }
          ].map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <div className="flex gap-2">
                <Image src={item.image} height={40} width={40} className="border rounded-md" alt={item.image}/>
                <div className="self-center">
                <p className="font-medium text-[0.8em] leading-[0.8em]">{item.name}</p>
                <p className="text-gray-500 text-[0.8em]">{item.qty}</p>
                </div>
              </div>
              <p className="font-semibold text-[0.9em]">₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Summary */}
      <div className="mt-6 border-t bg-white p-4 mb-2">
        <h3 className="text-xl font-semibold"><ReceiptIcon/> Bill Summary</h3>
        <div className="mt-2 text-[0.8em] space-y-1">
          <div className="flex justify-between">
            <p className="underline">Item Total & GST</p>
            <p className="font-medium">₹{orderDetails.total_amount}</p>
          </div>
          <div className="flex justify-between">
            <p className="underline">Handling Charge</p>
            <p className="font-medium">₹5</p>
          </div>
          <div className="flex justify-between">
            <p className="underline">Platform Fee</p>
            <p className="font-medium">₹2</p>
          </div>
          <div className="flex justify-between">
            <p className="underline">Delivery Fee</p>
            <div className="flex gap-1">
            <p className="font-medium line-through text-gray-400">₹20</p>
            <p className="font-medium text-green-600">₹0</p>
            </div>
          </div>
          <div className="flex justify-between font-semibold text-lg mt-2">
            <div className="flex flex-col">
            <p className="leading-none text-md">Total Bill</p>
            <span className="text-[0.7em] font-normal text-gray-400">Incl. all taxes and charges</span>
            </div>
            <div className="flex flex-col">
            <p>₹455.95</p>
            <span className="bg-green-50 text-[0.7em] px-2 text-green-700 font-semibold">SAVED ₹233.51</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
        <button className="mt-3 text-[0.8em] font-semibold bg-green-100 text-green-700 py-2 px-3 rounded-md">Download Invoice</button>
        </div>
      </div>

      {/* Order Details */}
      <div className="mt-6 border-t bg-white p-4 mb-2 text-sm">
        <h3 className="text-md font-semibold mb-3">Order Details</h3>

        <p className="text-gray-600 text-[0.9em] leading-[0.5em]">Order ID</p>
        <p className="font-normal text-[0.9em]">#0000{orderDetails.order_id}</p>
        <p className="text-gray-600 mt-2 text-[0.9em] leading-[0.5em]">Delivery Address</p>
        <p className="font-normal text-[0.9em]">
          404B, Jyling, upwan tower, upper govind nagar, malad east, Mumbai, Maharashtra
        </p>
        <p className="text-gray-600 mt-2 text-[0.9em] leading-[0.5em]">Order Placed</p>
        <p className="font-normal text-[0.9em]"><FormattedDate date={orderDetails.created_at}/></p>
        <p className="text-gray-600 mt-2 text-[0.9em] leading-[0.5em]">Order Arrived at</p>
        <p className="font-normal text-[0.9em]">27th Mar 2024, 08:39 am</p>
      </div>

      {/* Order Again Button */}
      <div className="bg-white p-4">
        <button className="mt-6 w-full bg-pink-500 py-2 text-white rounded-md font-semibold">
          Order Again
        </button>
      </div>
    </div>
    </AccountLayout>
  );
};

export default OrderDetails;
