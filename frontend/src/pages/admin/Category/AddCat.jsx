import apiCategory from "../../../api/apiCategory";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddCat = () => {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parent_id: "",
    sort_order: "",
    status: "1",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiCategory.getAll();

        // Check đúng status từ backend
        console.log(res);
        if (res.data.status) {
          setCategories(res.data.data);
        } else {
          console.warn("API trả về status = false:", res.data.message);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API categories:", error);
        // Có thể show UI thông báo lỗi
      }
    };
    fetchCategories();
  }, []); useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiCategory.getAll();

        // Check đúng status từ backend
        console.log(res);
        if (res.data.status) {
          setCategories(res.data.data);
        } else {
          console.warn("API trả về status = false:", res.data.message);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API categories:", error);
        // Có thể show UI thông báo lỗi
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // reset lỗi
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("description", formData.description);
    submitData.append("parent_id", formData.parent_id);
    submitData.append("sort_order", formData.sort_order);
    submitData.append("status", formData.status);
    if (image) {
      submitData.append("image", image);
    }
    try {
      const res = await apiCategory.Addcategory(submitData);
      console.log("Thêm danh mục thành công:", res);
      navigate("/admin/categories/1"); // quay về trang danh sách
    } catch (err) {
      console.error("Lỗi khi thêm danh mục:", err);
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      }
      alert(
        err.response?.data?.message ||
          `Lỗi từ server (status ${err.response?.status || "?"})`
      );
    }
    finally {
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
          <div>
            <a
              href="#"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded  items-center inline-flex transition duration-200"
            >
              <i className="fas fa-arrow-left mr-2"></i> Về danh sách
            </a>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Thông tin cơ bản */}
              <div className="lg:w-1/2">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                    Thông tin cơ bản
                  </h4>

                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Tên danh mục
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Nhập tên danh mục"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mô tả
                    </label>
                    <textarea
                      id="description"
                      rows="3"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Nhập mô tả danh mục"
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Trạng thái
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="1">Xuất bản</option>
                      <option value="0">Không xuất bản</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Thông tin khác và hình ảnh */}
              <div className="lg:w-1/2">
                <div className="bg-indigo-50 p-6 rounded-lg shadow-sm mb-6">
                  <h4 className="text-lg font-semibold text-indigo-700 mb-4 pb-2 border-b border-indigo-200">
                    Phân loại & Thứ tự
                  </h4>

                  <div className="mb-4">
                    <label
                      htmlFor="parent_id"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Danh mục cha
                    </label>
                    <select
                      id="parent_id"
                      name="parent_id"
                      value={formData.parent_id}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Chọn danh mục cha</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}                     
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="sort_order"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Thứ tự sắp xếp
                    </label>
                    <input
                      type="number"
                      id="sort_order"
                      name="sort_order"
                      value={formData.sort_order}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Nhập thứ tự sắp xếp"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                    Hình ảnh
                  </h4>

                  <div className="flex flex-col items-center mb-4">
                    <div className="w-40 h-32 mb-4 relative bg-gray-200 rounded-md flex items-center justify-center">
                      <i className="fas fa-image text-gray-400 text-5xl"></i>
                    </div>

                    <input
                      type="file"
                      id="image"
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
    </>
  );
};
export default AddCat;
