# 🛒 Chuyên Đề Thực Tập – Website Siêu Thị Mini

## 🌱 Giới thiệu
Dự án xây dựng **website siêu thị mini trực tuyến (Bean Farm / MiniMart)** với mô hình **Full-Stack 3 lớp**:
- **Frontend:** React + Vite + Tailwind CSS  
- **Backend:** Laravel 10 (API)  
- **Database:** MySQL (Railway)

Triển khai thực tế:
| Thành phần | Nền tảng | Link |
|-------------|-----------|------|
| 🖥️ Frontend | **Vercel** | [Xem trang web](https://chuyen-de-thuc-tap-46dg-dvanduws-projects.vercel.app) |
| ⚙️ Backend | **Render** | *(API chạy nền, kết nối DB)* |
| 🗄️ Database | **Railway** | *(MySQL Cloud)* |

---

## ⚙️ Cấu trúc dự án
Chuyen-De-Thuc-Tap/
├── backend/ → Laravel API (Render)
├── frontend/ → React + Vite (Vercel)
├── railway.* → Cấu hình kết nối Railway
├── package.json → Cấu hình frontend
└── README.md

yaml
Sao chép mã

---

## 🚀 Cách chạy cục bộ
### Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
Frontend (React)
bash
Sao chép mã
cd frontend
npm install
npm run dev
📦 Chức năng chính
👤 Đăng ký, đăng nhập (JWT)

🛍️ Quản lý sản phẩm, danh mục, thương hiệu

🛒 Giỏ hàng, thanh toán (VNPAY / COD)

📦 Quản lý đơn hàng, kho hàng, nhập - xuất

📊 Dashboard thống kê doanh thu, báo cáo ngày

🧠 Công nghệ sử dụng
Laravel • MySQL • React • Vite • Tailwind • Axios • Render • Railway • Vercel

👨‍💻 Tác giả
Nguyễn Văn Văn (DucVanD)
📅 03/2025 – 10/2025
🔗 github.com/DucVanD

🌐 Full-stack deploy: Frontend – Vercel | Backend – Render | Database – Railway
