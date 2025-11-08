import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import apiProduct from "../../../api/apiProduct";
import apiCategory from "../../../api/apiCategory";
import apiBrand from "../../../api/apiBrand";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    detail: "",
    price_root: "",
    price_sale: "",
    qty: 1,
    category_id: "",
    brand_id: "",
    status: 1,
  });

  // 🔹 Load categories & brands
  useEffect(() => {
    (async () => {
      try {
        const [resCat, resBrand] = await Promise.all([
          apiCategory.getAll(),
          apiBrand.getAll(),
        ]);
        setCategories(resCat.data?.data || []);
        setBrands(resBrand.data?.data || []);
      } catch (err) {
        console.error("Lỗi khi load category/brand:", err);
      }
    })();
  }, []);

  // 🔹 Cleanup preview URL khi đổi ảnh
  useEffect(() => {
    return () => {
      if (thumbPreview) URL.revokeObjectURL(thumbPreview);
    };
  }, [thumbPreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file || null);
    setThumbPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, detail: content }));
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const data = new FormData();
      const numericKeys = ["price_root", "price_sale", "qty"];

      Object.keys(formData).forEach((key) => {
        let value = formData[key];
        if (typeof value === "string" && numericKeys.includes(key)) {
          value = value.replace(/[, ]+/g, "");
        }
        data.append(key, value ?? "");
      });

      if (thumbnail) data.append("thumbnail", thumbnail);

      const res = await apiProduct.AddProduct(data);
      toast.success(res.message || "✅ Thêm sản phẩm thành công!");
      setTimeout(() => navigate("/admin/products/1"), 1500);
    } catch (error) {
      console.error("❌ Lỗi khi thêm sản phẩm:", error);
      if (error.response?.data?.errors) setErrors(error.response.data.errors);

      toast.error(
        error.response?.data?.message ||
          `Lỗi từ server (status ${error.response?.status || "?"})`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
          Thêm sản phẩm mới
        </h3>
        <Link
          to="/admin/products"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded inline-flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Về danh sách
        </Link>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Thông tin cơ bản */}
            <div className="lg:w-2/3">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                  Thông tin cơ bản
                </h4>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2.5 border rounded-md"
                    placeholder="Nhập tên sản phẩm"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.name[0]}
                    </p>
                  )}
                </div>

                {/* Mô tả ngắn */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Mô tả ngắn
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-2.5 border rounded-md"
                    placeholder="Mô tả sản phẩm..."
                  ></textarea>
                </div>

                {/* Chi tiết sản phẩm */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Chi tiết sản phẩm
                  </label>
                  <Editor
                    apiKey="08g2njx5rtkfad5tsq5p91c0bos9siwvip1tcsinbsduna70"
                    value={formData.detail}
                    init={{
                      height: 400,
                      menubar: true,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | bold italic underline | " +
                        "alignleft aligncenter alignright | bullist numlist outdent indent | link image media | code fullscreen",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    onEditorChange={handleEditorChange}
                  />
                </div>
              </div>

              {/* Giá & Số lượng */}
              <div className="bg-indigo-50 p-6 rounded-lg shadow-sm mb-6">
                <h4 className="text-lg font-semibold text-indigo-700 mb-4 pb-2 border-b border-indigo-200">
                  Giá & Số lượng
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="number"
                    name="price_root"
                    value={formData.price_root}
                    onChange={handleChange}
                    className="w-full p-2.5 border rounded-md"
                    placeholder="Giá bán"
                  />
                  <input
                    type="number"
                    name="price_sale"
                    value={formData.price_sale}
                    onChange={handleChange}
                    className="w-full p-2.5 border rounded-md"
                    placeholder="Giá khuyến mãi"
                  />
                  <input
                    type="number"
                    name="qty"
                    value={formData.qty}
                    onChange={handleChange}
                    className="w-full p-2.5 border rounded-md"
                    placeholder="Số lượng"
                  />
                </div>
              </div>
            </div>

            {/* Phân loại & Hình ảnh */}
            <div className="lg:w-1/3">
              <div className="bg-purple-50 p-6 rounded-lg shadow-sm mb-6">
                <h4 className="text-lg font-semibold text-purple-700 mb-4 pb-2 border-b border-purple-200">
                  Phân loại
                </h4>

                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full p-2.5 border rounded-md mb-4"
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <select
                  name="brand_id"
                  value={formData.brand_id}
                  onChange={handleChange}
                  className="w-full p-2.5 border rounded-md"
                >
                  <option value="">Chọn thương hiệu</option>
                  {brands.map((br) => (
                    <option key={br.id} value={br.id}>
                      {br.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                  Hình ảnh & Trạng thái
                </h4>

                <input
                  type="file"
                  name="thumbnail"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded-md mb-4"
                />

                {thumbPreview && (
                  <img
                    src={thumbPreview}
                    alt="Xem trước"
                    className="rounded-md mb-4"
                  />
                )}

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2.5 border rounded-md mb-6"
                >
                  <option value="1">Xuất bản</option>
                  <option value="0">Không xuất bản</option>
                </select>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
                >
                  {loading ? "Đang thêm..." : "Thêm sản phẩm"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AddProduct;
