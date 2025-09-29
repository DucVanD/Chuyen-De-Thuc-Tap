import { Link } from "react-router-dom";
import logo from "/src/assets/images/logo.png";
import { CiSearch } from "react-icons/ci";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { LuShuffle, LuHeart, LuShoppingBag } from "react-icons/lu";
import { BiAlignLeft } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
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

const HeaderUser = () => {
  return (
    <>
      <header className="w-full  bg-gray-200">
        <div className="h-[35px] bg-green-700 text-gray-50 flex justify-between items-center px-20">
          <h4>Chào mừng bạn đến với Bean Farm!</h4>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <FaUser />
              <Link to="/registered" className="hover:text-amber-400">
                Tài Khoản
              </Link>
            </div>

            <div>
              <span>Hotline:</span>
              <Link to="/hotline" className="hover:text-amber-400">
                {" "}
                1900 6789
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row px-4 md:px-10 lg:px-10 justify-center items-center gap-2 md:gap-0">
          <div className="w-full md:basis-6/12 flex flex-col md:flex-row py-3 items-center px-6">
            <div className="w-full md:basis-4/12 flex justify-center md:justify-start mb-2 md:mb-0">
              <img
                src={logo}
                alt=""
                width={140}
                className="max-w-[60vw] md:w-[200px]"
              />
            </div>
            <div className="relative ml-15 w-full md:max-w-sm md:basis-8/12 mt-2 md:mt-0">
              <input
                type="text"
                placeholder="Trái cây"
                className="w-full rounded-full border border-gray-200 bg-gray-50 pl-4 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
              <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            </div>
          </div>
          <div className="w-full md:basis-6/12 mt-3 md:mt-0">
            <div className="flex flex-wrap gap-2 md:gap-4 justify-evenly">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="relative flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-white hover:shadow text-xs md:text-sm"
                >
                  <div className="relative">
                    {item.icon}
                    {item.count > -1 && (
                      <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.count}
                      </span>
                    )}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* nav */}
        <nav className="flex flex-col md:flex-row px-2 sm:px-6 md:px-20 lg:px-30 justify-center items-center gap-2 border-b border-gray-300 shadow-xl h-auto md:h-[70px] bg-gray-100">
          <div className="w-full md:basis-2/12 mb-2 md:mb-0">
            <button className="flex items-center gap-2 w-full bg-amber-400 text-gray-800 font-medium px-3 py-1 rounded-sm hover:bg-amber-500">
              <BiAlignLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Danh mục sản phẩm</span>
            </button>
          </div>
          <div className="w-full md:basis-8/12">
            <ul className="flex flex-wrap justify-evenly gap-2">
              <li className="bg-green-600 py-1 px-4 rounded-full">
                <Link to="">Trang chủ</Link>
              </li>
              <li className="bg-gray-200 py-1 px-4 rounded-full">
                <Link to="about">Giới thiệu</Link>
              </li>
              <li className="bg-gray-200 py-1 px-4 rounded-full">
                <Link to="products">Sản phẩm</Link>
              </li>
              <li className="bg-gray-200 py-1 px-4 rounded-full">
                <Link to="request">Câu hỏi thường gặp</Link>
              </li>
              <li className="bg-gray-200 py-1 px-4 rounded-full">
                <Link to="posts">Tin tức</Link>
              </li>
              <li className="bg-gray-200 py-1 px-4 rounded-full">
                <Link to="contact">Liên hệ</Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:basis-2/12 text-center mt-2 md:mt-0">
            <Link className="bg-red-600 py-1 px-4 rounded-full text-white animate-zoom">
              Mua hàng nhanh
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default HeaderUser;
