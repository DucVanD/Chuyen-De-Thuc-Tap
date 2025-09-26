import { Link } from "react-router-dom";

const FooterAdmin = () => {
  return (
    <>
      {/* Footer của trang admin */}
      <footer className="bg-white text-gray-600 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">
          {/* Text hiển thị tên panel */}
          <span className="text-sm font-medium">
            Siêu THị MiNi - Administration Panel
          </span>

          {/* Các liên kết hỗ trợ */}
          <div className="mt-3 md:mt-0 space-x-4 text-sm font-medium">
            {/* Dùng Link thay vì <a> để điều hướng nội bộ */}
            <Link to="/support" className="hover:text-indigo-600 transition">
              Hỗ trợ
            </Link>
            <Link to="/guide" className="hover:text-indigo-600 transition">
              Hướng dẫn sử dụng
            </Link>
            <Link to="/version" className="hover:text-indigo-600 transition">
              Phiên bản 1.0
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterAdmin;
