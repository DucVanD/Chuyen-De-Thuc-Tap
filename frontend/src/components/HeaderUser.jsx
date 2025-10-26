import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

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

  // Tìm hàm này trong file HeaderUser.js (dòng 53)
  const handleCategoryClick = (slug, name) => {


    navigate(`/products?category=${slug}`, {
      state: { categorySlug: slug, categoryName: name },
    });

    setShowDropdown(false);
  };

  const handleLogout = () => {
    // Hộp thoại xác nhận
    const confirmLogout = window.confirm("Bạn có chắc muốn đăng xuất không?");
    if (confirmLogout) {
      dispatch(logout());
      toast.success("Đăng xuất thành công!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
      navigate("/");
    }
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

  //
  // Danh sách câu placeholder ngẫu nhiên
  const placeholders = [
    "Bạn muốn tìm gì?",
    "Trái cây",
    "Thực phẩm sạch",
  ];

  // State hiển thị placeholder động
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [index, setIndex] = useState(0);
  const [typing, setTyping] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingSpeed = isDeleting ? 100 : 100; // tốc độ gõ nhanh hơn khi xóa
    const currentText = placeholders[index];
    const handleTyping = () => {
      if (!isDeleting && typing.length < currentText.length) {
        setTyping(currentText.substring(0, typing.length + 1));
      } else if (isDeleting && typing.length > 0) {
        setTyping(currentText.substring(0, typing.length - 1));
      } else if (!isDeleting && typing.length === currentText.length) {
        // Dừng 2 giây trước khi xóa
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typing.length === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % placeholders.length);
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typing, isDeleting, index]);


  return (
    <header className="w-full bg-gray-100 shadow">
      {/* --- TOP BAR --- */}
      {/* 🔹 Desktop */}
      <div className="hidden md:flex h-[35px] bg-emerald-600 text-gray-50 justify-between items-center px-4 md:px-20 text-sm">
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
      <div className="flex md:hidden h-[35px] bg-emerald-600 text-gray-50 justify-center px-4 text-sm gap-10 relative">
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
              placeholder={typing}
              className="w-full rounded-full border border-gray-300 pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
            />
            <button type="submit">
              <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            </button>
          </div>

          {/* Icon mua nhanh */}
          <button
            onClick={handleQuickCheckout}
            className="bg-red-600 text-white p-2 rounded-full shadow hover:bg-red-700 transition animate-bounce  relative" style={{ animationDuration: "0.8s" }}
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
              placeholder={typing}
              className="w-full rounded-full border border-gray-200 bg-gray-50 pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <button type="submit">
              <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            </button>
          </form>
        </div>

        <div className="flex gap-4 w-6/12 justify-end">
          {menuItems.map((item, i) => {
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={i}
                to={item.href}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-full border font-medium text-sm transition
        ${isActive
                    ? "bg-amber-300 border-amber-400 text-green-800 shadow" // ✅ giữ màu amber khi active
                    : "bg-white border-gray-200 text-green-700 hover:bg-amber-300 hover:text-green-800"
                  }`}
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
            );
          })}


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

        {/* UL Nút điều hướng đã đồng bộ */}
        <ul className="flex flex-wrap justify-center gap-2 items-center">
          {/* Hàm kiểm tra active */}
          {(() => {
            const isActive = (path) => {
              if (path === "/products" && location.pathname.startsWith("/products"))
                return true;
              return location.pathname === path;
            };

            return (
              <>
                {/* Trang chủ */}
                <li>
                  <Link
                    to="/"
                    className={`py-2 px-4 rounded-full transition focus:outline-none focus:ring-2 focus:ring-emerald-400 ${isActive("/")
                      ? "bg-emerald-700 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-emerald-700 hover:text-white"
                      }`}
                  >
                    Trang chủ
                  </Link>
                </li>

                {/* Giới thiệu */}
                <li>
                  <Link
                    to="/about"
                    className={`py-2 px-4 rounded-full transition focus:outline-none focus:ring-2 focus:ring-emerald-400 ${isActive("/about")
                      ? "bg-emerald-700 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-emerald-700 hover:text-white"
                      }`}
                  >
                    Giới thiệu
                  </Link>
                </li>

                {/* Sản phẩm (Dropdown) */}
                <li
                  className="relative group"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <Link
                    to="/products"
                    className={`py-2 px-4 rounded-full transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${isActive("/products") || showDropdown
                      ? "bg-emerald-700 text-white hover:bg-emerald-600"
                      : "bg-gray-200 text-gray-800 hover:bg-emerald-700 hover:text-white"
                      }`}
                  >
                    Sản phẩm
                    <FaSortDown
                      className={`transition-transform duration-300 ${showDropdown ? "rotate-180" : ""
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

                {/* Câu hỏi */}
                <li>
                  <Link
                    to="/request"
                    className={`py-2 px-4 rounded-full transition focus:outline-none focus:ring-2 focus:ring-emerald-400 ${isActive("/request")
                      ? "bg-emerald-700 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-emerald-700 hover:text-white"
                      }`}
                  >
                    Câu hỏi thường gặp
                  </Link>
                </li>

                {/* Tin tức */}
                <li>
                  <Link
                    to="/posts"
                    className={`py-2 px-4 rounded-full transition focus:outline-none focus:ring-2 focus:ring-emerald-400 ${isActive("/posts")
                      ? "bg-emerald-700 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-emerald-700 hover:text-white"
                      }`}
                  >
                    Tin tức
                  </Link>
                </li>

                {/* Liên hệ */}
                <li>
                  <Link
                    to="/contact"
                    className={`py-2 px-4 rounded-full transition focus:outline-none focus:ring-2 focus:ring-emerald-400 ${isActive("/contact")
                      ? "bg-emerald-700 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-emerald-700 hover:text-white"
                      }`}
                  >
                    Liên hệ
                  </Link>
                </li>
              </>
            );
          })()}
        </ul>

        {/* Nút Thanh toán nhanh */}
        <button
          onClick={handleQuickCheckout}
          className="bg-red-600 py-2 px-5 rounded-full text-white font-medium shadow hover:bg-red-700 transition animate-bounce"
          style={{ animationDuration: "0.7s" }}
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
