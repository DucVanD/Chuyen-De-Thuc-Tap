const DetailOrderUser = () => {
  return (
    <>
    </>
  );
};

export default DetailOrderUser;

// ================== CODE CŨ (ĐÃ COMMENT) ==================

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import apiOrder from "../../../api/apiOrder";
// import apiUser from "../../../api/apiUser";
// import apiProduct from "../../../api/apiProduct";

// const DetailOrderUser = () => {
//   const { id } = useParams();
//   const [order, setOrder] = useState(null);
//   const [user, setUser] = useState(null);
//   const [Products, setProduct] = useState([]);
//   const [deliveryStatus, setDeliveryStatus] = useState("");

//   const deliveryMap = {
//     "0": "Đang chờ xử lý",
//     "1": "Đang giao hàng",
//     "2": "Đã giao",
//     "3": "Đã hủy",
//     "4": "Đã hoàn thành",
//     "5": "Đã xác nhận",
//   };

//   useEffect(() => {
//     apiOrder
//       .getOrderById(id)
//       .then((res) => {
//         const item = res.data.data;
//         const orderData = {
//           id: item.id || "",
//           documentId: item.documentId || "",
//           user_id: item.user_id || "",
//           delivery: item.delivery || "0",
//           total: item.total || "Chưa cập nhật",
//         };
//         setOrder(orderData);
//         setDeliveryStatus(orderData.delivery);
//       })
//       .catch((err) => {
//         console.error("Lỗi khi lấy chi tiết đơn hàng:", err.message);
//         setOrder(null);
//       });
//   }, [id]);

//   useEffect(() => {
//     if (!order?.user_id) return;
//     apiUser
//       .getUserById(order.user_id)
//       .then((resUser) => {
//         if (resUser && typeof resUser === "object") {
//           const userData = {
//             id: resUser.id || "",
//             name: resUser.username || "",
//             email: resUser.email || "",
//           };
//           setUser(userData);
//         } else {
//           setUser(null);
//         }
//       })
//       .catch((err) => {
//         console.error("Lỗi lấy thông tin người dùng:", err.message);
//         setUser(null);
//       });
//   }, [order]);

//   useEffect(() => {
//     const fetchOrderDetailsWithProduct = async () => {
//       try {
//         const res = await apiOrder.getOrderDetails(id);
//         const details = res.data.data;
//         const detailWithProductInfo = await Promise.all(
//           details.map(async (item) => {
//             const productRes = await apiProduct.getProductById(item.product_id);
//             const product = productRes?.data?.data[0];
//             return {
//               ...item,
//               productName: product?.product_name || "Không có tên",
//               image: product?.image?.url || null,
//               price: product?.price || 0,
//             };
//           })
//         );
//         setProduct(detailWithProductInfo);
//       } catch (err) {
//         console.error("Lỗi lấy chi tiết sản phẩm:", err.message);
//       }
//     };
//     fetchOrderDetailsWithProduct();
//   }, [id]);

//   const handleUpdateDelivery = () => {
//     if (!order || !order.documentId) {
//       alert("Không tìm thấy mã đơn hàng để cập nhật.");
//       return;
//     }
//     apiOrder
//       .updateOrder(order.documentId, { delivery: deliveryStatus })
//       .then((res) => {
//         console.log("Cập nhật thành công:", res);
//         alert("Cập nhật trạng thái thành công!");
//       })
//       .catch((err) => {
//         console.error("Lỗi cập nhật trạng thái:", err.message);
//         alert("Có lỗi xảy ra khi cập nhật!");
//       });
//   };

//   return (
//     <div className="container mx-auto p-5">
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold mb-4 text-blue-600">Chi tiết đặt hàng</h2>
//         <p>
//           <strong>Mã hóa đơn:</strong>{" "}
//           <span className="ml-2 text-lg">{order?.documentId || "Chưa cập nhật"}</span>
//         </p>
//         <p>
//           <strong>Tên khách hàng:</strong>{" "}
//           <span className="ml-2 text-lg">{user?.name || "Chưa cập nhật"}</span>
//         </p>
//         <div className="mt-4">
//           <label className="block font-medium mb-2">Tình trạng đơn hàng:</label>
//           <select
//             className="border rounded px-3 py-2"
//             value={deliveryStatus}
//             onChange={(e) => setDeliveryStatus(e.target.value)}
//           >
//             <option value="0">Đang chờ xử lý</option>
//             <option value="1">Đang giao hàng</option>
//             <option value="2">Đã giao</option>
//             <option value="3">Đã hủy</option>
//             <option value="4">Đã hoàn thành</option>
//             <option value="5">Đã xác nhận</option>
//           </select>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-4"
//             onClick={handleUpdateDelivery}
//           >
//             Cập nhật
//           </button>
//         </div>
//         <h3 className="text-xl font-bold mt-6 mb-4">Danh sách sản phẩm</h3>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">ID</th>
//               <th className="border px-4 py-2">Hình ảnh</th>
//               <th className="border px-4 py-2">Tên sản phẩm</th>
//               <th className="border px-4 py-2">Đơn giá</th>
//               <th className="border px-4 py-2">Số lượng</th>
//               <th className="border px-4 py-2">Thành tiền</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Products.map((item) => (
//               <tr key={item.id}>
//                 <td className="border px-4 py-2">{item.product_id}</td>
//                 <td className="border px-4 py-2">
//                   <img
//                     src={`http://localhost:1337${item.image}`}
//                     alt={item.productName}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                 </td>
//                 <td className="border px-4 py-2">{item.productName}</td>
//                 <td className="border px-4 py-2">
//                   {item.price.toLocaleString("vi-VN")} ₫
//                 </td>
//                 <td className="border px-4 py-2">{item.quantity}</td>
//                 <td className="border px-4 py-2">
//                   {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan="5" className=" font-bold px-4 py-2 border">
//                 Tổng cộng
//               </td>
//               <td className="border px-4 py-2 font-bold">
//                 {Products.reduce(
//                   (sum, item) => sum + item.price * item.quantity,
//                   0
//                 ).toLocaleString("vi-VN")} ₫
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// };
