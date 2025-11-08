import apiCategory from "../../../api/apiCategory";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCat = () => {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const [formData, setFormData] = useState({
  //   name: "",
  //   description: "",
  //   parent_id: "",
  //   sort_order: "",
  //   status: "1",
  // });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parent_id: "0", // ✅ thêm mặc định là 0
    sort_order: "1", // ✅ thêm mặc định là 0
    status: "1",
  });

  // 🔹 Load danh mục cha
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiCategory.getAll();
        if (res.data.status) {
          setCategories(res.data.data);
        } else {
          toast.warn("Không tải được danh mục cha!");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API categories:", error);
        toast.error("Không thể kết nối đến server.");
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Dọn preview khi đổi ảnh
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  // 🔹 Xử lý input thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Xử lý upload ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file || null);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    } else {
      setImagePreview(null);
    }
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      submitData.append(key, value ?? "")
    );
    if (image) submitData.append("image", image);

    try {
      const res = await apiCategory.Addcategory(submitData);
      toast.success(res.message || "✅ Thêm danh mục thành công!");
      setTimeout(() => navigate("/admin/categories/1"), 1500);
    } catch (err) {
      console.error("❌ Lỗi khi thêm danh mục:", err);

      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
        // Hiển thị lỗi đầu tiên (nếu có)
        const firstError = Object.values(err.response.data.errors)[0]?.[0];
        if (firstError) toast.error(firstError);
      } else {
        toast.error(
          err.response?.data?.message ||
          `Lỗi server (status ${err.response?.status || "?"})`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
            Thêm danh mục mới
          </h3>
          <Link
            to="/admin/categories/1"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded inline-flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i> Về danh sách
          </Link>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Cột trái: Thông tin cơ bản */}
              <div className="lg:w-1/2">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                    Thông tin cơ bản
                  </h4>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên danh mục
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2.5 border rounded-md"
                      placeholder="Nhập tên danh mục"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.name[0]}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mô tả
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="w-full p-2.5 border rounded-md"
                      placeholder="Nhập mô tả danh mục"
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trạng thái
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full p-2.5 border rounded-md"
                    >
                      <option value="1">Xuất bản</option>
                      <option value="0">Không xuất bản</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Cột phải: Phân loại + hình ảnh */}
              <div className="lg:w-1/2">
                <div className="bg-indigo-50 p-6 rounded-lg shadow-sm mb-6">
                  <h4 className="text-lg font-semibold text-indigo-700 mb-4 pb-2 border-b border-indigo-200">
                    Phân loại & Thứ tự
                  </h4>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Danh mục cha
                    </label>
                    <select
                      name="parent_id"
                      value={formData.parent_id}
                      onChange={handleChange}
                      className="w-full p-2.5 border rounded-md"
                    >
                      <option value="0">Không có (danh mục gốc)</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>

                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thứ tự sắp xếp
                    </label>
                    <input
                      type="number"
                      name="sort_order"
                      value={formData.sort_order}
                      onChange={handleChange}
                      className="w-full p-2.5 border rounded-md"
                      placeholder="Nhập thứ tự sắp xếp"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                    Hình ảnh
                  </h4>

                  <div className="flex flex-col items-center mb-4">
                    <div className="w-40 h-32 mb-4 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Xem trước"
                          className="object-cover w-full h-full rounded-md"
                        />
                      ) : (
                        <i className="fas fa-image text-gray-400 text-5xl"></i>
                      )}
                    </div>

                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
                  >
                    {loading ? "Đang thêm..." : "Thêm danh mục"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default AddCat;
