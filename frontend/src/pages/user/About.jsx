
import { Link } from "react-router-dom";
import { FaHome, FaLeaf, FaCheck, FaUsers, FaStore, FaCalendarAlt } from "react-icons/fa";

const About = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-600">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-semibold">Giới thiệu</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              <span className="text-green-600">BEAN FARM</span>
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Chất lượng và tươi xanh
            </h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>
                Thực phẩm sạch, hữu cơ (organic) đang là xu hướng tiêu dùng tại các nước phát triển. 
                Những đột phá trong thói quen ăn uống tại Mỹ đã tạo ra sự bùng nổ của thị trường thực phẩm hữu cơ.
              </p>
              <p>
                Tại châu Âu, thị trường thực phẩm hữu cơ đã phát triển mạnh mẽ với nhiều quy định nghiêm ngặt. 
                Bean Farm cam kết cung cấp các sản phẩm nông nghiệp theo quy định hữu cơ, đảm bảo chất lượng 
                và an toàn cho sức khỏe người tiêu dùng.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/assets/images/about-hero.jpg"
              alt="Bean Farm - Nông sản hữu cơ"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-green-600 font-semibold">Bean Farm</p>
              <p className="text-gray-600 text-sm">Chất lượng - Tươi xanh</p>
            </div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Vision */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <FaLeaf className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">TẦM NHÌN</h3>
                <p className="text-green-600 font-medium">Tầm nhìn của chúng tôi</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Bean Farm được thành lập với mong muốn nhập khẩu và cung cấp các sản phẩm hữu cơ chất lượng cao, 
              có chứng nhận cho các nhà phân phối tại Việt Nam. Chúng tôi tìm hiểu các thương hiệu lớn phù hợp 
              với thị trường và thu nhập của người Việt Nam.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <FaCheck className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">MỤC TIÊU</h3>
                <p className="text-green-600 font-medium">Mục tiêu của chúng tôi</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Chúng tôi đã kết nối và phân phối sản phẩm cho các đối tác lớn tại TP. Hồ Chí Minh và Hà Nội. 
              Trong tương lai gần, chúng tôi sẽ mở rộng phân phối ra các tỉnh thành khác.
            </p>
            <div className="relative">
              <img
                src="/assets/images/about-mission.jpg"
                alt="Mở rộng phân phối"
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
              <div className="absolute bottom-2 left-2 text-white">
                <p className="text-sm font-medium">Phát triển và mở rộng</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-green-600 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-2">
                <FaCalendarAlt className="text-2xl mr-2" />
              </div>
              <div className="text-3xl font-bold mb-1">2</div>
              <div className="text-sm opacity-90">Năm Kinh Nghiệm</div>
            </div>
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-2">
                <FaUsers className="text-2xl mr-2" />
              </div>
              <div className="text-3xl font-bold mb-1">200</div>
              <div className="text-sm opacity-90">Nhân Viên</div>
            </div>
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-2">
                <FaUsers className="text-2xl mr-2" />
              </div>
              <div className="text-3xl font-bold mb-1">3000+</div>
              <div className="text-sm opacity-90">Khách Hàng</div>
            </div>
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-2">
                <FaStore className="text-2xl mr-2" />
              </div>
              <div className="text-3xl font-bold mb-1">8</div>
              <div className="text-sm opacity-90">Cửa Hàng</div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Tại sao chọn chúng tôi
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Với kinh nghiệm trong lĩnh vực nông sản, chúng tôi cam kết mang đến chất lượng tốt nhất, 
              sản phẩm tươi sạch, phân phối uy tín và dịch vụ chuyên nghiệp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Distribution */}
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHome className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">PHÂN PHỐI</h3>
              <p className="text-gray-600 leading-relaxed">
                Xây dựng chuỗi cung ứng nông sản hàng đầu tại Việt Nam với hệ thống phân phối 
                rộng khắp và dịch vụ giao hàng nhanh chóng.
              </p>
            </div>

            {/* Products */}
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">SẢN PHẨM</h3>
              <p className="text-gray-600 leading-relaxed">
                Tìm kiếm và nhập khẩu sản phẩm hữu cơ chất lượng cao từ các thị trường 
                Châu Âu, Mỹ với các chứng nhận quốc tế uy tín.
              </p>
            </div>

            {/* Quality */}
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">CHẤT LƯỢNG</h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                Các chứng nhận uy tín cho nông sản được phân phối:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Demeter", "EU Organic", "USDA", "AIAB", "Vegan"].map((cert) => (
                  <span
                    key={cert}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Bắt đầu hành trình sức khỏe với Bean Farm
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Khám phá thế giới nông sản hữu cơ chất lượng cao và trải nghiệm dịch vụ 
            phân phối chuyên nghiệp của chúng tôi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Xem sản phẩm
            </Link>
            <Link
              to="/contact"
              className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors font-medium"
            >
              Liên hệ ngay
            </Link>
          </div>
        </div>
    </div>
    </>
  );
};

export default About;