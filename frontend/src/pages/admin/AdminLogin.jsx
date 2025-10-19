import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaTimesCircle } from "react-icons/fa";
import apiAdmin from "../../api/apiAdmin";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const clearField = (name) => {
    setForm({ ...form, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiAdmin.login(form);
      if (res.data.status) {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminUser", JSON.stringify(res.data.user));
        toast.success("Đăng nhập thành công!");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          toast.error("❌ Chỉ tài khoản admin mới được phép đăng nhập!");
        } else if (error.response.status === 401) {
          toast.error("Sai email hoặc mật khẩu!");
        } else {
          toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
      } else {
        toast.error("Không thể kết nối tới máy chủ!");
      }
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg')",
      }}
    >
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-amber-700 drop-shadow-sm">
          🛒 Siêu Thị Mini Admin
        </h2>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="mb-5 relative">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Nhập email của bạn"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-300 pr-10"
              required
            />
            {form.email && (
              <FaTimesCircle
                className="absolute right-3 top-11 text-gray-400 hover:text-red-500 cursor-pointer transition"
                onClick={() => clearField("email")}
              />
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-3 relative">
            <label className="block text-gray-700 font-medium mb-2">
              Mật khẩu
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300 pr-12"
              required
            />
            {form.password && (
              <div className="absolute right-3 top-11 flex items-center space-x-2">
                <FaTimesCircle
                  className="text-gray-400 hover:text-red-500 cursor-pointer transition"
                  onClick={() => clearField("password")}
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="text-gray-500 hover:text-pink-500 cursor-pointer transition"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="text-gray-500 hover:text-pink-500 cursor-pointer transition"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            )}
          </div>

          {/* QUÊN MẬT KHẨU */}
          <div className="text-right mb-6">
            <button
              type="button"
              className="text-sm text-indigo-700 hover:text-pink-500 font-medium transition-all"
              onClick={() => toast.info("Vui lòng liên hệ quản trị viên để đặt lại mật khẩu.")}
            >
              Quên mật khẩu?
            </button>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-pink-400 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
          >
            Đăng nhập
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Siêu Thị Mini — Admin Portal
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
