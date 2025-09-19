import logo from "../../assets/images/logo.png";
import { CiSearch } from "react-icons/ci";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { LuShuffle, LuHeart, LuShoppingBag } from "react-icons/lu";
import { Link } from "react-router-dom";
import { BiAlignLeft } from "react-icons/bi";
import slide from "../../assets/images/slide.png";
import thitheo from "../../assets/images/thitheo.png";
import rau from "../../assets/images/rau.png"; // hoặc tên file đúng

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const menuItems = [
  {
    label: "Hệ thống",
    count: 8,
    icon: <SiHomeassistantcommunitystore className="h-6 w-6" />,
    href: "/system",
  },
  {
    label: "So sánh",
    count: 0,
    icon: <LuShuffle className="h-6 w-6" />,
    href: "/compare",
  },
  {
    label: "Yêu thích",
    count: 0,
    icon: <LuHeart className="h-6 w-6" />,
    href: "/wishlist",
  },
  {
    label: "Giỏ hàng",
    count: 0,
    icon: <LuShoppingBag className="h-6 w-6" />,
    href: "/cart",
  },
];

const Home = () => {
  return (
    <>
      <div>
        <header className="w-full bg-gray-300">
          <div className="flex px-30 justify-center items-center gap-0">
            <div className="basis-6/12  flex py-5">
              {/*  */}
              <div className="basis-4/12">
                <img src={logo} alt="" width={200} />
              </div>
              {/*  */}
              <div className="relative w-full max-w-sm basis-8/12">
                <input
                  type="text"
                  placeholder="Trái cây"
                  className="w-95 ml-8 rounded-full border border-gray-200 bg-gray-50 
                   pl-4 pr-10 py-2.5 sm:py-3 outline-none 
                   focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                   text-sm sm:text-base"
                />
                <CiSearch className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              </div>
              {/*  */}
            </div>
            <div className="basis-6/12">
              <div className="flex gap-4 justify-around">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className="relative flex items-center gap-2 px-4 py-2 rounded-full 
                 border border-gray-200 bg-white hover:shadow"
                  >
                    {/* Icon + badge */}
                    <div className="relative">
                      {item.icon}
                      {item.count > -1 && (
                        <span
                          className="absolute -top-2 -right-2 bg-emerald-600 text-white 
                           text-xs rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          {item.count}
                        </span>
                      )}
                    </div>

                    {/* Label */}
                    <span className="text-sm text-gray-700 font-medium">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* nav */}
          <nav className="flex px-30 justify-center items-center gap-0 border-b border-gray-300 shadow-xl h-[100px] bg-amber-400">
            <div className="basis-3/12">
              {/* Nút mở danh mục */}
              <button className="flex items-center gap-2 w-full bg-amber-400 text-gray-800 font-medium px-4 py-3 rounded-t-md">
                <BiAlignLeft className="h-5 w-5" />
                <span>Danh mục sản phẩm</span>
              </button>

              {/* Danh sách menu con */}
              {/* <ul className="bg-white shadow border rounded-b-md divide-y">
                <li className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  <span className="flex items-center gap-2">
                    <img
                      src="/icons/vegetable.png"
                      alt="Rau củ quả"
                      className="h-5 w-5"
                    />
                    Rau củ quả
                  </span>
                  <span>›</span>
                </li>
               
              </ul> */}
            </div>

            <div className="basis-7/12">
              <ul className="flex justify-around">
                <li className="bg-green-600 py-1 px-4 rounded-full">
                  <Link>Trang chủ</Link>
                </li>
                <li className="bg-gray-200 py-1 px-4 rounded-full">
                  <Link>Giới thiệu</Link>
                </li>
                <li className="bg-gray-200 py-1 px-4 rounded-full">
                  <Link>Sản phẩm</Link>
                </li>
                <li className="bg-gray-200 py-1 px-4 rounded-full">
                  <Link>Câu hỏi thường gặp</Link>
                </li>
                <li className="bg-gray-200 py-1 px-4 rounded-full">
                  <Link>Tin tức</Link>
                </li>
                <li className="bg-gray-200 py-1 px-4 rounded-full">
                  <Link>Liên hệ</Link>
                </li>
              </ul>
            </div>
            <div className="basis-2/12 text-center">
              <Link className="bg-red-600 py-1 px-4 rounded-full text-white animate-zoom">
                Mua hàng nhanh
              </Link>
            </div>
          </nav>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-10">
          <section className="slide flex justify-center mt-3">
            <img
              src={slide}
              alt=""
              className="w-full object-cover h-auto rounded-sm"
            />
          </section>

          <section className="mt-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <Link className="text-[25px] font-medium">
                  Danh mục nổi bật
                </Link>
              </div>
              <div className="flex gap-4 overflow-x-auto">
                <Link className="whitespace-nowrap">Trái cây</Link>
                <Link className="whitespace-nowrap">Rau củ quả</Link>
                <Link className="whitespace-nowrap">Thực phẩm sạch</Link>
              </div>
              <div className="flex gap-3 justify-end">
                {/* Nút Prev */}
                <button
                  onClick={() =>
                    document
                      .getElementById("category-list")
                      .scrollBy({ left: -200, behavior: "smooth" })
                  }
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
                >
                  <MdArrowBackIos className="text-gray-600" />
                </button>

                {/* Nút Next */}
                <button
                  onClick={() =>
                    document
                      .getElementById("category-list")
                      .scrollBy({ left: 200, behavior: "smooth" })
                  }
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
                >
                  <MdArrowForwardIos className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Slider */}
            <div className="relative">
              <div
                id="category-list"
                className="flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {/* Card sản phẩm */}

                <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                  <img
                    src={thitheo}
                    alt="Nước uống"
                    className="h-20 object-contain mb-2"
                  />
                  <h3 className="text-sm font-medium text-gray-800">
                    Nước uống
                  </h3>
                  <p className="text-xs text-gray-500">9 sản phẩm</p>
                </div>
                <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                  <img
                    src={thitheo}
                    alt="Nước uống"
                    className="h-20 object-contain mb-2"
                  />
                  <h3 className="text-sm font-medium text-gray-800">
                    Nước uống
                  </h3>
                  <p className="text-xs text-gray-500">9 sản phẩm</p>
                </div>
                <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                  <img
                    src={thitheo}
                    alt="Nước uống"
                    className="h-20 object-contain mb-2"
                  />
                  <h3 className="text-sm font-medium text-gray-800">
                    Nước uống
                  </h3>
                  <p className="text-xs text-gray-500">9 sản phẩm</p>
                </div>
                <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                  <img
                    src={thitheo}
                    alt="Nước uống"
                    className="h-20 object-contain mb-2"
                  />
                  <h3 className="text-sm font-medium text-gray-800">
                    Nước uống
                  </h3>
                  <p className="text-xs text-gray-500">9 sản phẩm</p>
                </div>
                <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                  <img
                    src={thitheo}
                    alt="Nước uống"
                    className="h-20 object-contain mb-2"
                  />
                  <h3 className="text-sm font-medium text-gray-800">
                    Nước uống
                  </h3>
                  <p className="text-xs text-gray-500">9 sản phẩm</p>
                </div>
                <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                  <img
                    src={thitheo}
                    alt="Nước uống"
                    className="h-20 object-contain mb-2"
                  />
                  <h3 className="text-sm font-medium text-gray-800">
                    Nước uống
                  </h3>
                  <p className="text-xs text-gray-500">9 sản phẩm</p>
                </div>
                <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                  <img
                    src={rau}
                    alt="Nước uống"
                    className="h-20 object-contain mb-2"
                  />
                  <h3 className="text-sm font-medium text-gray-800">
                    Nước uống
                  </h3>
                  <p className="text-xs text-gray-500">9 sản phẩm</p>
                </div>
              </div>
            </div>
          </section>

          {/*  */}

          <section className="mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
              {/* Banner bên trái */}
              <div className="lg:col-span-1 rounded-2xl bg-gradient-to-br from-amber-300 to-emerald-300 p-5 sm:p-6 flex flex-col justify-between min-h-[220px] sm:min-h-[360px]">
                <div>
                  <h3 className="text-lg sm:text-2xl font-semibold leading-snug">
                    Bán chạy nhất hàng ngày
                  </h3>
                  <p className="mt-2 sm:mt-3 text-emerald-900 text-sm sm:text-base">
                    Ưu đãi độc quyền - Giảm giá 20%
                  </p>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-emerald-900/80 max-w-xs">
                    Mua sắm thoải mái chỉ từ 20.000 VNĐ. Chỉ trong tuần này,
                    đừng bỏ lỡ.
                  </p>
                </div>
                <button className="self-start mt-4 sm:mt-6 rounded-full bg-white text-emerald-700 px-4 sm:px-5 py-2 text-sm sm:text-base font-medium shadow hover:shadow-md">
                  Mua ngay
                </button>
              </div>

              {/* Lưới sản phẩm */}
              <div className="lg:col-span-3">
                {/* Header với nút điều hướng */}
                <div className="flex gap-3 justify-end">
                  {/* Nút Prev */}
                  <button
                    onClick={() =>
                      document
                        .getElementById("product-list")
                        .scrollBy({ left: -200, behavior: "smooth" })
                    }
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
                  >
                    <MdArrowBackIos className="text-gray-600" />
                  </button>

                  {/* Nút Next */}
                  <button
                    onClick={() =>
                      document
                        .getElementById("product-list")
                        .scrollBy({ left: 200, behavior: "smooth" })
                    }
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
                  >
                    <MdArrowForwardIos className="text-gray-600" />
                  </button>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="relative">
                  <div
                    id="product-list"
                    className="flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={thitheo}
                        alt="Nước uống"
                        className="h-20 object-contain mb-2"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={thitheo}
                        alt="Nước uống"
                        className="h-20 object-contain mb-2"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={thitheo}
                        alt="Nước uống"
                        className="h-20 object-contain mb-2"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={thitheo}
                        alt="Nước uống"
                        className="h-20 object-contain mb-2"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={thitheo}
                        alt="Nước uống"
                        className="h-20 object-contain mb-2"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={thitheo}
                        alt="Nước uống"
                        className="h-20 object-contain mb-2"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer></footer>
      </div>
    </>
  );
};

export default Home;
