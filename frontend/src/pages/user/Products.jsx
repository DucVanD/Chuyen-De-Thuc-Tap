import { FaSortAmountDownAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import apiProduct from "../../api/apiProduct";
import apiCategory from "../../api/apiCategory";
import apiBrand from "../../api/apiBrand";
import ProductItem from "./ProductItem";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    category_ids: [],
    brand_ids: [],
    min_price: "",
    max_price: "",
    sort_by: "created_at",
    sort_order: "desc",
  });

  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const keyword = searchParams.get("keyword");
  const categorySlug = location.state?.categorySlug || searchParams.get("category");
  const pageParam = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageParam);

  // Lấy tên danh mục một cách linh động sau khi đã có danh sách categories
  const categoryName = categories.find(cat => cat.slug === categorySlug)?.name || "Danh mục sản phẩm";

  // ✅ BƯỚC 1: Lấy dữ liệu nền (danh mục, thương hiệu) chỉ một lần khi component được tạo
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          apiCategory.getAll(),
          apiBrand.getAll(),
        ]);
        setCategories(catRes.data.data || []);
        setBrands(brandRes.data.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy danh mục/thương hiệu:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ BƯỚC 2: Đồng bộ `categorySlug` từ URL vào `state` filters.
  // Đây là mấu chốt quan trọng nhất để sửa lỗi.
  useEffect(() => {
    // Chỉ thực hiện khi đã có danh sách categories để tìm ID
    if (categories.length > 0) {
      const matchedCategory = categories.find(cat => cat.slug === categorySlug);
      // Nếu tìm thấy category khớp với slug, lấy id của nó. Nếu không, trả về mảng rỗng.
      const categoryIdArray = matchedCategory ? [matchedCategory.id] : [];
      
      setFilters(prevFilters => ({
        ...prevFilters,
        category_ids: categoryIdArray,
      }));
    }
  }, [categorySlug, categories]); // Chạy lại khi slug hoặc danh sách categories thay đổi

  // ✅ BƯỚC 3: Gộp toàn bộ logic lấy sản phẩm vào một useEffect duy nhất.
  // useEffect này sẽ phản ứng với sự thay đổi của `filters`, `keyword` và `page`.
  useEffect(() => {
    // Điều kiện này ngăn việc gọi API khi `categorySlug` có nhưng `filters` chưa kịp cập nhật
    if (categorySlug && filters.category_ids.length === 0 && categories.length > 0) {
      return;
    }
    
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let resData;
        
        // Luôn ưu tiên tìm kiếm bằng keyword
        if (keyword) {
          resData = await apiProduct.search(keyword);
          setProducts(resData.data || []);
          setTotalPages(1);
        } 
        // Nếu có bất kỳ bộ lọc nào được áp dụng, gọi API filter
        else if (filters.category_ids.length > 0 || filters.brand_ids.length > 0 || filters.min_price || filters.max_price) {
          resData = await apiProduct.filter({ ...filters, page });
          setProducts(resData.data.data || []);
          setTotalPages(resData.data.last_page || 1);
        } 
        // Trường hợp mặc định: không có keyword, không có filter
        else {
          resData = await apiProduct.getAll(page);
          setProducts(resData.data.data || []);
          setTotalPages(resData.data.last_page || 1);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        setProducts([]); // Reset sản phẩm nếu có lỗi
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, keyword, page]); // Phụ thuộc vào filters, keyword và page

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  
  const handleChangePage = (newPage) => {
    setPage(newPage);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    setSearchParams(newParams);
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const currentValues = prev[type];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [type]: newValues };
    });
    setPage(1); // Reset về trang 1 khi thay đổi filter
  };

  const handlePriceFilter = (range) => {
    const map = {
      "Dưới 100.000đ": { min: "0", max: "100000" },
      "100.000đ - 200.000đ": { min: "100000", max: "200000" },
      "200.000đ - 300.000đ": { min: "200000", max: "300000" },
      "300.000đ - 500.000đ": { min: "300000", max: "500000" },
      "Trên 500.000đ": { min: "500000", max: "999999999" },
    };
    const { min, max } = map[range];
    setFilters(prev => {
      // Nếu mức giá đã được chọn, bấm lại để bỏ chọn
      if (prev.min_price === min && prev.max_price === max) {
        return { ...prev, min_price: "", max_price: "" };
      }
      return { ...prev, min_price: min, max_price: max };
    });
    setPage(1); // Reset về trang 1 khi thay đổi filter
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    let newSort = {};
    if (value === "price_asc") {
      newSort = { sort_by: "price_sale", sort_order: "asc" };
    } else if (value === "price_desc") {
      newSort = { sort_by: "price_sale", sort_order: "desc" };
    } else { // Mặc định hoặc mới nhất
      newSort = { sort_by: "created_at", sort_order: "desc" };
    }
    setFilters(prev => ({ ...prev, ...newSort }));
  };

  const priceFilters = [
    "Dưới 100.000đ",
    "100.000đ - 200.000đ",
    "200.000đ - 300.000đ",
    "300.000đ - 500.000đ",
    "Trên 500.000đ",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h1 className="text-xl font-bold">Sản phẩm</h1>
        <button
          onClick={toggleSidebar}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Bộ lọc
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <aside
          className={`bg-white rounded-2xl shadow p-4 md:w-1/4 ${showSidebar ? "block" : "hidden md:block"}`}
        >
          <h2 className="font-bold text-green-700 mb-3">DANH MỤC SẢN PHẨM</h2>
          <ul className="space-y-2 max-h-40 overflow-y-auto scrollbar-hide">
            {categories
              .filter(c => c.parent_id !== 0)
              .map(c => (
                <label key={c.id} className="flex gap-1 hover:text-green-600 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    className="accent-green-600"
                    onChange={() => handleFilterChange("category_ids", c.id)}
                    checked={filters.category_ids.includes(c.id)} // ✅ Thêm `checked` để UI đồng bộ với state
                  />
                  {c.name}
                </label>
              ))}
          </ul>

          <div className="mt-6">
            <h2 className="font-bold text-green-700 mb-3">BỘ LỌC SẢN PHẨM</h2>
            <h3 className="font-semibold">Chọn mức giá</h3>
            <div className="flex flex-col gap-1 mt-2 text-sm">
              {priceFilters.map((p, i) => {
                const map = {
                    "Dưới 100.000đ": { min: "0", max: "100000" },
                    "100.000đ - 200.000đ": { min: "100000", max: "200000" },
                    "200.000đ - 300.000đ": { min: "200000", max: "300000" },
                    "300.000đ - 500.000đ": { min: "300000", max: "500000" },
                    "Trên 500.000đ": { min: "500000", max: "999999999" },
                };
                const { min, max } = map[p];
                return (
                  <label key={i}>
                    <input
                      type="checkbox" // Dùng checkbox thay cho radio để có thể bỏ chọn
                      name="price"
                      className="accent-green-600"
                      onChange={() => handlePriceFilter(p)}
                      checked={filters.min_price === min && filters.max_price === max} // ✅ Thêm `checked`
                    />{" "}
                    {p}
                  </label>
                )
              })}
            </div>

            <h3 className="font-semibold mt-4 uppercase">Thương hiệu</h3>
            <div className="flex flex-col gap-1 mt-2 text-sm">
              {brands.map(b => (
                <label key={b.id}>
                  <input
                    type="checkbox"
                    className="accent-green-600"
                    onChange={() => handleFilterChange("brand_ids", b.id)}
                    checked={filters.brand_ids.includes(b.id)} // ✅ Thêm `checked`
                  />{" "}
                  {b.name}
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-center mb-4 bg-gray-100 p-3 rounded-2xl">
            <h1 className="text-xl font-bold uppercase">
              {keyword
                ? `Kết quả cho: "${keyword}"`
                : categorySlug
                ? categoryName
                : "Tất cả sản phẩm"}
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <FaSortAmountDownAlt />
              <select className="border rounded px-2 py-1 text-sm" onChange={handleSortChange}>
                <option value="created_at">Mới nhất</option>
                <option value="price_asc">Giá tăng dần</option>
                <option value="price_desc">Giá giảm dần</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 col-span-full">Đang tải sản phẩm...</p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {products.length > 0 ? (
                  products.map(product => <ProductItem key={product.id} product={product} />)
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    Không tìm thấy sản phẩm nào phù hợp.
                  </p>
                )}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  <button
                    onClick={() => handleChangePage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 rounded-lg disabled:bg-gray-300 disabled:text-gray-500 bg-green-600 text-white"
                  >
                    Trước
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleChangePage(i + 1)}
                      className={`px-3 py-1 rounded-lg ${page === i + 1 ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-green-100"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handleChangePage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1 rounded-lg disabled:bg-gray-300 disabled:text-gray-500 bg-green-600 text-white"
                  >
                    Sau
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;