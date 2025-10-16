import { Link, useNavigate } from "react-router-dom";
import logo from "/src/assets/images/logo.png";
import { CiSearch } from "react-icons/ci";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { LuShuffle, LuHeart, LuShoppingBag } from "react-icons/lu";
import { BiAlignLeft } from "react-icons/bi";
import { FaUser, FaSortDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import apiCategory from "../api/apiCategory";
import { imageURL } from "../api/config";
import { logout } from "../Redux/authSlice";
import { toast } from "react-toastify";
import { TbBrandShopee } from "react-icons/tb";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
const HeaderUser = () => {
  const [openMenu, setOpenMenu] = useState(false); // Menu mobile
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown desktop
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const [showLogout, setShowLogout] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load danh mục
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${keyword}`);
      setKeyword("");
    }
  };

  const handleCategoryClick = (slug, name) => {
    navigate("/products", {
      state: { categorySlug: slug, categoryName: name },
    });
    setShowDropdown(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleQuickCheckout = (e) => {
    e.preventDefault();
    if (!user) {
      toast.warn("Vui lòng đăng nhập để thanh toán!", {
        position: "top-right",
        autoClose: 1000,
      });
      navigate("/registered");
      return;
    }
    navigate("/checkout");
  };

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
      label: "Lịch sử",
      count: 0,
      icon: <HiOutlineClipboardDocumentCheck className="h-6 w-6" />,
      href: "/history-bought",
    },
    {
      label: "Giỏ hàng",
      count: cartCount,
      icon: <LuShoppingBag className="h-6 w-6" />,
      href: "/cart",
    },
  ];

  return (
    <header className="w-full bg-gray-100 shadow">
      {/* --- TOP BAR --- */}
      {/* 🔹 Desktop */}
      <div className="hidden md:flex h-[35px] bg-green-700 text-gray-50 justify-between items-center px-4 md:px-20 text-sm">
        <h4 className="truncate">Chào mừng bạn đến với Bean Farm!</h4>

        <div className="flex gap-6 text-xs md:text-sm">
          {/* User */}
          <div className="flex items-center gap-1 relative">
            <FaUser />
            {user ? (
              <div className="relative group">
                <span className="cursor-pointer hover:text-amber-400 flex items-start gap-1">
                  {user.name} <FaSortDown />
                </span>
                <div className="absolute right-0 hidden group-hover:block bg-white shadow rounded  min-w-[120px] z-50">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/registered" className="hover:text-amber-400">
                Tài khoản
              </Link>
            )}
          </div>

          {/* Hotline */}
          <div className="flex items-center gap-1">
            <span>Hotline:</span>
            <Link to="/hotline" className="hover:text-amber-400">
              1900 6750
            </Link>
          </div>
        </div>
      </div>

      {/* 🔹 Mobile */}
      <div className="flex md:hidden h-[35px] bg-green-700 text-gray-50 justify-center px-4 text-sm gap-10 relative">
      {/* Tài khoản */}
      <div className="flex items-center gap-1 relative">
        <FaUser />
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowLogout(!showLogout)}
              className="flex items-center gap-1 hover:text-amber-400 focus:outline-none"
            >
              {user.name} <FaSortDown />
            </button>

            {showLogout && (
              <div className="absolute right-0 mt-1 bg-white text-gray-800 rounded shadow z-50 min-w-[120px]">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/registered" className="hover:text-amber-400">
            Tài khoản
          </Link>
        )}
      </div>

      {/* Hotline */}
      <div className="flex items-center gap-1">
        <span>Hotline:</span>
        <Link to="/hotline" className="hover:text-amber-400">
          1900 6750
        </Link>
      </div>
    </div>

      {/* --- MOBILE HEADER --- */}
      <div className="flex md:hidden justify-between items-center px-4 py-2 bg-gray-100 text-black">
        <button onClick={() => setOpenMenu(!openMenu)}>
          <BiAlignLeft className="h-7 w-7" />
        </button>

        <Link to="/">
          <img src={logo} alt="logo" className="h-10 cursor-pointer" />
        </Link>

        <Link to="/cart" className="relative">
          <LuShoppingBag className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* --- MOBILE SEARCH BAR --- */}
      {/* Thanh tìm kiếm + nút mua nhanh (Mobile Only) */}
<div className="md:hidden px-4 py-2 bg-gray-100 shadow">
      <form onSubmit={handleSearch} className="relative flex items-center gap-2">
        {/* Ô tìm kiếm */}
        <div className="relative flex-1">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm sản phẩm..."
            className="w-full rounded-full border border-gray-300 pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
          />
          <button type="submit">
            <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
          </button>
        </div>

        {/* Icon mua nhanh */}
        <button
          onClick={handleQuickCheckout}
          className="bg-red-600 text-white p-2 rounded-full shadow hover:bg-red-700 transition animate-bounce  relative"  style={{ animationDuration: "0.8s" }} 
          title="Mua hàng nhanh"
        >
          <TbBrandShopee className="h-5 w-5 " />
        </button>
      </form>
    </div>


      {/* --- DESKTOP HEADER --- */}
      <div className="hidden md:flex items-center justify-between px-10 py-3 bg-gray-50">
        <div className="flex items-center gap-4 w-6/12">
          <img src={logo} alt="logo" className="w-44" />
          <form onSubmit={handleSearch} className="relative flex-1">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm sản phẩm..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <button type="submit">
              <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            </button>
          </form>
        </div>

        <div className="flex gap-4 w-6/12 justify-end">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              to={item.href}
              className="relative flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-white text-green-700 font-medium hover:bg-amber-300 transition text-sm"
            >
              <div className="relative">
                {item.icon}
                {item.count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </div>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* --- DESKTOP NAVIGATION --- */}
      <nav className="hidden md:flex items-center justify-between px-10 py-2 bg-gray-100 border-b border-gray-300 shadow-md gap-2 relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 bg-amber-400 text-gray-800 font-medium px-4 py-2 rounded-md hover:bg-amber-500 transition"
        >
          <BiAlignLeft className="h-5 w-5" />
          <span>Danh mục sản phẩm</span>
        </button>

        <ul className="flex flex-wrap justify-center gap-2 items-center">
          <li>
            <Link
              to="/"
              className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition"
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="bg-gray-200 py-2 px-4 rounded-full hover:bg-green-600 hover:text-white transition"
            >
              Giới thiệu
            </Link>
          </li>
          <li
            className="relative group"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <Link
              to="/products"
              className={`py-2 px-4 rounded-full transition flex items-center gap-1 ${
                showDropdown
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-green-600 hover:text-white"
              }`}
            >
              Sản phẩm
              <FaSortDown
                className={`transition-transform duration-300 ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </Link>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[700px] bg-white shadow-lg border border-gray-300 rounded-xl p-6 grid grid-cols-3 gap-4 z-50 animate-fadeIn">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <div key={cat.id}>
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
                      <ul className="ml-12 space-y-1 text-sm">
                        {cat.children?.length ? (
                          cat.children.map((child) => (
                            <li key={child.id}>
                              <button
                                onClick={() =>
                                  handleCategoryClick(child.slug, child.name)
                                }
                                className="text-gray-600 hover:text-green-600 transition w-full text-left"
                              >
                                {child.name}
                              </button>
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-400 italic">
                            Đang cập nhật
                          </li>
                        )}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    Đang tải danh mục...
                  </p>
                )}
              </div>
            )}
          </li>
          <li>
            <Link
              to="/request"
              className="bg-gray-200 py-2 px-4 rounded-full hover:bg-green-600 hover:text-white transition"
            >
              Câu hỏi thường gặp
            </Link>
          </li>
          <li>
            <Link
              to="/posts"
              className="bg-gray-200 py-2 px-4 rounded-full hover:bg-green-600 hover:text-white transition"
            >
              Tin tức
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="bg-gray-200 py-2 px-4 rounded-full hover:bg-green-600 hover:text-white transition"
            >
              Liên hệ
            </Link>
          </li>
        </ul>

        <button
          onClick={handleQuickCheckout}
          className="bg-red-600 py-2 px-5 rounded-full text-white font-medium shadow hover:bg-red-700 transition animate-bounce" style={{ animationDuration: "0.7s" }} 
        >
          Thanh toán nhanh
        </button>
      </nav>

      {/* --- MOBILE SIDEBAR --- */}
      {openMenu && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto animate-fadeIn">
          <button
            onClick={() => setOpenMenu(false)}
            className="mb-4 text-red-600 font-bold"
          >
            ✕ Đóng
          </button>
          <ul className="space-y-3">
            <li>
              <Link to="/" onClick={() => setOpenMenu(false)}>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setOpenMenu(false)}>
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setOpenMenu(false)}>
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link to="/request" onClick={() => setOpenMenu(false)}>
                Câu hỏi thường gặp
              </Link>
            </li>
            <li>
              <Link to="/posts" onClick={() => setOpenMenu(false)}>
                Tin tức
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setOpenMenu(false)}>
                Liên hệ
              </Link>
            </li>
            <li>
              <button
                onClick={handleQuickCheckout}
                className="w-full bg-red-600 text-white py-2 rounded-full mt-4"
              >
                Mua hàng nhanh
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default HeaderUser;
