// import apiCategory from "../../../api/apiCategory";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
const AddCat = () => {
  // const [catName, setCatName] = useState(""); // Lưu danh sách danh mục
  // const [parentId, setParentId] = useState("0"); // Lưu danh sách danh mục
  // const [Slug, setSlug] = useState(""); // Lưu danh sách danh mục

  // const [categories, setCategories] = useState([]); // Lưu danh sách danh mục
  // const navigate = useNavigate();
  // useEffect(() => {
  //   apiCategory.getAll().then((res) => {
  //     try {
  //       const Menudata = res.map((item) => ({
  //         id: item.id,
  //         documentId:item.documentId,
  //         name: item.category_name,
  //         slug: item.slug,
  //         parent: item.parent_id,
  //       }));
  //       setCategories(Menudata);
  //     } catch (err) {
  //       console.log("Error: ", err.message);
  //     }
  //   });
  // }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // Ngăn chặn hành vi mặc định của form
  //   const categoryData = {
  //     category_name: catName,
  //     parent_id: parentId,

  //     slug: Slug,
  //   };
  //   // console.log("categoryData", categoryData);
  //   try {
  //     const response = await apiCategory.createCategory({ data: categoryData });
  //     console.log("response", response);
  //     alert("Thêm danh mục thành công!");
  //     navigate("/admin/categories/1"); // Chuyển hướng đến trang danh sách danh mục sau khi thêm thành công
  //   } catch (error) {
  //     console.error("Lỗi khi thêm danh mục:", error);
  //   }
  // };
  // console.log("catName", catName);

  // console.log("danh muc", categories);
  return (
    <>
      {/* <div className="p-3 bg-white rounded-lg ">
        <div className="flex justify-between mb-3 py-4 rounded-sm shadow">
          <h3 className="ml-6 text-3xl font-semibold text-blue-600">
            Thêm danh danh mục
          </h3>
        </div>

        <div className=" p-6 rounded-2xl shadow-md w-[500px]">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Tên danh mục
              </label>
              <input
                type="text"
                id="name"
                name="category_name"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập tên danh mục"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="parent_id"
                className="block text-sm font-medium text-gray-700"
              >
                Danh mục cha
              </label>
              <select
                id="parent_id"
                name="parent_id"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-xl p-2 bg-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="0">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.documentId} value={category.documentId}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700"
              >
                Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={Slug}
                onChange={(e) => setSlug(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder=""
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
            >
              Thêm danh mục
            </button>
          </form>
        </div>
      </div> */}
    </>
  );
};
export default AddCat;
