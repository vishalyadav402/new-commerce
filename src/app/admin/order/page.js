"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "@/app/AdminLayout";
import { TextField, Button } from "@mui/material";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchOrders();
    setDefaultDateRange("today");
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://api.therashtriya.com/api/orders", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsInBob25lIjoiOTUwNjI4MDk2OCIsImlhdCI6MTc0MDU5MTg3NywiZXhwIjoxNzQ1Nzc1ODc3fQ.Ymg8s063MrCY1IVN9bLnbooUaeqrHsTxZz43ybNdH1E`,
        },
      });
      console.log("API Response:", response.data);
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
    }
  };

  const setDefaultDateRange = (range) => {
    const today = new Date();
    let start = new Date();
    let end = new Date();

    if (range === "lastWeek") {
      start.setDate(today.getDate() - 7);
    } else if (range === "lastMonth") {
      start.setMonth(today.getMonth() - 1);
    }

    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  };

  const filterByDate = () => {
    if (!startDate || !endDate) return;
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.created_at);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });
    setFilteredOrders(filtered);
  };

  const sortData = (column) => {
    const newOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...filteredOrders].sort((a, b) => {
      return newOrder === "asc" ? (a[column] > b[column] ? 1 : -1) : a[column] < b[column] ? 1 : -1;
    });
    setFilteredOrders(sorted);
    setSortColumn(column);
    setSortOrder(newOrder);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
  
    // Add title
    doc.setFontSize(16);
    doc.text("Vegacart Order List", doc.internal.pageSize.getWidth() / 2, 15, { align: "center" });
  
    // Add date range below the title
    if (startDate && endDate) {
      doc.setFontSize(12);
      doc.text(`Date Range: ${startDate} to ${endDate}`, doc.internal.pageSize.getWidth() / 2, 25, { align: "center" });
    }
  
    // Add table with customized header styles
    autoTable(doc, {
      startY: 30, // Push the table down to avoid overlapping the title
      head: [["Order ID", "User ID", "Total Amount", "Status", "Payment Method", "Payment Status", "Created At"]],
      body: filteredOrders.map(order => [
        order.order_id,
        order.user_id,
        `${Number(order.total_amount)}`, // Corrected format
        order.status,
        order.payment_method,
        order.payment_status,
        new Date(order.created_at).toLocaleString(),
      ]),
      styles: { fontSize: 10 }, // Default font size for table
      headStyles: {
        fillColor: [105, 36, 124], // #69247C (Purple header background)
        textColor: [249, 230, 207], // #F9E6CF (Beige text color)
        fontSize: 10,
        fontStyle: "bold",
      },
    });
  
    doc.save("VegaCart-Orders.pdf");
  };
  
  
  

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredOrders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    XLSX.writeFile(wb, "orders.xlsx");
  };

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 px-2 md:px-0">Orders</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 p-2 md:px-0 mb-4 items-center">
  <input 
    type="date" 
    value={startDate} 
    onChange={(e) => setStartDate(e.target.value)} 
    className="w-1/4 text-sm border border-gray-300 rounded p-1"
  />
  <input 
    type="date" 
    value={endDate} 
    onChange={(e) => setEndDate(e.target.value)} 
    className="w-1/4 text-sm border border-gray-300 rounded p-1"
  />
  <button 
    onClick={filterByDate} 
    className="bg-purple-dark text-beige-dark px-3 py-1 rounded text-sm"
  >
    Filter
  </button>
  <button 
    onClick={() => setDefaultDateRange("today")} 
    className="border border-purple-dark text-purple px-3 py-1 rounded text-sm"
  >
    Today
  </button>
  <button 
    onClick={() => setDefaultDateRange("lastWeek")} 
    className="border border-purple-dark text-purple px-3 py-1 rounded text-sm"
  >
    Last Week
  </button>
  <button 
    onClick={() => setDefaultDateRange("lastMonth")} 
    className="border border-purple-dark text-purple px-3 py-1 rounded text-sm"
  >
    Last Month
  </button>
  <button 
    onClick={exportToPDF} 
    className="bg-purple-dark text-beige-dark px-3 py-1 rounded text-sm"
  >
    Export PDF
  </button>
  <button 
    onClick={exportToExcel} 
    className="bg-purple-dark text-beige-dark px-3 py-1 rounded text-sm"
  >
    Export Excel
  </button>
        </div>


        {/* Table */}
        <TableContainer className="border border-gray-300 rounded-lg">
          <Table>
            <TableHead className="bg-gray-100">
              <TableRow>
                {["order_id", "user_id", "total_amount", "status", "payment_method", "payment_status", "created_at"].map(
                  (col) => (
                    <TableCell key={col} className="cursor-pointer font-bold" onClick={() => sortData(col)}>
                      {col.replace("_", " ").toUpperCase()} {sortColumn === col ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.user_id}</TableCell>
                  <TableCell>₹ {order.total_amount}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.payment_method}</TableCell>
                  <TableCell>{order.payment_status}</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </AdminLayout>
  );
};

export default Page;
