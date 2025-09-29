import { Link } from "react-router-dom";
import { FaSearch, FaCalendarAlt, FaEye } from "react-icons/fa";
import {
  FaTruck,
  FaUndoAlt,
  FaMoneyBillWave,
  FaHeadset,
  FaStar,
  FaHeart,
  FaShareAlt,
  FaCopy,
} from "react-icons/fa";

const Post = () => {
  // Dữ liệu mẫu cho bài viết
  const posts = [
    {
      id: 1,
      title: "Công dụng của gạo lứt tím hữu cơ và cách nấu gạo lứt tím",
      excerpt:
        "Gạo lứt tím hữu cơ không chỉ là nguồn dinh dưỡng tuyệt vời mà còn có nhiều lợi ích cho sức khỏe. Hãy cùng tìm hiểu...",
      image: "/assets/images/gao-lut-tim.jpg",
      date: "Thứ Bảy, 20/04/2024",
      views: 1250,
      category: "Dinh dưỡng",
    },
    {
      id: 2,
      title:
        "Hướng dẫn cách làm salad dưa chuột thanh mát, bổ dưỡng cho ngày hè",
      excerpt:
        "Salad dưa chuột là món ăn lý tưởng cho những ngày hè oi bức. Cách làm đơn giản, nguyên liệu dễ tìm...",
      image: "/assets/images/salad-dua-chuot.jpg",
      date: "Thứ Bảy, 20/04/2024",
      views: 980,
      category: "Công thức",
    },
    {
      id: 3,
      title: "Công dụng của tỏi ngâm mật ong?",
      excerpt:
        "Tỏi ngâm mật ong là một phương thuốc tự nhiên được nhiều người tin dùng. Cùng khám phá những lợi ích...",
      image: "/assets/images/toi-ngam-mat-ong.jpg",
      date: "Thứ Bảy, 20/04/2024",
      views: 2100,
      category: "Sức khỏe",
    },
    {
      id: 4,
      title: "10 Công dụng của khoai tây bạn nhất định phải biết",
      excerpt:
        "Khoai tây không chỉ là thực phẩm quen thuộc mà còn có nhiều công dụng bất ngờ. Hãy cùng khám phá...",
      image: "/assets/images/khoai-tay.jpg",
      date: "Thứ Bảy, 20/04/2024",
      views: 1560,
      category: "Dinh dưỡng",
    },
    {
      id: 5,
      title: "Ăn ớt chuông có tác dụng gì cho sức khỏe?",
      excerpt:
        "Ớt chuông không chỉ tạo màu sắc cho món ăn mà còn mang lại nhiều lợi ích sức khỏe đáng kinh ngạc...",
      image: "/assets/images/ot-chuong.jpg",
      date: "Thứ Bảy, 20/04/2024",
      views: 890,
      category: "Sức khỏe",
    },
  ];

  // Tags mẫu
  const tags = [
    "Công dụng khoai tây",
    "Măng tây",
    "Salad dưa chuột",
    "Sức khỏe",
    "Tác dụng ớt chuông",
    "Dinh dưỡng",
    "Công thức",
  ];

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
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Danh sách bài viết */}
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
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>

                    {/* Nội dung bài viết */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaEye />
                          {post.views} lượt xem
                        </span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                          {post.category}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-green-600 transition-colors">
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                      </h2>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {post.excerpt}
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

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <button className="w-10 h-10 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">
                1
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                2
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                3
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                &gt;
              </button>
            </div>
          </div>

          {/* Sidebar */}
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
                {posts.slice(0, 5).map((post, index) => (
                  <div
                    key={index}
                    className="flex gap-3 hover:bg-gray-50 p-2 rounded transition-colors"
                  >
                    <img
                      src={post.image}
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
                      <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-green-600 text-white px-4 py-3">
                <h3 className="font-semibold">TAGS</h3>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <button
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-green-100 hover:text-green-700 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

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
