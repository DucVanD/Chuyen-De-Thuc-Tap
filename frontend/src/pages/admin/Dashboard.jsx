import { useState } from "react";
import {
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Star,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [stats] = useState({
    products: 120,
    orders: 85,
    customers: 40,
    revenue: 25000000,
    conversionRate: 12.5,
    bestSeller: "Thịt bò Mỹ",
  });

  const revenueData = [
    { month: "T1", revenue: 4000000 },
    { month: "T2", revenue: 3500000 },
    { month: "T3", revenue: 6000000 },
    { month: "T4", revenue: 7000000 },
    { month: "T5", revenue: 5000000 },
    { month: "T6", revenue: 6500000 },
  ];

  const orderData = [
    { month: "T1", orders: 20 },
    { month: "T2", orders: 15 },
    { month: "T3", orders: 25 },
    { month: "T4", orders: 30 },
    { month: "T5", orders: 28 },
    { month: "T6", orders: 35 },
  ];

  const customerData = [
    { name: "Khách mới", value: 30 },
    { name: "Khách cũ", value: 70 },
  ];

  const COLORS = ["#6366f1", "#34d399"];

  const cardStyle =
    "bg-white rounded-2xl shadow-lg p-5 flex items-center justify-between transform hover:scale-105 hover:shadow-2xl transition duration-300";

  const iconBox =
    "p-3 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-md";

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        <div className={cardStyle}>
          <div>
            <p className="text-gray-500 text-sm">Sản phẩm</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {stats.products}
            </h2>
          </div>
          <div className={iconBox}>
            <Package size={28} />
          </div>
        </div>

        <div className={cardStyle}>
          <div>
            <p className="text-gray-500 text-sm">Đơn hàng</p>
            <h2 className="text-2xl font-bold text-gray-800">{stats.orders}</h2>
          </div>
          <div className="p-3 rounded-full bg-gradient-to-tr from-green-400 to-emerald-500 text-white shadow-md">
            <ShoppingCart size={28} />
          </div>
        </div>

        <div className={cardStyle}>
          <div>
            <p className="text-gray-500 text-sm">Khách hàng</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {stats.customers}
            </h2>
          </div>
          <div className="p-3 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 text-white shadow-md">
            <Users size={28} />
          </div>
        </div>

        <div className={cardStyle}>
          <div>
            <p className="text-gray-500 text-sm">Doanh thu</p>
            <h2 className="text-xl font-bold text-gray-800">
              {stats.revenue.toLocaleString("vi-VN")}₫
            </h2>
          </div>
          <div className="p-3 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 text-white shadow-md">
            <DollarSign size={28} />
          </div>
        </div>

        <div className={cardStyle}>
          <div>
            <p className="text-gray-500 text-sm">Tỷ lệ chuyển đổi</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {stats.conversionRate}%
            </h2>
          </div>
          <div className="p-3 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 text-white shadow-md">
            <TrendingUp size={28} />
          </div>
        </div>

        <div className={cardStyle}>
          <div>
            <p className="text-gray-500 text-sm">Bán chạy nhất</p>
            <h2 className="text-lg font-semibold text-gray-800">
              {stats.bestSeller}
            </h2>
          </div>
          <div className="p-3 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 text-white shadow-md">
            <Star size={28} />
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Biểu đồ doanh thu
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
                formatter={(value) =>
                  value.toLocaleString("vi-VN") + "₫"
                }
              />
              <Bar
                dataKey="revenue"
                fill="url(#revenueGradient)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Line Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Đơn hàng theo tháng
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 6, fill: "#10b981" }}
                activeDot={{ r: 8, stroke: "#047857", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Customers Pie Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Khách hàng</h2>
        <div className="h-80 flex justify-center">
          <ResponsiveContainer width="50%" height="100%">
            <PieChart>
              <Pie
                data={customerData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {customerData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
