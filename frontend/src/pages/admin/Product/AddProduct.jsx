// import apiCategory from "../../../api/apiCategory";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import apiBrand from "../../../api/apiBrand";
// import apiProduct from "../../../api/apiProduct";
// import axiosInstance from "../../../api/axios";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AddProduct = () => {
 
  
  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
            Thêm sản phẩm mới
          </h3>
          <div>
            <Link
              to="/admin/products"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded items-center inline-flex transition duration-200"
            >
 <FaArrowLeft className="mr-2" /> Về danh sách
            </Link>

            
          
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <form method="POST" encType="multipart/form-data">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Thông tin cơ bản */}
              <div className="lg:w-2/3">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                    Thông tin cơ bản
                  </h4>

                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Tên sản phẩm
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Nhập tên sản phẩm"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mô tả
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows="3"
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Nhập mô tả sản phẩm"
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="detail"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Chi tiết sản phẩm
                    </label>
                    <textarea
                      name="detail"
                      id="detail"
                      rows="5"
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Nhập chi tiết sản phẩm"
                    ></textarea>
                  </div>
                </div>

                {/* Giá & Số lượng */}
                <div className="bg-indigo-50 p-6 rounded-lg shadow-sm mb-6">
                  <h4 className="text-lg font-semibold text-indigo-700 mb-4 pb-2 border-b border-indigo-200">
                    Giá & Số lượng
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="mb-4">
                      <label
                        htmlFor="price_root"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Giá bán
                      </label>
                      <input
                        type="text"
                        name="price_root"
                        id="price_root"
                        className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Nhập giá bán"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="price_sale"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Giá khuyến mãi
                      </label>
                      <input
                        type="text"
                        name="price_sale"
                        id="price_sale"
                        className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Nhập giá khuyến mãi"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="qty"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Số lượng
                      </label>
                      <input
                        type="text"
                        name="qty"
                        id="qty"
                        defaultValue="1"
                        className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Nhập số lượng"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Phân loại và hình ảnh */}
              <div className="lg:w-1/3">
                <div className="bg-purple-50 p-6 rounded-lg shadow-sm mb-6">
                  <h4 className="text-lg font-semibold text-purple-700 mb-4 pb-2 border-b border-purple-200">
                    Phân loại
                  </h4>

                  <div className="mb-4">
                    <label
                      htmlFor="category_id"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Danh mục
                    </label>
                    <select
                      name="category_id"
                      id="category_id"
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Chọn danh mục</option>
                      <option value="1">Danh mục 1</option>
                      <option value="2">Danh mục 2</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="brand_id"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Thương hiệu
                    </label>
                    <select
                      name="brand_id"
                      id="brand_id"
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Chọn thương hiệu</option>
                      <option value="1">Thương hiệu 1</option>
                      <option value="2">Thương hiệu 2</option>
                    </select>
                  </div>
                </div>

                {/* Hình ảnh & Trạng thái */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                    Hình ảnh & Trạng thái
                  </h4>

                  <div className="flex flex-col items-center mb-4">
                    <div className="w-40 h-32 mb-4 relative bg-gray-200 rounded-md flex items-center justify-center">
                      <i className="fas fa-image text-gray-400 text-5xl"></i>
                    </div>

                    <input
                      type="file"
                      name="thumbnail"
                      id="thumbnail"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Trạng thái
                    </label>
                    <select
                      name="status"
                      id="status"
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="1">Xuất bản</option>
                      <option value="0">Không xuất bản</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-md hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
                  >
                    <i className="fas fa-plus mr-2"></i> Thêm sản phẩm
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddProduct;
