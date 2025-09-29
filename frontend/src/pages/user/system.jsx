import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaCog, 
  FaShieldAlt, 
  FaBell, 
  FaLanguage, 
  FaMoon, 
  FaSun, 
  FaDownload, 
  FaInfoCircle,
  FaQuestionCircle,
  FaHeadset,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaGlobe
} from "react-icons/fa";

const System = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    language: 'vi',
    theme: 'light',
    autoUpdate: true
  });

  const [systemInfo] = useState({
    version: '1.0.0',
    buildDate: '2024-01-15',
    lastUpdate: '2024-01-10',
    browser: 'Chrome 120.0.0.0',
    os: 'Windows 11'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-600">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-semibold">Hệ thống</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cài đặt hệ thống</h1>
          <p className="text-gray-600">Quản lý cài đặt và thông tin hệ thống Bean Farm</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* System Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <FaInfoCircle className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Thông tin hệ thống</h2>
                  <p className="text-gray-600">Thông tin chi tiết về phiên bản và môi trường</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Phiên bản</span>
                    <span className="font-semibold text-gray-800">{systemInfo.version}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Ngày build</span>
                    <span className="font-semibold text-gray-800">{systemInfo.buildDate}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Cập nhật cuối</span>
                    <span className="font-semibold text-gray-800">{systemInfo.lastUpdate}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Trình duyệt</span>
                    <span className="font-semibold text-gray-800">{systemInfo.browser}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Hệ điều hành</span>
                    <span className="font-semibold text-gray-800">{systemInfo.os}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Trạng thái</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      Hoạt động bình thường
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* System Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <FaCog className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Cài đặt hệ thống</h2>
                  <p className="text-gray-600">Tùy chỉnh các cài đặt của ứng dụng</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Notifications */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <FaBell className="text-gray-500" />
                    <div>
                      <h3 className="font-medium text-gray-800">Thông báo</h3>
                      <p className="text-sm text-gray-600">Nhận thông báo về đơn hàng và khuyến mãi</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                {/* Email Updates */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-gray-500" />
                    <div>
                      <h3 className="font-medium text-gray-800">Cập nhật qua email</h3>
                      <p className="text-sm text-gray-600">Nhận báo cáo và cập nhật qua email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailUpdates}
                      onChange={(e) => handleSettingChange('emailUpdates', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                {/* Language */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <FaLanguage className="text-gray-500" />
                    <div>
                      <h3 className="font-medium text-gray-800">Ngôn ngữ</h3>
                      <p className="text-sm text-gray-600">Chọn ngôn ngữ hiển thị</p>
                    </div>
                  </div>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                    <option value="ja">日本語</option>
                  </select>
                </div>

                {/* Theme */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    {settings.theme === 'light' ? <FaSun className="text-gray-500" /> : <FaMoon className="text-gray-500" />}
                    <div>
                      <h3 className="font-medium text-gray-800">Chủ đề</h3>
                      <p className="text-sm text-gray-600">Chọn chủ đề sáng hoặc tối</p>
                    </div>
                  </div>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleSettingChange('theme', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="light">Sáng</option>
                    <option value="dark">Tối</option>
                    <option value="auto">Tự động</option>
                  </select>
                </div>

                {/* Auto Update */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <FaDownload className="text-gray-500" />
                    <div>
                      <h3 className="font-medium text-gray-800">Cập nhật tự động</h3>
                      <p className="text-sm text-gray-600">Tự động cập nhật khi có phiên bản mới</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoUpdate}
                      onChange={(e) => handleSettingChange('autoUpdate', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* System Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                  <FaCog className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Thao tác hệ thống</h2>
                  <p className="text-gray-600">Các thao tác bảo trì và quản lý hệ thống</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => console.log('Downloading system logs...')}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaDownload className="text-blue-600" />
                  <div className="text-left">
                    <h3 className="font-medium text-gray-800">Tải logs hệ thống</h3>
                    <p className="text-sm text-gray-600">Tải về file logs để debug</p>
                  </div>
                </button>

                <button
                  onClick={() => console.log('Clearing cache...')}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaCog className="text-orange-600" />
                  <div className="text-left">
                    <h3 className="font-medium text-gray-800">Xóa cache</h3>
                    <p className="text-sm text-gray-600">Xóa dữ liệu cache tạm thời</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Security & Privacy */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaShieldAlt className="text-green-600 text-xl" />
                <h3 className="text-lg font-semibold text-gray-800">Bảo mật & Quyền riêng tư</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Mã hóa dữ liệu</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    Bật
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cookie</span>
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                    Hạn chế
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tracking</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    Tắt
                  </span>
                </div>
              </div>
            </div>

            {/* Support & Contact */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaQuestionCircle className="text-blue-600 text-xl" />
                <h3 className="text-lg font-semibold text-gray-800">Hỗ trợ & Liên hệ</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaHeadset className="text-green-600" />
                  <div>
                    <p className="font-medium text-gray-800">Hotline</p>
                    <p className="text-sm text-gray-600">1900 6750</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaEnvelope className="text-green-600" />
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-sm text-gray-600">support@beanfarm.vn</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaGlobe className="text-green-600" />
                  <div>
                    <p className="font-medium text-gray-800">Website</p>
                    <p className="text-sm text-gray-600">www.beanfarm.vn</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Kết nối với chúng tôi</h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <FaGithub />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                >
                  <FaGlobe />
                </a>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Trạng thái hệ thống</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">API Server</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-700">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Database</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-700">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">CDN</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-700">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default System;
