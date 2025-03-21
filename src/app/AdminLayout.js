export const metadata = {
  title: "Admin Dashboard | VishCart",
  description: "Manage all admin tasks with ease.",
  keyword: "admin dashboard, admin panel, admin tools, manage categories, manage orders",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10">
        <h1 className="text-xl font-bold">Welcome Admin 🧐</h1>
        <button className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600">
          Logout
        </button>
      </header>

      {/* Layout Body */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="hidden md:block bg-gray-900 text-gray-300 w-64 fixed top-16 left-0 h-[calc(100%-4rem)]">
          <ul className="h-full overflow-y-auto">
            <li className="py-2 pt-4 px-4 hover:bg-gray-700">
              <a href="dashboard" className="block text-white">
                Dashboard
              </a>
            </li>
            <li className="py-2 px-4 hover:bg-gray-700">
              <a href="managecategory" className="block text-white">
                Manage Category
              </a>
            </li>
          
            <li className="py-2 px-4 hover:bg-gray-700">
              <a href="product" className="block text-white">
                Products
              </a>
            </li>
            <li className="py-2 px-4 hover:bg-gray-700">
              <a href="order" className="block text-white">
                Orders
              </a>
            </li>
            <li className="py-2 px-4 hover:bg-gray-700">
              <a href="whatsapp" className="block text-white">
                Whatsapp
              </a>
            </li>
            <li className="py-2 px-4 hover:bg-gray-700 fixed bottom-5">
              <a href="" className="block text-white">
              Logout
              </a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-4 ml-0 md:ml-64 h-[calc(100vh-4rem)] overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 p-4 text-center">
        Admin Footer © 2024
      </footer>
    </div>
  );
}
