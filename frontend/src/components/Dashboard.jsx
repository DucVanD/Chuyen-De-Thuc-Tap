import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-gray-100">
        <div className="flex">
          {/* Sidebar */}
          <aside
            className={`fixed sm:static top-0 left-0 h-full sm:h-auto z-50 bg-gray-800 text-gray-200 px-4 py-6 space-y-6 transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0 transition-transform duration-300 ease-in-out w-64 sm:basis-2/12`}
          >
            {/* Close btn (mobile) */}
            <div className="flex justify-between items-center sm:hidden">
              <h2 className="text-xl font-bold text-indigo-400">Admin Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-3 mt-4 sm:mt-0 overflow-y-auto max-h-[80vh]">
              {/* Dashboard */}
              <Link
                to="/admin/dashboard"
                className="flex items-center text-[15px] px-4 py-2.5 rounded-md hover:bg-gray-700 font-medium transition duration-200"
              >
                <i className="fas fa-tachometer-alt mr-3 text-indigo-400"></i>
                Bảng điều khiển
              </Link>

              {/* Quản lý sản phẩm */}
              <div className="mt-6">
                <p className="text-[14px] font-semibold px-4 text-gray-400 uppercase tracking-wider mb-2">
                  Quản lý sản phẩm
                </p>
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="products"
                      className="flex items-center text-[15px] px-4 py-2.5 rounded-md hover:bg-gray-700 font-medium"
                    >
                      <i className="fas fa-box mr-3 text-indigo-400"></i>
                      Sản phẩm
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="categories"
                      className="flex items-center text-[15px] px-4 py-2.5 rounded-md hover:bg-gray-700 font-medium"
                    >
                      <i className="fas fa-tags mr-3 text-indigo-400"></i>
                      Danh mục
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="brands"
                      className="flex items-center text-[15px] px-4 py-2.5 rounded-md hover:bg-gray-700 font-medium"
                    >
                      <i className="fas fa-copyright mr-3 text-indigo-400"></i>
                      Thương hiệu
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Quản lý bài viết */}
              <div className="mt-6">
                <p className="text-[14px] font-semibold px-4 text-gray-400 uppercase tracking-wider mb-2">
                  Quản lý bài viết
                </p>
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/admin/posts"
                      className="flex items-center text-[15px] px-4 py-2.5 rounded-md hover:bg-gray-700 font-medium"
                    >
                      <i className="fas fa-newspaper mr-3 text-indigo-400"></i>
                      Bài viết
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/topics"
                      className="flex items-center text-[15px] px-4 py-2.5 rounded-md hover:bg-gray-700 font-medium"
                    >
                      <i className="fas fa-bookmark mr-3 text-indigo-400"></i>
                      Chủ đề
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Giao diện */}
              <div className="mt-6">
                <p className="text-[14px] font-semibold px-4 text-gray-400 uppercase tracking-wider mb-2">
                  Giao diện
                </p>
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/admin/menus"
                      className="flex items-center text-[15px] px-4 py-2.5 rounded-md hover:bg-gray-700 font-medium"
                    >
                      <i className="fas fa-bars mr-3 text-indigo-400"></i> Menu
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/banners"
                      className="flex items-center text-[15px] px-4 py-2.5 rounded-md hover:bg-gray-700 font-medium"
                    >
                      <i className="fas fa-images mr-3 text-indigo-400"></i>
                      Banner
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Quản lý khác */}
              <div className="mt-6 pb-12">
                <p className="text-[14px] font-semibold px-4 text-gray-400 uppercase tracking-wider mb-2">
                  Quản lý khác
                </p>
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/admin/contacts"
                      className="flex items-center text-[15px] px-4 py-2.5 rounded-md hover:bg-gray-700 font-medium"
                    >
                      <i className="fas fa-envelope mr-3 text-indigo-400"></i>
                      Liên hệ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/customers"
                      className="flex items-center text-[15px] px-4 py-2.5 rounded-md hover:bg-gray-700 font-medium"
                    >
                      <i className="fas fa-users mr-3 text-indigo-400"></i>
                      Khách hàng
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/orders"
                      className="flex items-center text-[15px] px-4 py-2.5 rounded-md hover:bg-gray-700 font-medium"
                    >
                      <i className="fas fa-shopping-cart mr-3 text-indigo-400"></i>
                      Đơn hàng
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/users"
                      className="flex items-center text-[15px] px-4 py-2.5 rounded-md hover:bg-gray-700 font-medium"
                    >
                      <i className="fas fa-user-shield mr-3 text-indigo-400"></i>
                      Thành viên
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </aside>

          {/* Nội dung */}
          <section className="flex-1 min-h-screen bg-gray-100 p-3 sm:ml-0">
            {/* Nút mở sidebar (mobile) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="sm:hidden mb-4 bg-gray-800 text-white px-3 py-2 rounded-md flex items-center"
            >
              <FaBars className="mr-2" /> Menu
            </button>

            <Outlet />
          </section>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
