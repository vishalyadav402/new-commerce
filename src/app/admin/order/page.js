"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "@/app/AdminLayout";

const Page = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://api.therashtriya.com/api/orders", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsInBob25lIjoiOTUwNjI4MDk2OCIsImlhdCI6MTc0MDU5MTg3NywiZXhwIjoxNzQ1Nzc1ODc3fQ.Ymg8s063MrCY1IVN9bLnbooUaeqrHsTxZz43ybNdH1E",
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        <p className="text-pink-dark">This is for a particular user, required api for all users order</p>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="text-left">
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">User ID</th>
              <th className="border border-gray-300 px-4 py-2">Total Amount</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Payment Method</th>
              <th className="border border-gray-300 px-4 py-2">Payment Status</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-4 py-2">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td className="border border-gray-300 px-4 py-2">{order.order_id}</td>
                <td className="border border-gray-300 px-4 py-2">{order.user_id}</td>
                <td className="border border-gray-300 px-4 py-2">₹ {order.total_amount}</td>
                <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                <td className="border border-gray-300 px-4 py-2">{order.payment_method}</td>
                <td className="border border-gray-300 px-4 py-2">{order.payment_status}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(order.created_at).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(order.updated_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Page;