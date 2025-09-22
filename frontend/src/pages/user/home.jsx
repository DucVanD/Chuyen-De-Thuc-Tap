// import React, { useState, useEffect } from "react";
import { useState } from "react";
import { Play, X } from "lucide-react";
import logo from "../../assets/images/logo.png";
import { CiSearch } from "react-icons/ci";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { LuShuffle, LuHeart, LuShoppingBag } from "react-icons/lu";
import { Link } from "react-router-dom";
import { BiAlignLeft } from "react-icons/bi";
import slide from "../../assets/images/slide.png";
import thitheo from "../../assets/images/thitheo.png";
import rau from "../../assets/images/rau.png"; // hoặc tên file đúng
import raucu from "../../assets/images/raucu.png";
import cuqua from "../../assets/images/cuqua.png";
import suatuoi from "../../assets/images/suatuoi.png";
import thitbo from "../../assets/images/thitbo.png";
import bannerproduct1 from "../../assets/images/product2_img.webp";
import bannerproduct2 from "../../assets/images/product22_img.webp";
import bannerproduct3 from "../../assets/images/product32_img.webp";
import bannerproduct4 from "../../assets/images/product3_img.webp";
import bannerproduct5 from "../../assets/images/img_banner_index.webp";

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const menuItems = [
  {
    label: "Hệ thống",
    count: 8,
    icon: <SiHomeassistantcommunitystore className="h-6 w-6" />,
    href: "/system",
  },
  {
    label: "So sánh",
    count: 0,
    icon: <LuShuffle className="h-6 w-6" />,
    href: "/compare",
  },
  {
    label: "Yêu thích",
    count: 0,
    icon: <LuHeart className="h-6 w-6" />,
    href: "/wishlist",
  },
  {
    label: "Giỏ hàng",
    count: 0,
    icon: <LuShoppingBag className="h-6 w-6" />,
    href: "/cart",
  },
];

//
const videos = [
  {
    thumbnail: "https://picsum.photos/400/250?1",
    title: "Hướng dẫn cách làm sữa hạt sen ngon mê ly ngay tại nhà",
    url: "https://www.youtube.com/watch?v=xxxxx",
  },
  {
    thumbnail: "https://picsum.photos/400/250?2",
    title: "Hướng dẫn cách làm sữa hạt đậu đỏ thơm ngon, béo ngậy",
    url: "https://www.youtube.com/watch?v=xxxxx",
  },
  {
    thumbnail: "https://picsum.photos/400/250?3",
    title: "Hướng dẫn cách làm sữa hạt điều đơn giản mà không phải ai cũng...",
    url: "https://www.youtube.com/watch?v=xxxxx",
  },
  {
    thumbnail: "https://picsum.photos/400/250?4",
    title: "Hướng dẫn cách làm sữa hạt đậu đen siêu ngon cho cả gia đình",
    url: "https://www.youtube.com/watch?v=xxxxx",
  },
];

