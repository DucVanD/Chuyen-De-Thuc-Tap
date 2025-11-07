import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiUser from "../../api/apiUser";
import "react-toastify/dist/ReactToastify.css";
import { imageURL } from "../../api/config";
import { useDispatch } from "react-redux";
import { updateUser } from "../../Redux/authSlice";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const dispatch = useDispatch();
  // ✅ Lấy thông tin người dùng đang đăng nhập
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiUser.getProfile();
        console.log("Thông tin người dùng:", res);
        if (res.status && res.data) setUser(res.data);
      } catch (err) {
        console.error(err);
        toast.error("❌ Không thể tải thông tin người dùng");
      }
    };
    fetchProfile();
  }, []);

  // ✅ Xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ✅ Chọn ảnh đại diện mới
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setUser({ ...user, avatar: file });
    }
  };

  // ✅ Lưu thay đổi
  const handleSave = async () => {
    try {
      const updatedData = {
        name: user.name,
        phone: user.phone || "",
        address: user.address || "",
        avatar: user.avatar instanceof File ? user.avatar : null,
      };

      const res = await apiUser.updateProfile(updatedData);

      if (res.status) {
        toast.success("✅ Cập nhật thông tin thành công!");
        setIsEditing(false);
        setUser(res.data); // cập nhật local state
        dispatch(updateUser(res.data)); // cập nhật redux state
      } else {
        toast.warning("⚠️ Cập nhật thất bại, vui lòng thử lại!");
      }
    } catch (err) {
      console.error("❌ Chi tiết lỗi:", err.response?.data);
      toast.error("❌ Lỗi khi lưu thông tin!");
    }
  };


  // Hiển thị loading khi chưa có dữ liệu người dùng  

  if (!user)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Đang tải dữ liệu...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Hồ sơ tài khoản
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cột trái - Avatar */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
          <img
            src={
              avatarPreview
                ? avatarPreview
                : user.avatar
                  ? `${imageURL}/avatar/${user.avatar}`
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Avatar"
            className="w-52 h-52 rounded-full object-cover mb-4 border-4 border-indigo-200"
          />

          {isEditing && (
            <label className="cursor-pointer text-sm text-indigo-600 hover:underline mb-4">
              Chọn ảnh mới
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          )}

          <h2 className="text-lg font-semibold text-gray-700">{user.name}</h2>
          <p className="text-sm text-gray-500 mb-3">{user.email}</p>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-5 py-2 mt-3 rounded-lg transition ${isEditing
              ? "bg-gray-400 hover:bg-gray-500"
              : "bg-indigo-600 hover:bg-indigo-700"
              } text-white`}
          >
            {isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa thông tin"}
          </button>
        </div>

        {/* Cột phải - Form thông tin */}
        <div className="bg-indigo-50 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-indigo-700 mb-4 pb-2 border-b border-indigo-200">
            Thông tin cá nhân
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                value={user.name || ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border p-2.5 rounded-md ${isEditing
                  ? "bg-white border-indigo-300 focus:ring focus:ring-indigo-200"
                  : "bg-gray-100 border-gray-300 cursor-not-allowed"
                  }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user.email || ""}
                readOnly
                className="w-full border p-2.5 rounded-md bg-gray-100 border-gray-300 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Số điện thoại
              </label>
              <input
                type="text"
                name="phone"
                value={user.phone || ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border p-2.5 rounded-md ${isEditing
                  ? "bg-white border-indigo-300 focus:ring focus:ring-indigo-200"
                  : "bg-gray-100 border-gray-300 cursor-not-allowed"
                  }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={user.address || ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border p-2.5 rounded-md ${isEditing
                  ? "bg-white border-indigo-300 focus:ring focus:ring-indigo-200"
                  : "bg-gray-100 border-gray-300 cursor-not-allowed"
                  }`}
              />
            </div>

            {isEditing && (
              <button
                onClick={handleSave}
                className="w-full bg-indigo-600 text-white py-2.5 mt-4 rounded-lg hover:bg-indigo-700 transition"
              >
                💾 Lưu thay đổi
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
