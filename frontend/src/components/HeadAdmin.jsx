import { FaSearch, FaBell, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import apiAdmin from "../api/apiAdmin";

const HeaderAdmin = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  // ✅ Lấy thông tin admin từ localStorage
  useEffect(() => {
    const userData = localStorage.getItem("adminUser");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.roles !== "admin") {
        toast.error("⚠️ Bạn không có quyền truy cập Admin!");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        navigate("/admin/login");
      } else {
        setAdmin(user);
      }
    }
  }, []);


  // 🔒 Đăng xuất
  const handleLogout = async () => {
    try {
      await apiAdmin.logout();
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      toast.success("Đăng xuất thành công!");
      navigate("/admin/login");
    } catch (error) {
      toast.error("Lỗi khi đăng xuất!");
      console.error(error);
    }
  };

  return (
    <header className="bg-white shadow-sm w-full">
      <div className="flex flex-col sm:flex-row">
        {/* Logo */}
        <div className="bg-indigo-800 py-4 sm:py-6 flex justify-center items-center sm:basis-2/12">
          <h1 className="uppercase text-white text-xl sm:text-2xl font-bold tracking-wider">
            MiniMart
            <span className="hidden sm:inline"> Admin</span>
          </h1>
        </div>

        {/* Header Right */}
        <div className="flex-1 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          {/* Thanh tìm kiếm */}
          <div className="hidden md:block w-1/3 relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 text-sm"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
          </div>

          {/* Avatar + tên + logout */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            <button className="relative">
              <FaBell className="w-6 h-6 text-gray-600 hover:text-indigo-600" />
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Hiển thị avatar + tên admin */}
            <div className="flex items-center space-x-2">
              <img
                src={
                  admin?.avatar
                    ? `/assets/images/avatar/${admin.avatar}`
                    : "/assets/images/avatar/admin-avatar.png"
                }
                alt="Admin"
                className="w-8 h-8 rounded-full border-2 border-indigo-200"
              />
              <span className="hidden sm:inline text-gray-700 font-medium">
                {admin?.name || "Admin"}
              </span>
            </div>

            {/* Nút đăng xuất */}
            <button
              onClick={handleLogout}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-1.5 rounded-md flex items-center text-sm"
            >
              <FaSignOutAlt className="mr-2" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
