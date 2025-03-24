export const metadata = {
  title: "Admin Dashboard | VishCart",
  description: "Manage all admin tasks with ease.",
  keyword: "admin dashboard, admin panel, admin tools, manage categories, manage orders",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-purple-dark text-light-dark p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10">
        <h1 className="text-xl font-bold">Welcome Admin 🧐</h1>
        <button className="bg-pink-dark px-4 py-2 rounded-lg shadow-sm hover:shadow-lg">
          Logout
        </button>
      </header>

      {/* Layout Body */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="hidden md:block bg-purple-dark text-light-dark w-64 fixed top-16 left-0 h-[calc(100%-4rem)]">
          <ul className="h-full overflow-y-auto">
            <li className="py-2 pt-4 px-4 hover:bg-pink-dark">
              <a href="dashboard" className="block text-light-dark">
                Dashboard
              </a>
            </li>
            <li className="py-2 px-4 hover:bg-pink-dark">
              <a href="managecategory" className="block text-light-dark">
                Manage Category
              </a>
            </li>
          
            <li className="py-2 px-4 hover:bg-pink-dark">
              <a href="product" className="block text-light-dark">
                Products
              </a>
            </li>
            <li className="py-2 px-4 hover:bg-pink-dark">
              <a href="order" className="block text-light-dark">
                Orders
              </a>
            </li>
            <li className="py-2 px-4 hover:bg-pink-dark">
              <a href="whatsapp" className="block text-light-dark">
                Whatsapp
              </a>
            </li>
            <li className="py-2 px-4 hover:bg-pink-dark fixed bottom-5">
              <a href="" className="block text-light-dark">
              Logout
              </a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-light-dark p-4 ml-0 md:ml-64 h-[calc(100vh-4rem)] overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-purple-dark text-beige-light p-4 text-center">
        Admin Footer © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
