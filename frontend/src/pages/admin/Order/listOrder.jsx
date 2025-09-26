// import React from "react";
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import apiOrder from "../../../api/apiOrder";
// import { FaEye } from "react-icons/fa";

const listOrder = () => {
  // =================== STATE ===================
  // const [orders, setOrders] = useState([]);
  // const { id } = useParams();

  // =================== LẤY DANH SÁCH ĐƠN HÀNG ===================
  // useEffect(() => {
  //   apiOrder.getAll().then((res) => {
  //     console.log("API orders response:", res);
  //     try {
  //       const orderData = res.data.map((item) => ({
  //         id: item.id || "",
  //         documentId: item.documentId || "",
  //         delivery: item.delivery || "Đang xác nhận",
  //         address: item.address || "Chưa cập nhật",
  //         order_date: item.order_date || "Chưa cập nhật",
  //         total_price: item.total || "Chưa cập nhật",
  //         user_id: item.user_id || "Chưa cập nhật",
  //       }));
  //       setOrders(orderData);
  //     } catch (err) {
  //       console.error("Error fetching order details:", err.message);
  //       setOrders([]);
  //     }
  //   });
  // }, []);

  // console.log("orders", orders);

  return (
    <div className="p-3 bg-white rounded-lg">
      {/* Nội dung UI hiển thị danh sách đơn hàng giữ nguyên */}
      <div className="flex justify-between mb-3 py-4 rounded-sm shadow">
        <h3 className="ml-6 text-3xl font-semibold text-blue-600">
          Danh sách đơn hàng
        </h3>
      </div>

      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
            <th className="border border-gray-300 px-4 py-2">Vận chuyển</th>
            <th className="border border-gray-300 px-4 py-2">Ngày đặt hàng</th>
            <th className="border border-gray-300 px-4 py-2">Tổng tiền</th>
            <th className="border border-gray-300 px-4 py-2">Chức năng</th>
          </tr>
        </thead>
        {/* <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border border-gray-300 px-4 py-2">{order.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {order.address}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                {order.delivery === 1
                  ? "Đang giao hàng"
                  : order.delivery === 2
                  ? "Đã giao"
                  : order.delivery === 3
                  ? "Đã hủy"
                  : order.delivery === 4
                  ? "đã hoàn thành"
                  : order.delivery === 5
                  ? "Đã xác nhận"
                  : "Đang chờ xử lý"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.order_date}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.total_price}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex justify-center">
                <Link
                  to={`/admin/detailOrder/${order.documentId}`}
                  className="text-blue-600 hover:text-red-800"
                >
                  <FaEye />
                </Link>
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </div>
  );
};

export default listOrder;
