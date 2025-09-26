// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import apiUser from "../../../api/apiUser";
// import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const ShowUser = () => {
  // =================== STATE ===================
  // const [user, setUser] = useState(null);
  // const [orders, setOrders] = useState([]);
  // const { id } = useParams();

  // =================== USE EFFECT ===================
  // useEffect(() => {
  //   // =================== LẤY THÔNG TIN NGƯỜI DÙNG ===================
  //   apiUser.getUserById(id).then((res) => {
  //     try {
  //       if (res && typeof res === "object") {
  //         const userData = {
  //           id: res.id || "",
  //           documentId: res.documentId || "",
  //           name: res.name || "",
  //           email: res.email || "",
  //           address: res.address || "Chưa cập nhật",
  //           phone: res.phone || "Chưa cập nhật",
  //           createdAt: res.createdAt || "Chưa cập nhật",
  //           updatedAt: res.updatedAt || "Chưa cập nhật",
  //         };
  //         setUser(userData);
  //       } else {
  //         console.error("Dữ liệu user trả về không hợp lệ:", res);
  //         setUser(null);
  //       }
  //     } catch (err) {
  //       console.error("Lỗi khi lấy thông tin người dùng:", err.message);
  //       setUser(null);
  //     }
  //   });

  //   // =================== LẤY DANH SÁCH ĐƠN HÀNG CỦA USER ===================
  //   apiUser.getUserOrders(id).then((res) => {
  //     console.log("API orders response:", res);
  //     if (res && res.data && Array.isArray(res.data.data)) {
  //       setOrders(res.data.data);
  //     } else {
  //       setOrders([]);
  //     }
  //   });
  // }, [id]);

  // =================== LOADING ===================
  // if (!user) {
  //   return <p>Đang tải thông tin người dùng...</p>;
  // }

  return (
    <>
      {/* Nội dung giao diện tạm ẩn */}
    </>
  );
};

export default ShowUser;
