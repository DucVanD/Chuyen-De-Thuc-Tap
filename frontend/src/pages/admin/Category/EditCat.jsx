// import apiCategory from "../../../api/apiCategory";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

const EditCat = () => {
  // const { id } = useParams(); // ID từ URL
  // const navigate = useNavigate();

  // const [catName, setCatName] = useState("");
  // const [parentId, setParentId] = useState("0");
  // const [Slug, setSlug] = useState("");
  // const [status, setStatus] = useState("0");
  // const [categories, setCategories] = useState([]);

  // const [documentId, setdocumentId] = useState("");

  // useEffect(() => {
  //   apiCategory.getCategoryById(id).then((res) => {
  //     try {
  //       const categoryData = res.data[0];
  //       setdocumentId(categoryData.documentId);
  //       setCatName(categoryData.category_name);
  //       setParentId(categoryData.parent_id);
  //       setSlug(categoryData.slug);
  //       setStatus(categoryData.cat_status?.toString() || "0");
  //     } catch (e) {
  //       console.error("Error processing category data", e);
  //     }
  //   });
  // }, [id]);

  // useEffect(() => {
  //   apiCategory.getAll().then((res) => {
  //     try {
  //       const Menudata = res.map((item) => ({
  //         id: item.id,
  //         documentId: item.documentId,
  //         name: item.category_name,
  //         slug: item.slug,
  //         parent: item.parent_id,
  //         status: item.cat_status,
  //       }));
  //       setCategories(Menudata);
  //     } catch (err) {
  //       console.log("Error: ", err.message);
  //     }
  //   });
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = {
      category_name: catName,
      // parent_id: parseInt(parentId),
      parent_id: parentId,
      cat_status: parseInt(status), // hoặc Boolean(status)
      slug: Slug,
    };

    try {
      const response = await apiCategory.editCategory(documentId, {
        data: categoryData,
      });
      console.log("response", response);
      console.error("bug:", documentId);
      alert("Cập nhật danh mục thành công!");
      navigate("/admin/categories/1");
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);

      // console.error("bug id:", id);
    }
  };

  return (
    // <div className="p-3 bg-white rounded-lg">
    //   <div className="flex justify-between mb-3 py-4 rounded-sm shadow">
    //     <h3 className="ml-6 text-3xl font-semibold text-blue-600">
    //       Chỉnh sửa danh mục
    //     </h3>
    //   </div>

    //   <div className="p-6 rounded-2xl shadow-md w-[500px]">
    //     <form onSubmit={handleSubmit}>
    //       <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700">
    //           Tên danh mục
    //         </label>
    //         <input
    //           type="text"
    //           value={catName}
    //           onChange={(e) => setCatName(e.target.value)}
    //           className="mt-1 block w-full border border-gray-300 rounded-xl p-2"
    //           placeholder="Nhập tên danh mục"
    //         />
    //       </div>

    //       <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700">
    //           Danh mục cha
    //         </label>
    //         <select
    //           value={parentId}
    //           onChange={(e) => setParentId(e.target.value)}
    //           className="mt-1 block w-full border border-gray-300 rounded-xl p-2 bg-white"
    //         >
    //           {/* {categories
    //             .filter((category) => category.documentId !== documentId)
    //             .map((category) => (
    //               <option key={category.documentId} value={category.documentId}>
    //                 {category.name}
    //               </option>
    //             ))} */}
    //           <option value="0">Chưa có danh mục cha</option>
    //           {categories.map((cat) => (
    //             <option key={cat.documentId} value={cat.documentId}>
    //               {cat.name}
    //             </option>
    //           ))}
    //         </select>
    //       </div>

    //       <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700">
    //           Slug
    //         </label>
    //         <input
    //           type="text"
    //           value={Slug}
    //           onChange={(e) => setSlug(e.target.value)}
    //           className="mt-1 block w-full border border-gray-300 rounded-xl p-2"
    //         />
    //       </div>

    //       <div className="mb-4">
    //         <label className="block text-sm font-medium text-gray-700">
    //           Trạng thái
    //         </label>
    //         <select
    //           value={status}
    //           onChange={(e) => setStatus(e.target.value)}
    //           className="mt-1 block w-full border border-gray-300 rounded-xl p-2 bg-white"
    //         >
    //           <option value="0">Ẩn</option>
    //           <option value="1">Hiện</option>
    //         </select>
    //       </div>

    //       <button
    //         type="submit"
    //         className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
    //       >
    //         Lưu
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <>  </>
  );
};

export default EditCat;
