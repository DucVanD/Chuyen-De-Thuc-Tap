import { useState, useEffect } from "react";
import apiDashboard from "../../api/apiDashbroad"; // import đúng path
import {
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Star,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const fetchDashboard = async (date = "") => {
    setLoading(true);
    setError(null);

    try {
      const res = date
        ? await apiDashboard.reportByDate(date)
        : await apiDashboard.summary();

      if (res && res.status) {
        setData(res.data);
      } else {
        setError("Không có dữ liệu dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Lỗi kết nối API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p className="p-10 text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>;
  if (!data) return <p className="p-10 text-center">Không có dữ liệu</p>;

  const summary = data.summary || {};
  const analytics = data.analytics || {};
  const topProducts = data.top_products || [];
  const lowStockList = summary.LowStockList || summary.lowStockList || [];

  const cardStyle =
    "bg-white rounded-2xl shadow-lg p-5 flex items-center justify-between transform hover:scale-105 hover:shadow-2xl transition duration-300";
  const iconBox =
    "p-3 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-md";

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 min-h-screen">
      {/* Date picker */}
      <div className="flex justify-end mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            fetchDashboard(e.target.value);
          }}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {/* Sản phẩm */}
        <div className={cardStyle}>
          <div>
            <p className="text-gray-500 text-sm">Sản phẩm</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {summary.total_products ?? 0}
            </h2>
          </div>
          <div className={iconBox}>
            <Package size={28} />
          </div>
        </div>

        {/* Đơn hàng */}
        <div className={cardStyle}>
          <div>
            <p className="text-gray-500 text-sm">Đơn hàng</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {summary.total_orders ?? 0}
            </h2>
          </div>
          <div className="p-3 rounded-full bg-gradient-to-tr from-green-400 to-emerald-500 text-white shadow-md">
            <ShoppingCart size={28} />
          </div>
        </div>

        {/* Khách hàng */}
        <div className={cardStyle}>
          <div>
            <p className="text-gray-500 text-sm">Khách hàng</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {summary.total_users ?? 0}
            </h2>
          </div>
          <div className="p-3 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 text-white shadow-md">
            <Users size={28} />
          </div>
        </div>

        {/* Doanh thu */}
        <div className={cardStyle}>
          <div>
            <p className="text-gray-500 text-sm">Doanh thu</p>
            <h2 className="text-xl font-bold text-gray-800">
              {summary.total_revenue ?? "0₫"}
            </h2>
          </div>
          <div className="p-3 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 text-white shadow-md">
            <DollarSign size={28} />
          </div>
        </div>

        {/* Tỷ lệ chuyển đổi */}
        <div className={cardStyle}>
          <div>
            <p className="text-gray-500 text-sm">Tỷ lệ chuyển đổi</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {analytics.conversion_rate ?? "0%"}
            </h2>
          </div>
          <div className="p-3 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 text-white shadow-md">
            <TrendingUp size={28} />
          </div>
        </div>

        {/* Bán chạy nhất */}
        <div className={cardStyle}>
          <div>
            <p className="text-gray-500 text-sm">Bán chạy nhất</p>
            <h2 className="text-lg font-semibold text-gray-800">
              {topProducts.length > 0 ? topProducts[0].name : "Không có"}
            </h2>
          </div>
          <div className="p-3 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 text-white shadow-md">
            <Star size={28} />
          </div>
        </div>
      </div>

      {/* Top products chart + Low stock list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Top sản phẩm bán chạy
          </h2>
          {topProducts.length > 0 ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      border: "1px solid #ddd",
                    }}
                  />
                  <Bar dataKey="quantity_sold" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-600">Chưa có dữ liệu sản phẩm bán chạy.</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Sản phẩm sắp hết</h3>
              <p className="text-sm text-gray-500">
                {lowStockList.length} sản phẩm (ngưỡng ≤ 10)
              </p>
            </div>
            <div className="p-2 rounded-full bg-yellow-100 text-yellow-800">
              <AlertTriangle size={18} />
            </div>
          </div>

          {lowStockList.length === 0 ? (
            <p className="text-gray-600 italic">Không có sản phẩm sắp hết hàng.</p>
          ) : (
            <div className="space-y-3">
              {lowStockList.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between border border-gray-100 rounded-lg p-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">{p.name}</p>
                    <p className="text-sm text-gray-500">ID: {p.id}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        Number(p.qty) <= 3
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {p.qty} còn lại
                    </div>

                    <a
                      href={`/admin/editProduct/${p.id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Nhập hàng
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Small summary */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-sm text-gray-500">Khoảng thời gian</h4>
            <p className="font-semibold">{data.period}</p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Người đăng ký mới</p>
              <p className="font-bold">{summary.new_users ?? 0}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">AOV</p>
              <p className="font-bold">{summary.average_order_value ?? "0₫"}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Lượt truy cập</p>
              <p className="font-bold">{analytics.visits ?? 0}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">So sánh doanh thu</p>
              <p className="font-bold">{data.comparison?.revenue_vs_yesterday ?? "0%"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
