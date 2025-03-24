import AdminLayout from '@/app/AdminLayout'
import React from 'react'

const page = () => {
  return (
    <AdminLayout>
      <div className="p-4">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-2xl font-bold">1,230</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Revenue</h2>
            <p className="text-2xl font-bold">$12,300</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Active Users</h2>
            <p className="text-2xl font-bold">320</p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Pending Issues</h2>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Placeholder for Chart 1 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Sales Overview</h3>
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <p>Chart Placeholder</p>
            </div>
          </div>

          {/* Placeholder for Chart 2 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">User Growth</h3>
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <p>Chart Placeholder</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Activity</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">2024-11-17</td>
                  <td className="border px-4 py-2">New Order Placed</td>
                  <td className="border px-4 py-2 text-green-500">Completed</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">2024-11-16</td>
                  <td className="border px-4 py-2">User Signed Up</td>
                  <td className="border px-4 py-2 text-green-500">Successful</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">2024-11-15</td>
                  <td className="border px-4 py-2">Payment Declined</td>
                  <td className="border px-4 py-2 text-red-500">Failed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

       
      </div>
    </AdminLayout>
  );
};

export default page;
