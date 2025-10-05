import { Link } from "react-router-dom";
import logo from "/src/assets/images/logo.png";
import { CiSearch } from "react-icons/ci";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { LuShuffle, LuHeart, LuShoppingBag } from "react-icons/lu";
import { BiAlignLeft } from "react-icons/bi";
import { FaUser, FaSortDown, FaSortUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiCategory from "../api/apiCategory";
import { imageURL } from "../api/config";
const HeaderUser = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0); // tổng số lượng
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiCategory.getParentsWithChildren();
        if (res.status) setCategories(res.data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  const menuItems = [
    {
      label: "Hệ thống",
      count: 8,
      icon: <SiHomeassistantcommunitystore className="h-6 w-6" />,
      href: "/system",
    },
    {
      label: "So sánh",
      count: 2,
      icon: <LuShuffle className="h-6 w-6" />,
      href: "/compare",
    },
    {
      label: "Yêu thích",
      count: 3,
      icon: <LuHeart className="h-6 w-6" />,
      href: "/wishlist",
    },
    {
      label: "Giỏ hàng",
      count: cartCount,
      icon: <LuShoppingBag className="h-6 w-6" />,
      href: "/cart",
    },
  ];

  // xu ly tim kiem

  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${keyword}`);
      setKeyword(""); // reset lại input
    }
  };

  // xu ly menu san pham
  const handleCategoryClick = (slug, name) => {
    navigate("/products", {
      state: { categorySlug: slug, categoryName: name },
    });
    setOpenMenu(false);
  };

  return (
    <header className="w-full bg-gray-200">
      {/* Top bar */}
      <div className="h-[35px] bg-green-700 text-gray-50 flex justify-between items-center px-4 md:px-20 text-sm">
        <h4 className="truncate">Chào mừng bạn đến với Bean Farm!</h4>
        <div className="flex gap-4 md:gap-6 text-xs md:text-sm">
          <div className="flex items-center gap-1">
            <FaUser />
            <Link to="/registered" className="hover:text-amber-400 truncate">
              Tài Khoản
            </Link>
          </div>
          <div className="flex items-center gap-1 truncate">
            <span>Hotline:</span>
            <Link to="/hotline" className="hover:text-amber-400">
              1900 6789
            </Link>
          </div>
        </div>
      </div>

      {/* Logo + Search + Menu Items */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-3 gap-3 md:gap-0">
        <div className="flex flex-col md:flex-row items-center w-full md:w-6/12 gap-3 md:gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={logo} alt="logo" className="w-32 md:w-44" />
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="relative flex-1">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm sản phẩm..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
            <button type="submit">
              <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Menu Items */}
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-end w-full md:w-6/12">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="relative flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-white text-green-700 font-medium hover:bg-amber-300 hover:text-green-700 transition text-xs md:text-sm"
            >
              <div className="relative">
                {item.icon}
                {item.count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-2 bg-gray-100 border-b border-gray-300 shadow-md gap-2">
        {/* Category button */}
        <div className="w-full md:w-auto">
          <button className="flex items-center gap-2 w-full md:w-auto bg-amber-400 text-gray-800 font-medium px-4 py-2 rounded-md hover:bg-amber-500 transition">
            <BiAlignLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Danh mục sản phẩm</span>
          </button>
        </div>

        {/* Main Menu */}
        <ul className="flex flex-wrap justify-center md:justify-evenly gap-2 w-full md:w-auto items-center">
          <li>
            <Link
              to="/"
              className="bg-green-600 text-white py-2 px-4 md:px-5 rounded-full hover:bg-green-700 transition text-sm md:text-base"
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="bg-gray-200 py-2 px-4 md:px-5 rounded-full hover:bg-green-600 hover:text-white transition text-sm md:text-base"
            >
              Giới thiệu
            </Link>
          </li>
     <li
  className="relative group"
  onMouseEnter={() => setOpenMenu(true)}
  onMouseLeave={() => setOpenMenu(false)}
>
  {/* Nút chính “Sản phẩm” */}
  <Link
    to="/products"
    className={`py-2 px-4 md:px-5 rounded-full transition flex items-center gap-1 text-sm md:text-base relative
      ${
        openMenu
          ? "bg-green-600 text-white"
          : "bg-gray-200 text-gray-800 hover:bg-green-600 hover:text-white"
      }`}
  >
    Sản phẩm
    <span
      className={`transition-transform duration-400 ${
        openMenu ? "rotate-180 mt-2" : ""
      }`}
    >
      <FaSortDown className="text-sm" />
    </span>
  </Link>

  {/* Mega Menu */}
  {openMenu && (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full md:w-[700px] bg-white shadow-lg border border-gray-300 rounded-xl p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 z-50 mt-1 animate-fadeIn">
      {categories.length > 0 ? (
        categories.map((cat) => (
          <div key={cat.id}>
            {/* Danh mục cha */}
            <button
              onClick={() => handleCategoryClick(cat.slug, cat.name)}
              className="flex items-center gap-3 mb-2 hover:text-green-600 transition"
            >
              <img
                src={`${imageURL}/category/${cat.image}`}
                alt={cat.name}
                className="w-10 h-10 object-cover rounded-full border border-gray-200"
              />
              <span className="font-semibold text-green-700 text-left">
                {cat.name}
              </span>
            </button>

            {/* Danh mục con */}
            <ul className="ml-12 space-y-1 text-sm">
              {cat.children && cat.children.length > 0 ? (
                cat.children.map((child) => (
                  <li key={child.id}>
                    <button
                      onClick={() =>
                        handleCategoryClick(child.slug, child.name)
                      }
                      className="text-gray-600 hover:text-green-600 transition"
                    >
                      {child.name}
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 italic">Đang cập nhật</li>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p className="col-span-3 text-center text-gray-500">
          Đang tải danh mục...
        </p>
      )}
    </div>
  )}
</li>


          <li>
            <Link
              to="/request"
              className="bg-gray-200 py-2 px-4 md:px-5 rounded-full hover:bg-green-600 hover:text-white transition text-sm md:text-base"
            >
              Câu hỏi thường gặp
            </Link>
          </li>
          <li>
            <Link
              to="/posts"
              className="bg-gray-200 py-2 px-4 md:px-5 rounded-full hover:bg-green-600 hover:text-white transition text-sm md:text-base"
            >
              Tin tức
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="bg-gray-200 py-2 px-4 md:px-5 rounded-full hover:bg-green-600 hover:text-white transition text-sm md:text-base"
            >
              Liên hệ
            </Link>
          </li>
        </ul>

        {/* Quick buy button */}
        <div className="w-full md:w-auto text-center mt-2 md:mt-0">
          <Link
            to="/checkout"
            className="bg-red-600 py-2 px-4 md:px-5 rounded-full text-white font-medium shadow hover:bg-red-700 transition animate-bounce text-sm md:text-base"
          >
            Mua hàng nhanh
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HeaderUser;
