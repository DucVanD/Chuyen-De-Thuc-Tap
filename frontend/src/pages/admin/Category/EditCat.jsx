import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiCategory from "../../../api/apiCategory";
import { imageURL } from "../../../api/config";

const EditCat = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    name: "",
    description: "",
    status: 1,
    parent_id: 0,
    sort_order: 0,
    image: "",
  });

  const [preview, setPreview] = useState(null); // để hiển thị ảnh preview
  const [imageFile, setImageFile] = useState(null); // lưu file ảnh mới
  const [loading, setLoading] = useState(true);

  // Lấy thông tin danh mục theo id
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await apiCategory.getCategoryById(id);
        if (res.data.status) {
          setCategory(res.data.data);
          setPreview(
            res.data.data.image
              ? `${imageURL}/category/${res.data.data.image}?v=${Date.now()}`
              : null
          );
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu danh mục:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  // Lấy danh sách tất cả categories để chọn danh mục cha
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiCategory.getAll();
        if (res.data.status) {
          setCategories(res.data.data);
        } else {
          console.warn("API trả về status = false:", res.data.message);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  // Xử lý upload file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // lưu file mới
      setPreview(URL.createObjectURL(file)); // hiển thị ảnh mới
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", category.name);
      formData.append("description", category.description);
      formData.append("status", category.status);
      formData.append("parent_id", category.parent_id);
      formData.append("sort_order", category.sort_order);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await apiCategory.editCategory(id, formData);

      if (res.status || res.data?.status) {
        alert("Cập nhật thành công!");
        navigate("/admin/categories/1");
      } else {
        alert("Có lỗi xảy ra khi cập nhật!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
      alert("Không thể cập nhật danh mục.");
    }
  };

  if (loading) return <p className="p-4">Đang tải dữ liệu...</p>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
          Chỉnh sửa danh mục
        </h3>
        <button
          onClick={() => navigate("/admin/category")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded inline-flex items-center transition duration-200"
        >
          <i className="fas fa-arrow-left mr-2"></i> Về danh sách
        </button>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Thông tin cơ bản */}
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
                    value={category.name}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Nhập tên danh mục"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    name="description"
                    value={category.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Nhập mô tả danh mục"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái
                  </label>
                  <select
                    name="status"
                    value={category.status}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="1">Xuất bản</option>
                    <option value="0">Không xuất bản</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Phân loại & Hình ảnh */}
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
                    value={category.parent_id || 0}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="0">Chọn danh mục cha</option>
                    {categories
                      .filter((cat) => cat.id !== category.id)
                      .map((cat) => (
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
                    value={category.sort_order}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Nhập thứ tự sắp xếp"
                  />
                </div>
              </div>

              {/* Hình ảnh */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                  Hình ảnh
                </h4>

                <div className="flex flex-col items-center mb-4">
                  <div className="w-40 h-32 mb-4 relative">
                    <img
                      src={preview || "https://via.placeholder.com/150"}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md border-2 border-gray-200"
                    />
                  </div>

                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
                >
                  <i className="fas fa-save mr-2"></i> Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCat;
