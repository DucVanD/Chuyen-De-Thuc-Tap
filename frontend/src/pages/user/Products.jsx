import { FaSortAmountDownAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import apiProduct from "../../api/apiProduct";
import apiCategory from "../../api/apiCategory";
import apiBrand from "../../api/apiBrand";
import ProductItem from "./ProductItem";

const Products = () => {
    // === State cho dữ liệu ===
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    // === State cho việc lọc và phân trang ===
    const [filters, setFilters] = useState({
        name: "", // Chứa từ khóa tìm kiếm
        category_ids: [],
        brand_ids: [],
        min_price: "",
        max_price: "",
        sort_by: "created_at",
        sort_order: "desc",
    });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // === State cho UI và quản lý luồng ===
    const [loading, setLoading] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isInitialSetupDone, setIsInitialSetupDone] = useState(false);

    // === Lấy params từ URL ===
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const keyword = searchParams.get("keyword");
    const categorySlug = location.state?.categorySlug || searchParams.get("category");

    // === Dữ liệu dẫn xuất (Derived Data) ===
    const categoryName = categories.find(cat => cat.slug === categorySlug)?.name || "Danh mục sản phẩm";

    // ✅ EFFECT 1: Thiết lập ban đầu.
    useEffect(() => {
        const setup = async () => {
            try {
                setIsInitialSetupDone(false);
                setLoading(true);

                const [catRes, brandRes] = await Promise.all([
                    apiCategory.getAll(),
                    apiBrand.getAll(),
                ]);
                const fetchedCategories = catRes.data.data || [];
                setCategories(fetchedCategories);
                setBrands(brandRes.data.data || []);

                let initialCategoryIds = [];
                if (categorySlug) {
                    const matchedCategory = fetchedCategories.find(cat => cat.slug === categorySlug);
                    if (matchedCategory) initialCategoryIds = [matchedCategory.id];
                }

                // Reset và cài đặt filters ban đầu, bao gồm cả keyword
                setFilters({
                    name: keyword || "",
                    category_ids: initialCategoryIds,
                    brand_ids: [],
                    min_price: "",
                    max_price: "",
                    sort_by: "created_at",
                    sort_order: "desc",
                });

                const pageParam = parseInt(searchParams.get("page")) || 1;
                setPage(pageParam);

            } catch (error) {
                console.error("Lỗi trong quá trình setup:", error);
            } finally {
                setIsInitialSetupDone(true);
            }
        };

        setup();
    }, [categorySlug, keyword]); // Chạy lại khi slug hoặc keyword thay đổi

    // ✅ EFFECT 2: Lấy danh sách sản phẩm.
    useEffect(() => {
        if (!isInitialSetupDone) return;

        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Tạo một bản sao của filters để có thể chỉnh sửa an toàn
                let effectiveFilters = { ...filters };

                // ✅ LOGIC TÌM KIẾM THÔNG MINH:
                // Nếu có từ khóa tìm kiếm (filters.name) và chưa có filter danh mục nào được chọn thủ công
                if (filters.name && filters.category_ids.length === 0) {
                    // Tìm xem từ khóa có khớp với tên của danh mục nào không (không phân biệt hoa thường)
                    const matchedCategoryByName = categories.find(
                        cat => cat.name.toLowerCase() === filters.name.toLowerCase()
                    );

                    // Nếu tìm thấy, chuyển đổi từ tìm kiếm theo tên SANG tìm kiếm theo ID danh mục
                    if (matchedCategoryByName) {
                        effectiveFilters = {
                            ...effectiveFilters,
                            category_ids: [matchedCategoryByName.id], // Đặt ID danh mục tìm thấy
                            name: "", // Xóa từ khóa tìm kiếm đi để tránh back-end tìm cả hai
                        };
                    }
                }

                let resData;
                const isFilterOrSortActive =
                    effectiveFilters.name ||
                    effectiveFilters.category_ids.length > 0 ||
                    effectiveFilters.brand_ids.length > 0 ||
                    effectiveFilters.min_price ||
                    effectiveFilters.max_price ||
                    effectiveFilters.sort_by !== 'created_at' ||
                    effectiveFilters.sort_order !== 'desc';

                if (isFilterOrSortActive) {
                    // Luôn gọi API filter với bộ lọc đã được xử lý thông minh
                    resData = await apiProduct.filter({ ...effectiveFilters, page });
                    setProducts(resData.data.data || []);
                    setTotalPages(resData.data.last_page || 1);
                } else {
                    resData = await apiProduct.getAll(page);
                    setProducts(resData.data.data || []);
                    setTotalPages(resData.data.last_page || 1);
                }
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters, page, isInitialSetupDone, categories]); // Thêm `categories` vào dependency để đảm bảo logic smart search có dữ liệu


    // === Các hàm xử lý sự kiện (Event Handlers) === (Giữ nguyên không thay đổi)

    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const handleChangePage = (newPage) => {
        setPage(newPage);
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", String(newPage));
        setSearchParams(newParams);
    };

    const updateFiltersAndResetPage = (newFilterPart) => {
        setFilters(prev => ({ ...prev, ...newFilterPart }));
        if (page !== 1) {
            setPage(1);
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", "1");
            setSearchParams(newParams);
        }
    };

    const handleFilterChange = (type, value) => {
        const currentValues = filters[type];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        updateFiltersAndResetPage({ [type]: newValues });
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
        if (filters.min_price === min && filters.max_price === max) {
            updateFiltersAndResetPage({ min_price: "", max_price: "" });
        } else {
            updateFiltersAndResetPage({ min_price: min, max_price: max });
        }
    };
    const handleSortChange = (e) => {
        const value = e.target.value;
        let newSort = {};
        if (value === "price_asc") newSort = { sort_by: "price_sale", sort_order: "asc" };
        else if (value === "price_desc") newSort = { sort_by: "price_sale", sort_order: "desc" };
        else newSort = { sort_by: "created_at", sort_order: "desc" };
        updateFiltersAndResetPage(newSort);
    };


    const priceFilters = [
        "Dưới 100.000đ", "100.000đ - 200.000đ", "200.000đ - 300.000đ",
        "300.000đ - 500.000đ", "Trên 500.000đ",
    ];

    // === JSX Render === (Giữ nguyên không thay đổi)
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

                        {categories.filter(c => c.parent_id !== 0).map(c => (

                            <label key={c.id} className="flex gap-1 hover:text-green-600 cursor-pointer text-sm">

                                <input type="checkbox" className="accent-green-600"

                                    onChange={() => handleFilterChange("category_ids", c.id)}

                                    checked={filters.category_ids.includes(c.id)}

                                />

                                {c.name}

                            </label>

                        ))}

                    </ul>

                    <div className="mt-6">

                        <h2 className="font-bold text-green-700 mb-3">BỘ LỌC SẢN PHẨM</h2>

                        <h3 className="font-semibold">Chọn mức giá</h3>

                        <div className="flex flex-col gap-2 mt-2 text-sm ">

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

                                        <input type="checkbox" name="price" className="accent-green-600 mr-2 "

                                            onChange={() => handlePriceFilter(p)}

                                            checked={filters.min_price === min && filters.max_price === max}

                                        /> {p}

                                    </label>

                                )

                            })}

                        </div>

                        <h3 className="font-semibold mt-4 uppercase">Thương hiệu</h3>

                        <div className="flex flex-col gap-2 mt-2 text-sm">

                            {brands.map(b => (

                                <label key={b.id}>

                                    <input type="checkbox" className="accent-green-600 mr-2"

                                        onChange={() => handleFilterChange("brand_ids", b.id)}

                                        checked={filters.brand_ids.includes(b.id)}

                                    /> {b.name}

                                </label>

                            ))}

                        </div>

                    </div>

                </aside>

                <main className="flex-1">

                    <div className="flex justify-between items-center mb-4 bg-gray-100 p-3 rounded-2xl">

                        <h1 className="text-xl font-bold uppercase">

                            {keyword ? `Kết quả cho: "${keyword}"` : categorySlug ? categoryName : "Tất cả sản phẩm"}

                        </h1>

                        <div className="flex items-center gap-2 text-gray-600">

                            <FaSortAmountDownAlt />

                            <select

                                className="border rounded px-2 py-1 text-sm"

                                onChange={handleSortChange}

                                value={

                                    filters.sort_by === 'price_sale' && filters.sort_order === 'asc' ? 'price_asc'

                                        : filters.sort_by === 'price_sale' && filters.sort_order === 'desc' ? 'price_desc'

                                            : 'created_at'

                                }

                            >

                                <option value="created_at">Mới nhất</option>

                                <option value="price_asc">Giá tăng dần</option>

                                <option value="price_desc">Giá giảm dần</option>

                            </select>

                        </div>

                    </div>

                    {loading ? (

                        <p className="text-center text-gray-500 col-span-full py-10">Đang tải sản phẩm...</p>

                    ) : (

                        <>

                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

                                {products.length > 0 ? (

                                    products.map(product => <ProductItem key={product.id} product={product} />)

                                ) : (

                                    <p className="col-span-full text-center text-gray-500 py-10">

                                        Không tìm thấy sản phẩm nào phù hợp.

                                    </p>

                                )}

                            </div>  {totalPages > 1 && (
                                <div className="flex justify-center mt-6 gap-2 flex-wrap">
                                    {/* Nút Trước */}
                                    <button
                                        onClick={() => handleChangePage(Math.max(1, page - 1))}
                                        disabled={page === 1}
                                        className="px-3 py-1 rounded-lg bg-green-600 text-white disabled:bg-gray-300 disabled:text-gray-500"
                                    >
                                        Trước
                                    </button>

                                    {/* Hiển thị tối đa 5 trang đầu tiên */}
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => handleChangePage(p)}
                                            className={`px-3 py-1 rounded-lg ${page === p
                                                    ? "bg-green-600 text-white"
                                                    : "bg-gray-200 hover:bg-green-100"
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}

                                    {/* Nếu có nhiều hơn 5 trang thì thêm dấu ... và nút cuối */}
                                    {totalPages > 5 && (
                                        <>
                                            <span className="px-2 text-gray-500">...</span>
                                            <button
                                                onClick={() => handleChangePage(totalPages)}
                                                className={`px-3 py-1 rounded-lg ${page === totalPages
                                                        ? "bg-green-600 text-white"
                                                        : "bg-gray-200 hover:bg-green-100"
                                                    }`}
                                            >
                                                {totalPages}
                                            </button>
                                        </>
                                    )}

                                    {/* Nút Sau */}
                                    <button
                                        onClick={() => handleChangePage(Math.min(totalPages, page + 1))}
                                        disabled={page === totalPages}
                                        className="px-3 py-1 rounded-lg bg-green-600 text-white disabled:bg-gray-300 disabled:text-gray-500"
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