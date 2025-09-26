// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom"; // Sử dụng useParams và Link
// import apiCategory from "../../../api/apiCategory";
// import { FaEdit, FaToggleOn, FaRegTrashAlt, FaToggleOff } from "react-icons/fa";

const ListCat = () => {
  // const { page: pageParam } = useParams(); // Lấy tham số page từ URL
  // const [categories, setCategories] = useState([]); // Lưu danh sách danh mục
  // const [page, setPage] = useState(Number(pageParam) || 1); // Trang hiện tại
  // const [totalPages, setTotalPages] = useState(1); // Tổng số trang

  // Gọi API để lấy danh sách danh mục
  // const fetchCategories = async (page) => {
  //   try {
  //     const limit = 10; // Số danh mục mỗi trang
  //     const response = await apiCategory.getProductPagination(page, limit);
  //     setCategories(response.data); // Lưu danh sách danh mục
  //     setTotalPages(response.meta.pagination.pageCount); // Lưu tổng số trang
  //   } catch (error) {
  //     console.error("Lỗi khi lấy danh sách danh mục:", error);
  //   }
  // };

  // const [delCategoryItem, setDelCategoryItem] = useState(false); // Lưu danh mục đã xóa

  // // Gọi API khi trang thay đổi
  // useEffect(() => {
  //   fetchCategories(page);
  // }, [page]);

  // const delCategory = async (documentId) => {
  //   try {
  //     apiCategory.delCategoryById(documentId).then((res) => {
  //       console.log("Xóa danh mục thành công:", res);
  //       // Cập nhật danh sách danh mục sau khi xóa
  //       alert("Xóa danh mục thành công");
  //       setDelCategoryItem(documentId); // Đánh dấu đã xóa danh mục
  //       fetchCategories(page); // Gọi lại hàm để cập nhật danh sách
  //     });
  //   } catch (error) {
  //     console.error("Lỗi khi xóa danh mục:", error);
  //   }
  // };

  // // Cập nhật page khi URL thay đổi
  // useEffect(() => {
  //   setPage(Number(pageParam) || 1);
  // }, [pageParam]);

  // // Tạo một map để tra cứu danh mục cha nhanh hơn
  // const categoryMap = categories.reduce((map, category) => {
  //   map[category.documentId] = category.category_name;
  //   return map;
  // }, {});

  return (
    // <div className="p-3 bg-white rounded-lg">
    //   <div className="flex justify-between mb-3 py-4 rounded-sm shadow">
    //     <h3 className="ml-6 text-3xl font-semibold text-blue-600">
    //       Danh sách danh mục
    //     </h3>
    //     <div className="mr-6">
    //       <Link
    //         className="bg-green-500 text-white px-5 py-2 rounded-3xl mr-3 font-bold text-[20px]"
    //         to="/admin/addCat"
    //       >
    //         {" "}
    //         + Thêm
    //       </Link>
    //     </div>
    //   </div>

    //   <table className="w-full border-collapse border border-gray-300 text-center">
    //     <thead>
    //       <tr className="bg-gray-200">
    //         <th className="border border-gray-300 px-4 py-2">ID</th>
    //         <th className="border border-gray-300 px-4 py-2">Tên danh mục</th>
    //         <th className="border border-gray-300 px-4 py-2">Danh mục cha</th>
    //         <th className="border border-gray-300 px-4 py-2">Slug</th>
    //         <th className="border border-gray-300 px-4 py-2">Chức năng</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {categories.map((category) => (
    //         <tr key={category.id}>
    //           <td className="border border-gray-300 px-4 py-2">
    //             {category.id}
    //           </td>
    //           <td className="border border-gray-300 px-4 py-2">
    //             {category.category_name}
    //           </td>
    //           <td className="border border-gray-300 px-4 py-2">
    //             {category.parent_id === "0"
    //               ? "Không có danh mục cha"
    //               : categoryMap[category.parent_id] || "Không tìm thấy danh mục cha"}
    //           </td>

    //           <td className="border border-gray-300 px-4 py-2">
    //             {category.slug}
    //           </td>
    //           <td className="border border-gray-300 px-4 py-2 w-50">
    //             <div className="text-[25px] flex justify-evenly ">
    //               <a href="#" className="text-red-600">
    //                 {category.cat_status === true ? (
    //                   <FaToggleOn className="text-green-600 hover:text-green-900 transition-all duration-300 cursor-pointer" />
    //                 ) : (
    //                   <FaToggleOff className="text-red-600 hover:text-gray-600 transition-all duration-300 cursor-pointer" />
    //                 )}
    //               </a>

    //               <Link
    //                 className="text-blue-600"
    //                 to={`/admin/editCat/${category.id}`}
    //               >
    //                 <FaEdit />
    //               </Link>

    //               <a
    //                 href="#"
    //                 onClick={(e) => {
    //                   e.preventDefault();
    //                   const confirmDelete = window.confirm(
    //                     "Bạn có chắc chắn muốn xóa danh mục này?"
    //                   );
    //                   if (confirmDelete) {
    //                     delCategory(category.documentId); // Gọi hàm xóa danh mục
    //                   }
    //                 }}
    //                 className="text-red-600"
    //               >
    //                 <FaRegTrashAlt />
    //               </a>

    //               {/* <button onClick={() => delCategory(category.documentId)}> xoa</button> */}
    //             </div>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>

    //   {/* Phân trang */}
    //   <div className="mt-5 flex justify-center">
    //     <ul className="pagination flex gap-2">
    //       <li>
    //         <Link
    //           to={`/admin/categories/${page - 1}`}
    //           className={`px-3 py-1 border ${
    //             page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white"
    //           }`}
    //           onClick={(e) => page === 1 && e.preventDefault()} // Ngăn chặn điều hướng nếu đang ở trang 1
    //         >
    //           Previous
    //         </Link>
    //       </li>
    //       {Array.from({ length: totalPages }, (_, index) => (
    //         <li key={index}>
    //           <Link
    //             to={`/admin/categories/${index + 1}`}
    //             className={`px-3 py-1 border ${
    //               page === index + 1 ? "bg-blue-500 text-white" : "bg-white"
    //             }`}
    //           >
    //             {index + 1}
    //           </Link>
    //         </li>
    //       ))}
    //       <li>
    //         <Link
    //           to={`/admin/categories/${page + 1}`}
    //           className={`px-3 py-1 border ${
    //             page === totalPages
    //               ? "bg-gray-300 cursor-not-allowed"
    //               : "bg-white"
    //           }`}
    //           onClick={(e) => page === totalPages && e.preventDefault()} // Ngăn chặn điều hướng nếu đang ở trang cuối
    //         >
    //           Next
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
    <></>
  );
};

export default ListCat;
