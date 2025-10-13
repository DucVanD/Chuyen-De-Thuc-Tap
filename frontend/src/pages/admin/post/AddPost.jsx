import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaImage, FaPlus } from "react-icons/fa";
import { Editor } from "@tinymce/tinymce-react";
import apiPost from "../../../api/apiPost";
import apiTopic from "../../../api/apiTopic";
import { imageURL } from "../../../api/config";

const AddPost = () => {
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detail: "",
    topic_id: "",
    type: "post",
    status: 1,
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // 🔹 Load danh sách chủ đề
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await apiTopic.getAll();
        setTopics(res.data || res);
        console.log("Topics:", res.data || res);
      } catch (error) {
        console.error("Lỗi khi tải chủ đề:", error);
      }
    };
    fetchTopics();
  }, []);

  // 🔹 Khi nhập dữ liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 TinyMCE editor change
  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, detail: content }));
  };

  // 🔹 Chọn ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file || null);
    if (file) {
      setThumbPreview(URL.createObjectURL(file));
    }
  };

  // 🔹 Gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key] ?? "");
      });
      if (thumbnail) data.append("thumbnail", thumbnail);

      const res = await apiPost.AddPost(data);
      alert(res.message || "Thêm bài viết thành công!");
      navigate("/admin/posts");
    } catch (error) {
      console.error("Lỗi khi thêm bài viết:", error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
      alert(error.response?.data?.message || "Lỗi server khi thêm bài viết!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
            Thêm bài viết mới
          </h3>
          <div>
            <Link
              to="/admin/posts"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded inline-flex items-center transition duration-200"
            >
              <FaArrowLeft className="mr-2" /> Về danh sách
            </Link>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            encType="multipart/form-data"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left: Basic info + Content */}
              <div className="lg:w-2/3 space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                    Thông tin cơ bản
                  </h4>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tiêu đề
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Nhập tiêu đề bài viết"
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.title && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.title[0]}
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
                      rows={3}
                      placeholder="Nhập mô tả bài viết"
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-y"
                    />
                    {errors.description && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.description[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Nội dung bài viết (TinyMCE) */}
                <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
                  <h4 className="text-lg font-semibold text-indigo-700 mb-4 pb-2 border-b border-indigo-200">
                    Nội dung bài viết
                  </h4>
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
                  {errors.detail && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.detail[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* Right: Category + Image + Status */}
              <div className="lg:w-1/3 space-y-6">
                <div className="bg-purple-50 p-6 rounded-lg shadow-sm">
                  <h4 className="text-lg font-semibold text-purple-700 mb-4 pb-2 border-b border-purple-200">
                    Phân loại
                  </h4>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Chủ đề
                    </label>
                    <select
                      name="topic_id"
                      value={formData.topic_id}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Chọn chủ đề</option>
                      {topics.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                    {errors.topic_id && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.topic_id[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loại bài viết
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="post">Bài viết</option>
                      <option value="page">Trang</option>
                    </select>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                    Hình ảnh & Trạng thái
                  </h4>

                  <div className="flex flex-col items-center mb-4">
                    <div className="w-44 h-32 mb-4 relative bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                      {thumbPreview ? (
                        <img
                          src={thumbPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaImage className="text-gray-400 text-5xl" />
                      )}
                    </div>

                    <input
                      type="file"
                      name="thumbnail"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG, GIF — tối đa 2MB
                    </p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trạng thái
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="1">Hiển thị</option>
                      <option value="0">Ẩn</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 transition duration-200 inline-flex items-center justify-center"
                  >
                    <FaPlus className="mr-2" />
                    {loading ? "Đang lưu..." : "Thêm bài viết"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddPost;