const Home = () => {
  return (
    <>
      <div>
        <header className="w-full bg-gray-300">
          <div className="flex px-30 justify-center items-center gap-0">
            <div className="basis-6/12  flex py-5">
              {/*  */}
              <div className="basis-4/12">
                <img src={logo} alt="" width={200} />
              </div>
              {/*  */}
              <div className="relative w-full max-w-sm basis-8/12">
                <input
                  type="text"
                  placeholder="Trái cây"
                  className="w-95 ml-8 rounded-full border border-gray-200 bg-gray-50 
                   pl-4 pr-10 py-2.5 sm:py-3 outline-none 
                   focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                   text-sm sm:text-base"
                />
                <CiSearch className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              </div>
              {/*  */}
            </div>
            <div className="basis-6/12">
              <div className="flex gap-4 justify-around">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className="relative flex items-center gap-2 px-4 py-2 rounded-full 
                 border border-gray-200 bg-white hover:shadow"
                  >
                    {/* Icon + badge */}
                    <div className="relative">
                      {item.icon}
                      {item.count > -1 && (
                        <span
                          className="absolute -top-2 -right-2 bg-emerald-600 text-white 
                           text-xs rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          {item.count}
                        </span>
                      )}
                    </div>

                    {/* Label */}
                    <span className="text-sm text-gray-700 font-medium">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* nav */}
          <nav className="flex px-40 justify-center items-center gap-0 border-b border-gray-300 shadow-xl h-[80px] bg-gray-100">
            <div className="basis-2/12">
              {/* Nút mở danh mục */}
              <button className="flex items-center gap-2 w-full bg-amber-400 text-gray-800 font-medium px-4 py-3 rounded-t-md">
                <BiAlignLeft className="h-5 w-5" />
                <span>Danh mục sản phẩm</span>
              </button>

              {/* Danh sách menu con */}
              {/* <ul className="bg-white shadow border rounded-b-md divide-y">
                <li className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  <span className="flex items-center gap-2">
                    <img
                      src="/icons/vegetable.png"
                      alt="Rau củ quả"
                      className="h-5 w-5"
                    />
                    Rau củ quả
                  </span>
                  <span>›</span>
                </li>
               
              </ul> */}
            </div>

            <div className="basis-8/12">
              <ul className="flex justify-evenly">
                <li className="bg-green-600 py-1 px-4 rounded-full">
                  <Link>Trang chủ</Link>
                </li>
                <li className="bg-gray-200 py-1 px-4 rounded-full">
                  <Link>Giới thiệu</Link>
                </li>
                <li className="bg-gray-200 py-1 px-4 rounded-full">
                  <Link>Sản phẩm</Link>
                </li>
                <li className="bg-gray-200 py-1 px-4 rounded-full">
                  <Link>Câu hỏi thường gặp</Link>
                </li>
                <li className="bg-gray-200 py-1 px-4 rounded-full">
                  <Link>Tin tức</Link>
                </li>
                <li className="bg-gray-200 py-1 px-4 rounded-full">
                  <Link>Liên hệ</Link>
                </li>
              </ul>
            </div>
            <div className="basis-2/12 text-center">
              <Link className="bg-red-600 py-1 px-4 rounded-full text-white animate-zoom">
                Mua hàng nhanh
              </Link>
            </div>
          </nav>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-10">
          {/* slide */}
          <section className="slide flex justify-center mt-3">
            <img
              src={slide}
              alt=""
              className="w-full object-cover h-auto rounded-2xl"
            />
          </section>

          <section className="mt-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <Link className="text-[25px] font-medium">
                  Danh mục nổi bật
                </Link>
              </div>
              <div className="flex gap-4 overflow-x-auto">
                <Link className="whitespace-nowrap">Trái cây</Link>
                <Link className="whitespace-nowrap">Rau củ quả</Link>
                <Link className="whitespace-nowrap">Thực phẩm sạch</Link>
              </div>
              <div className="flex gap-3 justify-end">
                {/* Nút Prev */}
                <button
                  onClick={() =>
                    document
                      .getElementById("category-list")
                      .scrollBy({ left: -200, behavior: "smooth" })
                  }
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
                >
                  <MdArrowBackIos className="text-gray-600" />
                </button>

                {/* Nút Next */}
                <button
                  onClick={() =>
                    document
                      .getElementById("category-list")
                      .scrollBy({ left: 200, behavior: "smooth" })
                  }
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
                >
                  <MdArrowForwardIos className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Slider */}
            <div className="relative">
              <div
                id="category-list"
                className="flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {/* Card sản phẩm */}

                <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                  <img
                    src={thitheo}
                    alt="Nước uống"
                    className="h-20 object-contain mb-2"
                  />
                  <h3 className="text-sm font-medium text-gray-800">
                    Nước uống
                  </h3>
                  <p className="text-xs text-gray-500">9 sản phẩm</p>
                </div>
                <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                  <img
                    src={thitheo}
                    alt="Nước uống"
                    className="h-20 object-contain mb-2"
                  />
                  <h3 className="text-sm font-medium text-gray-800">
                    Nước uống
                  </h3>
                  <p className="text-xs text-gray-500">9 sản phẩm</p>
                </div>
                <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                  <img
                    src={thitheo}
                    alt="Nước uống"
                    className="h-20 object-contain mb-2"
                  />
                  <h3 className="text-sm font-medium text-gray-800">
                    Nước uống
                  </h3>
                  <p className="text-xs text-gray-500">9 sản phẩm</p>
                </div>
                <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                  <img
                    src={thitheo}
                    alt="Nước uống"
                    className="h-20 object-contain mb-2"
                  />
                  <h3 className="text-sm font-medium text-gray-800">
                    Nước uống
                  </h3>
                  <p className="text-xs text-gray-500">9 sản phẩm</p>
                </div>
                <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                  <img
                    src={thitheo}
                    alt="Nước uống"
                    className="h-20 object-contain mb-2"
                  />
                  <h3 className="text-sm font-medium text-gray-800">
                    Nước uống
                  </h3>
                  <p className="text-xs text-gray-500">9 sản phẩm</p>
                </div>
                <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                  <img
                    src={thitheo}
                    alt="Nước uống"
                    className="h-20 object-contain mb-2"
                  />
                  <h3 className="text-sm font-medium text-gray-800">
                    Nước uống
                  </h3>
                  <p className="text-xs text-gray-500">9 sản phẩm</p>
                </div>
                <div className="h-40 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                  <img
                    src={rau}
                    alt="Nước uống"
                    className="h-20 object-contain mb-2"
                  />
                  <h3 className="text-sm font-medium text-gray-800">
                    Nước uống
                  </h3>
                  <p className="text-xs text-gray-500">9 sản phẩm</p>
                </div>
              </div>
            </div>
          </section>

          {/* sale 1 */}

          <section className="mt-12 bg-gray-200 rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
              {/* Banner bên trái */}
              <div className="lg:col-span-1 rounded-2xl bg-gradient-to-br from-amber-300 to-emerald-300 p-5 sm:p-6 flex flex-col justify-between min-h-[220px] sm:min-h-[380px]">
                <div>
                  <h3 className="text-lg sm:text-2xl font-semibold leading-snug">
                    Bán chạy nhất hàng ngày
                  </h3>
                  <p className="mt-2 sm:mt-3 text-emerald-900 text-sm sm:text-base">
                    Ưu đãi độc quyền - Giảm giá 20%
                  </p>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-emerald-900/80 max-w-xs">
                    Mua sắm thoải mái chỉ từ 20.000 VNĐ. Chỉ trong tuần này,
                    đừng bỏ lỡ.
                  </p>
                </div>
                <button className="self-start mt-4 sm:mt-6 rounded-full bg-white text-emerald-700 px-4 sm:px-5 py-2 text-sm sm:text-base font-medium shadow hover:shadow-md">
                  Mua ngay
                </button>
              </div>

              {/* Lưới sản phẩm */}
              <div className="lg:col-span-3">
                {/* Header với nút điều hướng */}
                <div className="flex gap-3 justify-end my-2">
                  {/* Nút Prev */}
                  <button
                    onClick={() =>
                      document
                        .getElementById("product-list")
                        .scrollBy({ left: -200, behavior: "smooth" })
                    }
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
                  >
                    <MdArrowBackIos className="text-gray-600" />
                  </button>

                  {/* Nút Next */}
                  <button
                    onClick={() =>
                      document
                        .getElementById("product-list")
                        .scrollBy({ left: 200, behavior: "smooth" })
                    }
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
                  >
                    <MdArrowForwardIos className="text-gray-600" />
                  </button>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="relative">
                  <div
                    id="product-list"
                    className="flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                  </div>
                </div>

                {/* buton */}

                <div className="text-center">
                  <button className="mt-6 bg-white px-5 py-1 rounded-2xl border border-green-600 text-green-600">
                    <Link className="">Xem tất cả</Link>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* banner */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {/* Card 1 */}
              <div className="relative bg-white rounded-lg overflow-hidden shadow">
                {/* Ảnh nền */}
                <img
                  src={cuqua}
                  alt="Nông sản tươi mới"
                  className="w-full h-48 object-cover"
                />
                {/* Lớp chữ ghi đè */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 bg-black/30 text-white">
                  <div>
                    <h3 className="text-lg font-semibold">Nông sản tươi mới</h3>
                    <p>Sản phẩm 100% từ Thiên nhiên</p>
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md self-start">
                    Xem ngay
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative bg-white rounded-lg overflow-hidden shadow">
                <img
                  src={suatuoi}
                  alt="Sữa nguyên chất"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-4 bg-black/20 text-white">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Bữa sáng lành mạnh
                    </h3>
                    <p>Sữa tươi nguyên chất Tiệt trùng</p>
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md self-start">
                    Xem ngay
                  </button>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative bg-white rounded-lg overflow-hidden shadow">
                <img
                  src={raucu}
                  alt="Rau củ hữu cơ"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-4 bg-black/20 text-white">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Rau củ hữu cơ 100%
                    </h3>
                    <p>Sạch sẽ và an toàn, Chất lượng</p>
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md self-start">
                    Xem ngay
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* sale */}
          <section className="mt-9">
            <div className="rounded-lg shadow-md">
              {/* Header */}
              <div className="bg-green-700 text-white p-4 flex justify-between items-center rounded-t-lg ">
                <div>
                  <h2 className="text-xl font-bold">Khuyến mãi đặc biệt ⚡</h2>
                  <p>Đừng bỏ lỡ cơ hội giảm giá đặc biệt!</p>
                </div>
                <div className="flex space-x-2">
                  <span className="bg-white text-green-700 px-3 py-1 rounded">
                    99 Ngày
                  </span>
                  <span className="bg-white text-green-700 px-3 py-1 rounded">
                    02 Giờ
                  </span>
                  <span className="bg-white text-green-700 px-3 py-1 rounded">
                    33 Phút
                  </span>
                  <span className="bg-white text-green-700 px-3 py-1 rounded">
                    35 Giây
                  </span>
                </div>
              </div>

              {/* Grid sản phẩm */}
              <div className="grid grid-cols-3 gap-4 p-4 border-b-2 border-r -2 border-l-2 border-dashed border-green-800 rounded-b-lg ">
                {/* Card sản phẩm */}
                <div className="relative border border-gray-200 rounded-lg p-3 shadow hover:shadow-lg mb-4 grid grid-cols-2 h-[200px]">
                  {/* Badge giảm giá */}

                  <div>
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                      4%
                    </span>

                    {/* Hình */}
                    <img
                      src={thitbo}
                      alt="Bò Kobe"
                      className="w-full h-32 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mt-2">Lúc lắc bò Kobe</h3>
                    <p className="text-sm text-gray-500">
                      Đã bán: 175/300{" "}
                      <span className="text-green-600 font-semibold">58%</span>
                    </p>

                    {/* Giá */}
                    <p className="text-gray-400 line-through">190.000₫</p>
                    <p className="text-red-600 font-bold">180.000₫</p>

                    {/* Progress */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "58%" }}
                      ></div>
                    </div>

                    {/* Button */}
                    <button className="bg-green-600 text-white w-full mt-2 py-2 rounded-md hover:bg-green-700">
                      Thêm vào giỏ
                    </button>
                  </div>

                  {/* Thông tin */}
                </div>
                <div className="relative border border-gray-200 rounded-lg p-3 shadow hover:shadow-lg mb-4 grid grid-cols-2 h-[200px]">
                  {/* Badge giảm giá */}

                  <div>
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                      4%
                    </span>

                    {/* Hình */}
                    <img
                      src={thitbo}
                      alt="Bò Kobe"
                      className="w-full h-32 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mt-2">Lúc lắc bò Kobe</h3>
                    <p className="text-sm text-gray-500">
                      Đã bán: 175/300{" "}
                      <span className="text-green-600 font-semibold">58%</span>
                    </p>

                    {/* Giá */}
                    <p className="text-gray-400 line-through">190.000₫</p>
                    <p className="text-red-600 font-bold">180.000₫</p>

                    {/* Progress */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "58%" }}
                      ></div>
                    </div>

                    {/* Button */}
                    <button className="bg-green-600 text-white w-full mt-2 py-2 rounded-md hover:bg-green-700">
                      Thêm vào giỏ
                    </button>
                  </div>

                  {/* Thông tin */}
                </div>
                <div className="relative border border-gray-200 rounded-lg p-3 shadow hover:shadow-lg mb-4 grid grid-cols-2 h-[200px]">
                  {/* Badge giảm giá */}

                  <div>
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                      4%
                    </span>

                    {/* Hình */}
                    <img
                      src={thitbo}
                      alt="Bò Kobe"
                      className="w-full h-32 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mt-2">Lúc lắc bò Kobe</h3>
                    <p className="text-sm text-gray-500">
                      Đã bán: 175/300{" "}
                      <span className="text-green-600 font-semibold">58%</span>
                    </p>

                    {/* Giá */}
                    <p className="text-gray-400 line-through">190.000₫</p>
                    <p className="text-red-600 font-bold">180.000₫</p>

                    {/* Progress */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "58%" }}
                      ></div>
                    </div>

                    {/* Button */}
                    <button className="bg-green-600 text-white w-full mt-2 py-2 rounded-md hover:bg-green-700">
                      Thêm vào giỏ
                    </button>
                  </div>

                  {/* Thông tin */}
                </div>
                <div className="relative border border-gray-200 rounded-lg p-3 shadow hover:shadow-lg mb-4 grid grid-cols-2 h-[200px]">
                  {/* Badge giảm giá */}

                  <div>
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                      4%
                    </span>

                    {/* Hình */}
                    <img
                      src={thitbo}
                      alt="Bò Kobe"
                      className="w-full h-32 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mt-2">Lúc lắc bò Kobe</h3>
                    <p className="text-sm text-gray-500">
                      Đã bán: 175/300{" "}
                      <span className="text-green-600 font-semibold">58%</span>
                    </p>

                    {/* Giá */}
                    <p className="text-gray-400 line-through">190.000₫</p>
                    <p className="text-red-600 font-bold">180.000₫</p>

                    {/* Progress */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "58%" }}
                      ></div>
                    </div>

                    {/* Button */}
                    <button className="bg-green-600 text-white w-full mt-2 py-2 rounded-md hover:bg-green-700">
                      Thêm vào giỏ
                    </button>
                  </div>

                  {/* Thông tin */}
                </div>
                <div className="relative border border-gray-200 rounded-lg p-3 shadow hover:shadow-lg mb-4 grid grid-cols-2 h-[200px]">
                  {/* Badge giảm giá */}

                  <div>
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                      4%
                    </span>

                    {/* Hình */}
                    <img
                      src={thitbo}
                      alt="Bò Kobe"
                      className="w-full h-32 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mt-2">Lúc lắc bò Kobe</h3>
                    <p className="text-sm text-gray-500">
                      Đã bán: 175/300{" "}
                      <span className="text-green-600 font-semibold">58%</span>
                    </p>

                    {/* Giá */}
                    <p className="text-gray-400 line-through">190.000₫</p>
                    <p className="text-red-600 font-bold">180.000₫</p>

                    {/* Progress */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "58%" }}
                      ></div>
                    </div>

                    {/* Button */}
                    <button className="bg-green-600 text-white w-full mt-2 py-2 rounded-md hover:bg-green-700">
                      Thêm vào giỏ
                    </button>
                  </div>

                  {/* Thông tin */}
                </div>
                <div className="relative border border-gray-200 rounded-lg p-3 shadow hover:shadow-lg mb-4 grid grid-cols-2 h-[200px]">
                  {/* Badge giảm giá */}

                  <div>
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                      4%
                    </span>

                    {/* Hình */}
                    <img
                      src={thitbo}
                      alt="Bò Kobe"
                      className="w-full h-32 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mt-2">Lúc lắc bò Kobe</h3>
                    <p className="text-sm text-gray-500">
                      Đã bán: 175/300{" "}
                      <span className="text-green-600 font-semibold">58%</span>
                    </p>

                    {/* Giá */}
                    <p className="text-gray-400 line-through">190.000₫</p>
                    <p className="text-red-600 font-bold">180.000₫</p>

                    {/* Progress */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "58%" }}
                      ></div>
                    </div>

                    {/* Button */}
                    <button className="bg-green-600 text-white w-full mt-2 py-2 rounded-md hover:bg-green-700">
                      Thêm vào giỏ
                    </button>
                  </div>

                  {/* Thông tin */}
                </div>
                <div className="relative border border-gray-200 rounded-lg p-3 shadow hover:shadow-lg mb-4 grid grid-cols-2 h-[200px]">
                  {/* Badge giảm giá */}

                  <div>
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                      4%
                    </span>

                    {/* Hình */}
                    <img
                      src={thitbo}
                      alt="Bò Kobe"
                      className="w-full h-32 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mt-2">Lúc lắc bò Kobe</h3>
                    <p className="text-sm text-gray-500">
                      Đã bán: 175/300{" "}
                      <span className="text-green-600 font-semibold">58%</span>
                    </p>

                    {/* Giá */}
                    <p className="text-gray-400 line-through">190.000₫</p>
                    <p className="text-red-600 font-bold">180.000₫</p>

                    {/* Progress */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "58%" }}
                      ></div>
                    </div>

                    {/* Button */}
                    <button className="bg-green-600 text-white w-full mt-2 py-2 rounded-md hover:bg-green-700">
                      Thêm vào giỏ
                    </button>
                  </div>

                  {/* Thông tin */}
                </div>

                {/* Lặp lại các card khác */}
              </div>
            </div>
          </section>

          {/* sale  */}
          <section className="mt-12 bg-gray-200 rounded-2xl h-[550px]">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch h-full">
              {/* Lưới sản phẩm */}
              <div className="lg:col-span-3 p-4">
                {/* Header với nút điều hướng */}
                <div className="flex justify-between gap-3  my-2">
                  <div className="gap-3 flex">
                    <Link className="text-orange-400">Thịt heo</Link>
                    <Link className="hover:text-amber-600">Thịt bò</Link>
                    <Link className="hover:text-amber-600">Hải sản</Link>
                  </div>

                  <div className="flex gap-3">
                    {/* Nút Prev */}
                    <button
                      onClick={() =>
                        document
                          .getElementById("product-list")
                          .scrollBy({ left: -200, behavior: "smooth" })
                      }
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
                    >
                      <MdArrowBackIos className="text-gray-600" />
                    </button>

                    {/* Nút Next */}
                    <button
                      onClick={() =>
                        document
                          .getElementById("product-list")
                          .scrollBy({ left: 200, behavior: "smooth" })
                      }
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
                    >
                      <MdArrowForwardIos className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="relative">
                  <div
                    id="product-list"
                    className="flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                  </div>
                </div>

                {/* buton */}

                <div className="text-center">
                  <button className="mt-6 bg-white px-5 py-1 rounded-2xl border border-green-600 text-green-600">
                    <Link className="">Xem tất cả</Link>
                  </button>
                </div>
              </div>

              {/* Banner bên phai */}
              <div className="lg:col-span-1 rounded-2xl bg-gradient-to-br from-amber-300 to-emerald-300 p-5 sm:p-6 flex flex-col justify-between min-h-[220px] sm:min-h-[380px]">
                <div>
                  <h3 className="text-lg sm:text-2xl font-semibold leading-snug">
                    Sản phẩm nổi bật trong farm
                  </h3>
                  <p className="mt-2 sm:mt-3 text-emerald-900 text-sm sm:text-base">
                    Ưu đãi độc quyền - Giảm giá 20%
                  </p>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-emerald-900/80 max-w-xs">
                    Mua sắm thoải mái chỉ từ 20.000 VNĐ. Chỉ trong tuần này,
                    đừng bỏ lỡ.
                  </p>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-emerald-900/80 max-w-xs">
                    Chỉ trong tuần này. Mua ngay kẻo lỡ...
                  </p>
                </div>
                <button className="self-start mt-4 sm:mt-6 rounded-full bg-white text-emerald-700 px-4 sm:px-5 py-2 text-sm sm:text-base font-medium shadow hover:shadow-md">
                  Mua ngay
                </button>

                <img src={raucu} alt="" />
              </div>
            </div>
          </section>

          {/* sp moi */}

          <section className="p-4 bg-gray-200 rounded-2xl mt-10">
            <div className=" gap-6 items-stretch h-full">
              {/* Lưới sản phẩm */}
              <div className="lg:col-span-3 p-4">
                <h2 className="mb-5 text-2xl font-mono">Sản phẩm mới</h2>

                {/* Danh sách sản phẩm */}
                <div className="relative">
                  <div
                    id="product-list"
                    className="flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                  </div>
                </div>

                {/* buton */}

                <div className="text-center">
                  <button className="mt-6 bg-white px-5 py-1 rounded-2xl border border-green-600 text-green-600">
                    <Link className="">Xem tất cả</Link>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* thit nhap khau */}
          <section className="p-4 mt-12 bg-gray-200 rounded-2xl">
            <div className="flex justify-between mb-5">
              <div>
                <h3 className="text-2xl">Thịt nhập khẩu</h3>
              </div>

              <div className="flex gap-4">
                <span>Thịt bò</span>
                <span>Thịt heo</span>
                <span>Thịt cừu</span>
                <span>Thịt gà</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
              {/* Banner bên trái */}
              <div className="">
                <div className="overflow-hidden rounded-lg mb-3">
                  <img
                    className="w-full h-full object-cover transform transition-transform duration-1000 ease-in-out hover:scale-110"
                    src={bannerproduct1}
                    alt=""
                  />
                </div>

                <div className="overflow-hidden rounded-lg">
                  <img
                    className="w-full h-full object-cover transform transition-transform duration-1000 ease-in-out hover:scale-110"
                    src={bannerproduct2}
                    alt=""
                  />
                </div>
              </div>

              {/* Lưới sản phẩm */}
              <div className="lg:col-span-3">
                {/* Header với nút điều hướng */}
                <div className="flex gap-3 justify-end my-2">
                  {/* Nút Prev */}
                  <button
                    onClick={() =>
                      document
                        .getElementById("product-list")
                        .scrollBy({ left: -200, behavior: "smooth" })
                    }
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
                  >
                    <MdArrowBackIos className="text-gray-600" />
                  </button>

                  {/* Nút Next */}
                  <button
                    onClick={() =>
                      document
                        .getElementById("product-list")
                        .scrollBy({ left: 200, behavior: "smooth" })
                    }
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
                  >
                    <MdArrowForwardIos className="text-gray-600" />
                  </button>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="relative">
                  <div
                    id="product-list"
                    className="flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                  </div>
                </div>

                {/* buton */}

                <div className="text-center">
                  <button className="mt-6 bg-white px-5 py-1 rounded-2xl border border-green-600 text-green-600">
                    <Link className="">Xem tất cả</Link>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* hai san tuoi */}

          <section className="p-4 mt-12 bg-gray-200 rounded-2xl">
            <div className="flex justify-between mb-5">
              <div>
                <h3 className="text-2xl">Hải sản tươi</h3>
              </div>

              <div className="flex gap-4">
                <span>Tôm sú</span>
                <span>Chả mực</span>
                <span>Cá thu</span>
                <span>Cua biển</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
              {/* Lưới sản phẩm */}
              <div className="lg:col-span-3">
                {/* Header với nút điều hướng */}
                <div className="flex gap-3 justify-end my-2">
                  {/* Nút Prev */}
                  <button
                    onClick={() =>
                      document
                        .getElementById("product-list")
                        .scrollBy({ left: -200, behavior: "smooth" })
                    }
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
                  >
                    <MdArrowBackIos className="text-gray-600" />
                  </button>

                  {/* Nút Next */}
                  <button
                    onClick={() =>
                      document
                        .getElementById("product-list")
                        .scrollBy({ left: 200, behavior: "smooth" })
                    }
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow"
                  >
                    <MdArrowForwardIos className="text-gray-600" />
                  </button>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="relative">
                  <div
                    id="product-list"
                    className="flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                    <div className="h-60 w-48 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md">
                      <img
                        src={rau}
                        alt="Nước uống"
                        className="h-30 object-contain mb-5"
                      />
                      <h3 className="text-sm font-medium text-gray-800">
                        Nước uống
                      </h3>
                      <p className="text-green-600">55.00đ</p>
                      <p className="text-xs text-gray-500">9 sản phẩm</p>
                    </div>
                  </div>
                </div>

                {/* buton */}

                <div className="text-center">
                  <button className="mt-6 bg-white px-5 py-1 rounded-2xl border border-green-600 text-green-600">
                    <Link className="">Xem tất cả</Link>
                  </button>
                </div>
              </div>

              {/* Banner bên phai */}
              <div className="">
                <div className="overflow-hidden rounded-lg mb-3">
                  <img
                    className="w-full h-full object-cover transform transition-transform duration-1000 ease-in-out hover:scale-110"
                    src={bannerproduct3}
                    alt=""
                  />
                </div>

                <div className="overflow-hidden rounded-lg">
                  <img
                    className="w-full h-full object-cover transform transition-transform duration-1000 ease-in-out hover:scale-110"
                    src={bannerproduct4}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>

          {/* video huong dan */}

          <section className="bg-gray-200 p-6 rounded-2xl mt-10">
            <h2 className="text-2xl font-bold mb-5">Video hướng dẫn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {videos.map((v, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow"
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                    {/* Nút Play */}
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Play className="text-white w-12 h-12" />
                    </a>
                  </div>

                  {/* Tiêu đề */}
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-700 line-clamp-2">
                      {v.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Nút xem tất cả */}
            <div className="text-center mt-5">
              <button className="px-6 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition">
                Xem tất cả
              </button>
            </div>
          </section>

          {/* banner */}
          <section className="mt-12">
           

            <div className="overflow-hidden rounded-lg mb-3">
              <img
                className="w-full h-full object-cover transform transition-transform duration-600 ease-in-out hover:scale-110"
                src={bannerproduct5}
                alt=""
              />
            </div>
          </section>

          {/*  */}

          {/* Nhóm danh mục nhỏ: Đồ khô / Thức uống / Bún các loại */}
          <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { title: "Đồ khô" },
              { title: "Thức uống" },
              { title: "Bún các loại" },
            ].map((block, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200 bg-white p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{block.title}</h4>
                  <a href="#" className="text-emerald-700 text-sm">
                    Xem thêm »
                  </a>
                </div>
                <div className="space-y-3">
                  {new Array(4).fill(0).map((_, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[56px,1fr,auto] items-center gap-3 rounded-lg border border-gray-100 p-2"
                    >
                      <div className="h-14 w-14 rounded bg-gray-50 flex items-center justify-center text-2xl">
                        🧺
                      </div>
                      <div>
                        <div className="text-sm">Sản phẩm {i + 1}</div>
                        <div className="text-xs text-gray-400 line-through">
                          35.000₫
                        </div>
                        <div className="text-emerald-700 font-semibold text-sm">
                          29.000₫
                        </div>
                      </div>
                      <button className="rounded-full bg-emerald-600 text-white text-xs px-3 py-1.5">
                        Thêm vào giỏ
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Đối tác của chúng tôi */}
          <section className="mt-12">
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Đối tác của chúng tôi
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 items-center">
                {["BIBO", "Organica", "Nhà Quê", "emart", "LOTTE", "NAMAN"].map(
                  (p, i) => (
                    <div
                      key={i}
                      className="h-12 rounded-md border flex items-center justify-center text-sm text-gray-600 bg-gray-50"
                    >
                      {p}
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          {/* Service badges */}
          <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { t: "Vận chuyển miễn phí", s: "Hóa đơn trên 3 triệu" },
              { t: "Đổi trả miễn phí", s: "Trong vòng 7 ngày" },
              { t: "100% Hoàn tiền", s: "Nếu sản phẩm lỗi" },
              { t: "Hotline: 1900 6750", s: "Hỗ trợ 24/7" },
            ].map((b, i) => (
              <div
                key={i}
                className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 flex items-center gap-3"
              >
                <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm">
                  ✓
                </div>
                <div>
                  <div className="text-sm font-medium text-emerald-800">
                    {b.t}
                  </div>
                  <div className="text-xs text-emerald-700/80">{b.s}</div>
                </div>
              </div>
            ))}
          </section>

          {/*  */}
        </main>

        <footer className="mt-12 border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand + contact */}
            <div>
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images/logo.png"
                  alt="Bean Farm"
                  className="h-10 w-auto"
                />
              </div>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Bean Farm - Siêu thị trực tuyến mua sắm nông sản, chất lượng,
                tươi xanh.
              </p>
              <p className="mt-2 text-emerald-700 font-medium">
                Giá siêu tốt - Giao siêu tốc.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <span className="font-medium">Địa chỉ:</span> 70 Lữ Gia,
                  Phường 15, Quận 11, TP.HCM
                </p>
                <p>
                  <span className="font-medium">Điện thoại:</span>{" "}
                  <a
                    href="tel:19006750"
                    className="text-emerald-700 font-semibold"
                  >
                    1900 6750
                  </a>
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href="mailto:support@sapo.vn"
                    className="text-emerald-700 font-semibold"
                  >
                    support@sapo.vn
                  </a>
                </p>
              </div>
            </div>

            {/* Policies */}
            <div>
              <h4 className="font-semibold text-lg">Chính sách</h4>
              <ul className="mt-4 space-y-3 text-gray-700">
                {[
                  "Chính sách thành viên",
                  "Chính sách thanh toán",
                  "Chính sách đổi sản phẩm",
                  "Chính sách bảo mật",
                  "Chính sách cộng tác viên",
                  "Chính sách bảo hành",
                ].map((t, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-emerald-700">
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guide */}
            <div>
              <h4 className="font-semibold text-lg">Hướng dẫn</h4>
              <ul className="mt-4 space-y-3 text-gray-700">
                {[
                  "Hướng dẫn mua hàng",
                  "Hướng dẫn đổi trả",
                  "Hướng dẫn thanh toán",
                  "Chương trình cộng tác viên",
                  "Tìm kiếm",
                  "Liên hệ",
                ].map((t, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-emerald-700">
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social + payment + Zalo */}
            <div>
              <h4 className="font-semibold text-lg">Kết nối với chúng tôi</h4>
              <div className="mt-4 flex gap-2">
                {["facebook", "twitter", "youtube", "instagram"].map((n, i) => (
                  <a
                    key={i}
                    href="#"
                    className="h-9 w-9 rounded-md bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700"
                  >
                    <span className="sr-only">{n}</span>
                    {/* simple dots as icon placeholders */}
                    <span className="h-1.5 w-1.5 bg-white rounded-full" />
                  </a>
                ))}
              </div>

              <h4 className="mt-6 font-semibold text-lg">
                Hình thức thanh toán
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {["₫", "↔", "VISA", "MOMO"].map((t, i) => (
                  <div
                    key={i}
                    className="px-3 py-1.5 rounded-md border text-sm text-gray-700"
                  >
                    {t}
                  </div>
                ))}
              </div>

              <h4 className="mt-6 font-semibold text-lg">Zalo Mini Apps</h4>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-20 w-20 rounded-md border flex items-center justify-center text-xs text-gray-500">
                  QR
                </div>
                <p className="text-sm text-gray-600">
                  Quét mã QR để mua hàng nhanh chóng
                </p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-700 text-white">
            <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-center">
              © Bản quyền thuộc về{" "}
              <span className="font-semibold">Mr. Bean</span> | Cung cấp bởi{" "}
              <span className="font-semibold">Sapo</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
