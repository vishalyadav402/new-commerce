"use client";
import AccountLayout from "@/app/components/AccountLayout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaBan } from 'react-icons/fa';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useParams } from "next/navigation";
import FormattedDate from "@/app/components/FormattedDate";
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';

const OrderDetails = () => {
  const params = useParams();
const orderId = params["order-details"];
  // Use dynamic route param like /account/orders/[order-id]
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(`https://api.therashtriya.com/api/orders/${orderId}`);
        const data = await res.json();
        setOrderDetails(data);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) return <AccountLayout><p className="text-center py-10">Loading...</p></AccountLayout>;

  if (!orderDetails) return <AccountLayout><p className="text-center py-10 text-red-500">Order not found.</p></AccountLayout>;


  return (
    <AccountLayout>
      <div className="max-w-3xl mx-auto rounded-lg">
        {/* Header */}
        <div className="flex justify-between bg-white rounded-md shadow-sm items-center border-b mb-4 p-4">
          <div>
            <h2 className="text-[0.8em] font-semibold">Order #{orderDetails.order_id}</h2>
            <p className="text-gray-700 text-[0.8em]">{orderDetails.items.length} items</p>
          </div>
          <button className="text-gray-900 border border-gray-200 px-3 py-1 text-[0.9em] rounded-xl">
            <InfoOutlinedIcon fontSize="small" /> Help
          </button>
        </div>

        {/* Delivery Status */}
        <div className="flex justify-between bg-white rounded-md shadow-sm p-4 mb-4">
        <div className="flex gap-2 items-center">
          {orderDetails.status.toLowerCase() === 'completed' && (
            <FaCheckCircle className="text-green-600" size={20} />
          )}
          {orderDetails.status.toLowerCase() === 'pending' && (
            <FaHourglassHalf className="text-yellow-500" size={20} />
          )}
          {orderDetails.status.toLowerCase() === 'failed' && (
            <FaTimesCircle className="text-red-600" size={20} />
          )}
          {orderDetails.status.toLowerCase() === 'cancelled' && (
            <FaBan className="text-gray-500" size={20} />
          )}

          <span
            className={`font-semibold text-lg capitalize ${
              orderDetails.status.toLowerCase() === 'completed'
                ? 'text-green-600'
                : orderDetails.status.toLowerCase() === 'pending'
                ? 'text-yellow-500'
                : orderDetails.status.toLowerCase() === 'failed'
                ? 'text-red-600'
                : orderDetails.status.toLowerCase() === 'cancelled'
                ? 'text-gray-500'
                : 'text-black'
            }`}
          >
            {orderDetails.status}
          </span>
        </div>
          {orderDetails.status ==="completed"&& 
          <div className="text-gray-500 text-[0.8em] flex flex-col">
            Arrived in
            <span className="bg-green-100 font-semibold text-green-600 px-1 py-1 ps-2 text-[0.9em] rounded-md uppercase">
              <FlashOnRoundedIcon fontSize="small" /> 30 mins
            </span>
          </div>}
        </div>

        {/* Items List */}
        <div className="border-t bg-white rounded-md shadow-sm p-4 mb-4">
          <h3 className="text-sm font-semibold">{orderDetails.items.length} items in Shipment</h3>
          <div className="mt-2 space-y-3">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <div className="flex gap-2">
                  <div className="h-14 w-14">
                  <Image src={"https://api.therashtriya.com"+item.ProductImage} className="rounded-md object-contain" style={{height:'60px',width:'60px'}} height={100} width={100} alt={item.ProductName} />
                  </div>
                  <div className="self-center">
                    <p className="font-medium text-[0.8em] leading-[0.8em]">{item.ProductName}</p>
                    <p className="text-gray-500 text-[0.8em]">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-[0.9em]">₹{item.subtotal}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bill Summary */}
        <div className="border-t bg-white rounded-md shadow-sm p-4 mb-4">
          <h3 className="text-xl font-semibold"><ReceiptIcon /> Bill Summary</h3>
          <div className="mt-2 text-[0.8em] space-y-1">
            <div className="flex justify-between">
              <p className="underline">Item Total & GST</p>
              <p className="font-medium">₹{orderDetails.total_amount}</p>
            </div>
            {/* <div className="flex justify-between">
              <p className="underline">Handling Charge</p>
              <p className="font-medium">₹5</p>
            </div>
            <div className="flex justify-between">
              <p className="underline">Platform Fee</p>
              <p className="font-medium">₹2</p>
            </div> */}
            <div className="flex justify-between">
              <p className="underline">Delivery Fee</p>
              <div className="flex gap-1">
                <p className="font-medium line-through text-gray-400">₹{orderDetails.deliveryfee}</p>
                {/* line-through */}
                <p className="font-medium text-green-600">₹0</p>
              </div>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4">
              <div className="flex flex-col">
                <p className="leading-none text-md">Total Bill</p>
                {/* <span className="text-[0.7em] font-normal text-gray-400">Incl. all taxes and charges</span> */}
              </div>
              <div className="flex flex-col text-right">
                <p>₹{orderDetails.total_amount}</p>
                {/* <span className="bg-green-50 text-[0.7em] px-2 text-green-700 font-semibold">SAVED ₹233.51</span> */}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="mt-3 text-[0.8em] font-semibold bg-green-100 text-green-700 py-2 px-3 rounded-md">Download Invoice</button>
          </div>
        </div>

        {/* Order Info */}
        <div className="border-t bg-white rounded-md shadow-sm p-4 mb-4 text-sm">
          <h3 className="text-md font-semibold mb-3">Order Details</h3>
          <p className="text-gray-600 text-[0.9em] leading-[0.5em]">Order ID</p>
          <p className="font-normal text-[0.9em]">#{orderDetails.order_id}</p>

          <p className="text-gray-600 mt-2 text-[0.9em] leading-[0.5em]">Delivery Address</p>
          <p className="font-normal text-[0.9em]">{orderDetails.deliveryaddress || "Not Provided"}</p>

          <p className="text-gray-600 mt-2 text-[0.9em] leading-[0.5em]">Order Placed</p>
          <p className="font-normal text-[0.9em]">
            <FormattedDate date={orderDetails.created_at} />
          </p>

          <p className="text-gray-600 mt-2 text-[0.9em] leading-[0.5em]">Order Arrived at</p>
          <p className="font-normal text-[0.9em]">
          <FormattedDate date={orderDetails.updated_at} /></p>
        </div>

        {/* <div className="bg-white p-4">
          <button className="mt-6 w-full bg-pink-500 py-2 text-white rounded-md font-semibold">
            Order Again
          </button>
        </div> */}
      </div>
    </AccountLayout>
  );
};

export default OrderDetails;
