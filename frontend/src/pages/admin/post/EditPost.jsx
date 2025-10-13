// src/pages/admin/posts/EditPost.jsx
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import apiPost from "../../../api/apiPost";
import apiTopic from "../../../api/apiTopic";
import { imageURL } from "../../../api/config";

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const savedPage = localStorage.getItem("currentPostPage") || 1;

  const [topics, setTopics] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    detail: "",
    type: "post",
    topic_id: "",
    status: 1,
  });

  // === Load topics ===
  useEffect(() => {
    (async () => {
      try {
        const res = await apiTopic.getAll();
        setTopics(res.data || []);
      } catch (err) {
        console.error("Lỗi khi load topic:", err);
      }
    })();
  }, []);

  console.log("Topics:", topics);
  // === Load bài viết cần sửa ===
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await apiPost.getPostId(id);
        const post = res.data?.data || res.data;

        if (!post) {
          alert("Không tìm thấy bài viết");
          return navigate("/admin/posts");
        }

        setFormData({
          title: post.title || "",
          slug: post.slug || "",
          description: post.description || "",
          detail: post.detail || "",
          type: post.type || "post",
          topic_id: post.topic_id || "",
          status: post.status || 1,
        });

        if (post.thumbnail) {
          setThumbPreview(`${imageURL}/post/${post.thumbnail}`);
        }
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
        alert("Không thể tải bài viết");
        navigate("/admin/posts");
      }
    };
    fetchPost();
  }, [id, navigate]);

  // Cleanup preview khi đổi ảnh
  useEffect(() => {
    return () => {
      if (thumbPreview && thumbPreview.startsWith("blob:")) {
        URL.revokeObjectURL(thumbPreview);
      }
    };
  }, [thumbPreview]);

  // === Handle form change ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // === Handle chọn file ===
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file || null);
    setThumbPreview(file ? URL.createObjectURL(file) : thumbPreview);
  };

  // === Handle editor TinyMCE ===
  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, detail: content }));
  };

  // === Gửi form ===
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

      const res = await apiPost.EditPost(id, data);
      alert(res.message || "Cập nhật bài viết thành công");
      navigate(`/admin/posts`);
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
      if (error.response?.data?.errors) setErrors(error.response.data.errors);
      alert(
        error.response?.data?.message ||
          `Lỗi server (status ${error.response?.status || "?"})`
      );
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
            Chỉnh sửa bài viết
          </h3>
          <div>
            <Link
              to={`/admin/posts/${savedPage}`}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded inline-flex items-center transition duration-200"
            >
              <FaArrowLeft className="mr-2" /> Về danh sách
            </Link>
          </div>
        </div>

        {/* Form body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left: Basic Info + Content */}
              <div className="lg:w-2/3 space-y-6">
                {/* Basic Info */}
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
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Nhập tiêu đề bài viết"
                    />
                    {errors.title && (
                      <div className="text-red-600 text-sm mt-1">
                        {errors.title}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md"
                      placeholder="Tự động tạo theo tiêu đề"
                      disabled
                    />
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
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Nhập mô tả bài viết"
                    ></textarea>
                  </div>
                </div>

                {/* Content */}
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
                </div>
              </div>

              {/* Right: Category + Image + Status */}
              <div className="lg:w-1/3 space-y-6">
                {/* Classification */}
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
                      className="w-full p-2.5 border border-gray-300 rounded-md"
                    >
                      <option value="">Chọn chủ đề</option>
                      {topics.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loại bài viết
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md"
                    >
                      <option value="post">Bài viết</option>
                      <option value="page">Trang</option>
                    </select>
                  </div>
                </div>

                {/* Image & Status */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                    Hình ảnh & Trạng thái
                  </h4>

                  {thumbPreview && (
                    <div className="w-40 h-32 mb-4 relative bg-gray-200 rounded-md overflow-hidden mx-auto">
                      <img
                        src={thumbPreview}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <input
                    type="file"
                    name="thumbnail"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                  />

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-md mb-6"
                  >
                    <option value="1">Hiển thị</option>
                    <option value="0">Ẩn</option>
                  </select>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
                  >
                    <FaSave className="mr-2" />
                    {loading ? "Đang lưu..." : "Cập nhật bài viết"}
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

export default EditPost;
