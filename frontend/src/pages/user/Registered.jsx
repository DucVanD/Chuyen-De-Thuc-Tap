import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const Registered = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập/đăng ký
    console.log("Form submitted:", formData);
  };

    return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-600">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-semibold">Liên hệ</span>
        </nav>
      </div>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header với logo hoặc title */}

          {/* Tabs */}
          <div className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("login")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "login"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              ĐĂNG NHẬP
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "register"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              ĐĂNG KÝ
            </button>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {activeTab === "login" ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
              </h3>

              {/* Form fields */}
              <div className="space-y-4">
                {activeTab === "register" && (
                  <>
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Họ và tên
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required={activeTab === "register"}
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Nhập họ và tên"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Số điện thoại
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required={activeTab === "register"}
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mật khẩu
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Mật khẩu"
                  />
                </div>

                {activeTab === "register" && (
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Xác nhận mật khẩu
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required={activeTab === "register"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Xác nhận mật khẩu"
                    />
                  </div>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full mt-6 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
              >
                {activeTab === "login" ? "Đăng nhập" : "Đăng ký"}
              </button>

              {/* Forgot password (chỉ hiển thị khi đăng nhập) */}
              {activeTab === "login" && (
                <div className="mt-4 text-center">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              )}

              {/* Divider */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Hoặc {activeTab === "login" ? "đăng nhập" : "đăng ký"}{" "}
                      bằng
                    </span>
                  </div>
                </div>
              </div>

              {/* Social login buttons */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <FaFacebookF className="h-5 w-5 mr-2" />
                  Facebook
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  <FaGoogle className="h-5 w-5 mr-2" />
                  Google
                </button>
              </div>
            </div>
          </form>

          {/* Footer links */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Bằng cách {activeTab === "login" ? "đăng nhập" : "đăng ký"}, bạn
              đồng ý với{" "}
              <Link to="/terms" className="text-green-600 hover:text-green-700">
                Điều khoản sử dụng
              </Link>{" "}
              và{" "}
              <Link
                to="/privacy"
                className="text-green-600 hover:text-green-700"
              >
                Chính sách bảo mật
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registered;
