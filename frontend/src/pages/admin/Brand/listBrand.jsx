import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Sử dụng useParams và Link

import { FaEdit, FaToggleOn, FaRegTrashAlt, FaToggleOff } from "react-icons/fa";
// import apiBrand from "../../../api/apiBrand";

const ListBrand = () => {
  // const [Brands, setBrands] = useState([]); // Lưu danh sách danh mục

  // useEffect(() => {
  //   apiBrand.getAll().then((res) => {
  //     console.log("thuong hieu", res);
  //     try {
  //       const brandata = res.map((item) => ({
  //         id: item.id,
  //         name: item.brand_name,
  //         address: item.address,
  //         }));
  //       setBrands(brandata);
  //     } catch (err) {
  //       console.log("Error: ", err.message);
  //     }
  //   });
  // }, []);

  return (
    // <div className="p-3 bg-white rounded-lg">
    //   <div className="flex justify-between mb-3 py-4 rounded-sm shadow">
    //     <h3 className="ml-6 text-3xl font-semibold text-blue-600">
    //       Danh sách thương hiệu
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
    //         <th className="border border-gray-300 px-4 py-2">
    //           Tên thương hiệu
    //         </th>
    //         <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
    //         <th className="border border-gray-300 px-4 py-2">Chức năng</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {Brands.map((brand) => (
    //         <tr key={brand.id}>
    //           <td className="border border-gray-300 px-4 py-2">{brand.id}</td>
    //           <td className="border border-gray-300 px-4 py-2">{brand.name}</td>
    //           <td className="border border-gray-300 px-4 py-2">
    //             {brand.address}
    //           </td>
    //           <td className="border border-gray-300 px-4 py-2 w-50">
    //             <div className="text-[25px] flex justify-evenly ">
    //               {/* <a href="#" className="text-red-600">
    //                 {brand.cat_status === true ? (
    //                   <FaToggleOn className="text-green-600 hover:text-green-900 transition-all duration-300 cursor-pointer" />
    //                 ) : (
    //                   <FaToggleOff className="text-red-600 hover:text-gray-600 transition-all duration-300 cursor-pointer" />
    //                 )}
    //               </a> */}

    //               <a href="#" className="text-red-600">
    //                 <FaToggleOn className="text-green-600 hover:text-green-900 transition-all duration-300 cursor-pointer" />
    //               </a>

    //               <Link
    //                 className="text-blue-600"
    //                 to={`/admin/editCat/${brand.id}`}
    //               >
    //                 {" "}
    //                 <FaEdit />{" "}
    //               </Link>

    //               <a href="#" className="text-red-600">
    //                 <FaRegTrashAlt />
    //               </a>
    //             </div>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <></>
  );
};

export default ListBrand;
