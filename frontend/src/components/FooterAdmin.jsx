import { Link } from "react-router-dom";

const FooterAdmin = () => {
  return (
    <footer className="bg-white text-gray-600 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between">
        {/* Tên panel */}
        <span className="text-sm text-center md:text-left font-medium">
          © 2025 <span className="text-indigo-600 font-semibold">Siêu Thị Mini</span> — Administration Panel
        </span>

        {/* Liên kết hỗ trợ */}
        <div className="mt-2 md:mt-0 flex flex-wrap justify-center md:justify-end gap-3 text-sm font-medium">
          <Link
            to="/support"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            Hỗ trợ
          </Link>
          <span className="hidden md:inline text-gray-400">|</span>
          <Link
            to="/guide"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            Hướng dẫn sử dụng
          </Link>
          <span className="hidden md:inline text-gray-400">|</span>
          <Link
            to="/version"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            Phiên bản 1.0
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterAdmin;
