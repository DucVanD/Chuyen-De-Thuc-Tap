

import { FaSearch } from "react-icons/fa";

const HeaderAdmin = () => {
  return (
    <>
    <header className="bg-white shadow-sm">
  <div className="flex">
    {/* Sidebar logo */}
    <div className="basis-2/12 bg-indigo-800 py-6 flex justify-center items-center">
      <h1 className="uppercase text-white text-2xl font-bold tracking-wider">
        MiniMart Admin
      </h1>
    </div>

    {/* Header right */}
    <div className="basis-10/12 flex items-center justify-between px-6 py-4">
      {/* Thanh tìm kiếm */}
      <div className="w-1/3 relative">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50"
        />
        <svg
          className="absolute left-3 top-2.5 w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>
      </div>

      {/* Thông báo, Admin, Logout */}
      <div className="flex items-center space-x-5">
        {/* Thông báo */}
        <button className="relative">
          <svg
            className="w-6 h-6 text-gray-600 hover:text-indigo-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Tên admin */}
        <div className="flex items-center space-x-3">
          {/* TODO: Thay bằng avatar state trong React */}
          <img
            src="/assets/images/avatar/admin-avatar.png"
            alt="Admin"
            className="w-8 h-8 rounded-full border-2 border-indigo-200"
          />
          <span className="text-gray-700 font-medium">Admin</span>
        </div>

        {/* Logout */}
        <a href="/logout">
          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md transition duration-200 flex items-center"
          >
            <i className="fas fa-sign-out-alt mr-2"></i> Đăng xuất
          </button>
        </a>
      </div>
    </div>
  </div>
</header>

    </>
  );
};
export default HeaderAdmin;
