import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaCalendarAlt, FaEye } from "react-icons/fa";
import {
  FaTruck,
  FaUndoAlt,
  FaMoneyBillWave,
  FaHeadset,
} from "react-icons/fa";
import apiPost from "../../api/apiPost"; // ✅ import API post
import { imageURL } from "../../api/config";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ Hàm load bài viết có phân trang
  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await apiPost.getAllPageuser(page);

      if (res.status) {
        // ✅ Chuẩn hóa dữ liệu paginate từ Laravel
        const list = Array.isArray(res.data?.data?.data)
          ? res.data.data.data
          : Array.isArray(res.data?.data)
            ? res.data.data
            : [];

        setPosts(list);
        setCurrentPage(res.data?.data?.current_page || 1);
        setLastPage(res.data?.last_page || 1);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("❌ Lỗi khi tải bài viết:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };
  console.log("Posts state:", posts);

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const goToPage = (page) => {
    if (page >= 1 && page <= lastPage) {
      fetchPosts(page);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 mt-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-600">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-semibold">Bài viết</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ======= MAIN CONTENT ======= */}
          <div className="lg:col-span-3">
            {loading ? (
              <p className="text-center py-10 text-gray-500">
                Đang tải bài viết...
              </p>
            ) : Array.isArray(posts) && posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Ảnh bài viết */}
                      <div className="md:w-1/3">
                        <img
                          src={
                            post.thumbnail
                              ? `${imageURL}/post/${post.thumbnail}`
                              : "/assets/images/no-image.jpg"
                          }
                          alt={post.title}
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>


                      {/* Nội dung bài viết */}
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt />
                            {new Date(post.created_at).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaEye />
                            {Math.floor(Math.random() * 2000 + 100)} lượt xem
                          </span>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            {post.type === "post" ? "Bài viết" : "Trang"}
                          </span>
                        </div>

                        <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-green-600 transition-colors">
                          <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </h2>

                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                          {post.description}
                        </p>

                        <Link
                          to={`/post/${post.id}`}
                          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
                        >
                          Đọc tiếp
                          <svg
                            className="ml-1 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-center py-10 text-gray-500">
                Không có bài viết nào.
              </p>
            )}

            {/* ======= Pagination ======= */}
            {lastPage > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Trước
                </button>

                {Array.from({ length: lastPage }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`px-3 py-1 rounded ${currentPage === i + 1
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === lastPage}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Sau
                </button>
              </div>
            )}
          </div>

          {/* ======= SIDEBAR ======= */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tìm kiếm
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors">
                  <FaSearch />
                </button>
              </div>
            </div>

            {/* Bài viết mới */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-green-600 text-white px-4 py-3">
                <h3 className="font-semibold">BÀI VIẾT MỚI</h3>
              </div>
              <div className="p-4 space-y-3">
                {Array.isArray(posts) && posts.length > 0 ? (
                  posts.slice(0, 5).map((post, index) => (
                    <div
                      key={index}
                      className="flex gap-3 hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                      <img
                        src={
                          post.thumbnail
                            ? `${imageURL}/post/${post.thumbnail}`
                            : "/assets/images/no-image.jpg"
                        }
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <Link
                          to={`/post/${post.id}`}
                          className="text-sm font-medium text-gray-800 hover:text-green-600 transition-colors line-clamp-2"
                        >
                          {post.title}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(post.created_at).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    Chưa có bài viết mới.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ======= DỊCH VỤ MINI ======= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            {
              icon: <FaTruck className="text-green-600 text-2xl" />,
              text: "Vận chuyển miễn phí",
              sub: "Hóa đơn trên 5 triệu",
            },
            {
              icon: <FaUndoAlt className="text-green-600 text-2xl" />,
              text: "Đổi trả miễn phí",
              sub: "Trong vòng 7 ngày",
            },
            {
              icon: <FaMoneyBillWave className="text-green-600 text-2xl" />,
              text: "100% Hoàn tiền",
              sub: "Nếu sản phẩm lỗi",
            },
            {
              icon: <FaHeadset className="text-green-600 text-2xl" />,
              text: "Hotline: 1900 6750",
              sub: "Hỗ trợ 24/7",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 hover:shadow-md transition"
            >
              {item.icon}
              <div>
                <p className="font-semibold">{item.text}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Post;
