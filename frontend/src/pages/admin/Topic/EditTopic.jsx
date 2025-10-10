import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiTopic from "../../../api/apiTopic";

const EditTopic = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [topic, setTopic] = useState({
    name: "",
    description: "",
    status: 1,

  });

  const [loading, setLoading] = useState(true);

  // ✅ Lấy thông tin chủ đề theo ID
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await apiTopic.getTopicById(id);
        if (res.status) {
            console.log(res.data);
          setTopic(res.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu chủ đề:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [id]);



  // ✅ Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTopic({ ...topic, [name]: value });
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiTopic.editTopic(id, topic);
      if (res.status) {
        alert("Cập nhật chủ đề thành công!");
        const savedPage = localStorage.getItem("currentTopicPage") || 1;
        navigate(`/admin/topics/${savedPage}`);
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật chủ đề:", error);
      alert("Không thể cập nhật chủ đề.");
    }
  };

  if (loading) return <p className="p-4">Đang tải dữ liệu...</p>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
          Chỉnh sửa chủ đề
        </h3>
        <button
          onClick={() => navigate("/admin/topics/1")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded inline-flex items-center transition duration-200"
        >
          <i className="fas fa-arrow-left mr-2"></i> Về danh sách
        </button>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Thông tin cơ bản */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Thông tin chủ đề
              </h4>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên chủ đề
                </label>
                <input
                  type="text"
                  name="name"
                  value={topic.name}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nhập tên chủ đề"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  value={topic.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nhập mô tả chủ đề"
                ></textarea>
              </div>
            </div>

            {/* Trạng thái & thứ tự */}
            <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-indigo-700 mb-4 pb-2 border-b border-indigo-200">
                Thiết lập hiển thị
              </h4>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={topic.status}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="1">Xuất bản</option>
                  <option value="0">Không xuất bản</option>
                </select>
              </div>

              

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
              >
                <i className="fas fa-save mr-2"></i> Lưu thay đổi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTopic;
