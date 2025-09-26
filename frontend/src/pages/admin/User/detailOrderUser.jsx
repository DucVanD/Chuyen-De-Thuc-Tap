// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import apiOrder from "../../../api/apiOrder";
// import apiUser from "../../../api/apiUser";
// import apiProduct from "../../../api/apiProduct";

const DetailOrderUser = () => {
  // =================== STATE ===================
  // const { id } = useParams(); // Lấy ID đơn hàng từ URL
  // const [order, setOrder] = useState(null);
  // const [user, setUser] = useState(null);
  // const [Products, setProduct] = useState([]);
  // const [deliveryStatus, setDeliveryStatus] = useState("");

  // =================== MAP TRẠNG THÁI ===================
  // const deliveryMap = {
  //   "0": "Đang chờ xử lý",
  //   "1": "Đang giao hàng",
  //   "2": "Đã giao",
  //   "3": "Đã hủy",
  //   "4": "Đã hoàn thành",
  //   "5": "Đã xác nhận",
  // };

  // =================== LẤY CHI TIẾT ĐƠN HÀNG ===================
  // useEffect(() => {
  //   apiOrder
  //     .getOrderById(id)
  //     .then((res) => {
  //       const item = res.data.data;
  //       const orderData = {
  //         id: item.id || "",
  //         documentId: item.documentId || "",
  //         user_id: item.user_id || "",
  //         delivery: item.delivery || "0",
  //         total: item.total || "Chưa cập nhật",
  //       };
  //       setOrder(orderData);
  //       setDeliveryStatus(orderData.delivery);
  //     })
  //     .catch((err) => {
  //       console.error("Lỗi khi lấy chi tiết đơn hàng:", err.message);
  //       setOrder(null);
  //     });
  // }, [id]);

  // =================== LẤY THÔNG TIN USER ===================
  // useEffect(() => {
  //   if (!order?.user_id) return;

  //   apiUser
  //     .getUserById(order.user_id)
  //     .then((resUser) => {
  //       if (resUser && typeof resUser === "object") {
  //         const userData = {
  //           id: resUser.id || "",
  //           name: resUser.username || "",
  //           email: resUser.email || "",
  //         };
  //         setUser(userData);
  //       } else {
  //         setUser(null);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Lỗi lấy thông tin người dùng:", err.message);
  //       setUser(null);
  //     });
  // }, [order]);

  // =================== LẤY CHI TIẾT SẢN PHẨM TRONG ĐƠN ===================
  // useEffect(() => {
  //   const fetchOrderDetailsWithProduct = async () => {
  //     try {
  //       const res = await apiOrder.getOrderDetails(id);
  //       const details = res.data.data;

  //       const detailWithProductInfo = await Promise.all(
  //         details.map(async (item) => {
  //           const productRes = await apiProduct.getProductById(item.product_id);
  //           const product = productRes?.data?.data[0];

  //           return {
  //             ...item,
  //             productName: product?.product_name || "Không có tên",
  //             image: product?.image?.url || null,
  //             price: product?.price || 0,
  //           };
  //         })
  //       );

  //       setProduct(detailWithProductInfo);
  //     } catch (err) {
  //       console.error("Lỗi lấy chi tiết sản phẩm:", err.message);
  //     }
  //   };

  //   fetchOrderDetailsWithProduct();
  // }, [id]);

  // =================== CẬP NHẬT TRẠNG THÁI ===================
  // const handleUpdateDelivery = () => {
  //   if (!order || !order.documentId) {
  //     alert("Không tìm thấy mã đơn hàng để cập nhật.");
  //     return;
  //   }

  //   apiOrder
  //     .updateOrder(order.documentId, { delivery: deliveryStatus })
  //     .then((res) => {
  //       console.log("Cập nhật thành công:", res);
  //       alert("Cập nhật trạng thái thành công!");
  //     })
  //     .catch((err) => {
  //       console.error("Lỗi cập nhật trạng thái:", err.message);
  //       alert("Có lỗi xảy ra khi cập nhật!");
  //     });
  // };

  return (
    <>
      {/* Nội dung giao diện chi tiết đơn hàng tạm ẩn */}
    </>
  );
};

export default DetailOrderUser;
