import React from "react";
import AdminLayout from "@/app/AdminLayout";


const Page = () => {
  const inventoryItems = [
    { id: 1, name: "Milk", stock: 3 },
    { id: 2, name: "Eggs", stock: 5 },
    { id: 3, name: "Bread", stock: 2 },
  ];

  const newOrders = [
    { id: 101, customer: "John Doe" },
    { id: 102, customer: "Jane Smith" },
    { id: 103, customer: "Emily Johnson" },
  ];

  const expiringProducts = [
    { id: 201, name: "Yogurt", expiry: "2024-10-05" },
    { id: 202, name: "Cheese", expiry: "2024-10-10" },
    { id: 203, name: "Butter", expiry: "2024-10-15" },
  ];

  const topSellingProducts = [
    { id: 301, name: "Bananas", sales: 150 },
    { id: 302, name: "Tomatoes", sales: 120 },
    { id: 303, name: "Apples", sales: 100 },
  ];

  const supplierStatus = [
    { id: 401, name: "Fresh Farms", status: "Pending" },
    { id: 402, name: "Green Suppliers", status: "Delivered" },
    { id: 403, name: "Organic Hub", status: "In Transit" },
  ];

  const customerFeedback = [
    { id: 501, customer: "John Doe", rating: 4, comment: "Great service!" },
    { id: 502, customer: "Jane Smith", rating: 5, comment: "Love the quality!" },
  ];

  const revenueSummary = {
    totalRevenue: "$12,300",
    profit: "$3,200",
    expenses: "$9,100",
  };

  const deliveryStatus = [
    { id: 601, orderId: 101, status: "Out for Delivery" },
    { id: 602, orderId: 102, status: "Delivered" },
    { id: 603, orderId: 103, status: "Pending" },
  ];

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InventoryWarning items={inventoryItems} />
          <NewOrders orders={newOrders} />
          <ExpiringProducts products={expiringProducts} />
          <TopSellingProducts products={topSellingProducts} />
          <SupplierStatus suppliers={supplierStatus} />
          <CustomerFeedback feedback={customerFeedback} />
          <RevenueSummary data={revenueSummary} />
          <DeliveryStatus deliveries={deliveryStatus} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Page;



const InventoryWarning = ({ items }) => {
  return (
    <div className="bg-red-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-red-600">Inventory Shortage</h3>
      <ul className="mt-2">
        {items.map((item) => (
          <li key={item.id} className="text-sm">
            {item.name} - <span className="font-bold text-red-500">{item.stock} left</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const NewOrders = ({ orders }) => {
  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-blue-600">New Orders Arrived</h3>
      <ul className="mt-2">
        {orders.map((order) => (
          <li key={order.id} className="text-sm">
            Order #{order.id} - <span className="font-bold">{order.customer}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ExpiringProducts = ({ products }) => {
  return (
    <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-yellow-600">Expiring Soon</h3>
      <ul className="mt-2">
        {products.map((product) => (
          <li key={product.id} className="text-sm">
            {product.name} - <span className="font-bold text-yellow-500">Exp: {product.expiry}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TopSellingProducts = ({ products }) => {
  return (
    <div className="bg-green-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-green-600">Top Selling Products</h3>
      <ul className="mt-2">
        {products.map((product) => (
          <li key={product.id} className="text-sm">
            {product.name} - <span className="font-bold">{product.sales} sold</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SupplierStatus = ({ suppliers }) => {
  return (
    <div className="bg-purple-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-purple-600">Supplier Status</h3>
      <ul className="mt-2">
        {suppliers.map((supplier) => (
          <li key={supplier.id} className="text-sm">
            {supplier.name} - <span className="font-bold">{supplier.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};


export const CustomerFeedback = ({ feedback }) => (
  <div className="bg-teal-100 p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-teal-600">Customer Feedback</h3>
    <ul className="mt-2">
      {feedback.map((fb) => (
        <li key={fb.id} className="text-sm">
          {fb.customer}: <span className="font-bold">{fb.rating}★</span> - "{fb.comment}"
        </li>
      ))}
    </ul>
  </div>
);

export const RevenueSummary = ({ data }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-600">Revenue Summary</h3>
    <p className="text-sm mt-2">Total Revenue: <span className="font-bold">{data.totalRevenue}</span></p>
    <p className="text-sm">Profit: <span className="font-bold text-green-600">{data.profit}</span></p>
    <p className="text-sm">Expenses: <span className="font-bold text-red-600">{data.expenses}</span></p>
  </div>
);

export const DeliveryStatus = ({ deliveries }) => (
  <div className="bg-orange-100 p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-orange-600">Delivery Status</h3>
    <ul className="mt-2">
      {deliveries.map((delivery) => (
        <li key={delivery.id} className="text-sm">
          Order #{delivery.orderId} - <span className="font-bold">{delivery.status}</span>
        </li>
      ))}
    </ul>
  </div>
);