<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Api\{
    ProductController,
    CategoryController,
    PostController,
    ContactController,
    TopicController,
    MenuController,
    UserController,
    BrandController,
    OrderController,
    BannerController,
    AuthController,
    DashboardController,
    StockController,
    VnpayController
};


Route::post('/vnpay/create', [VnpayController::class, 'createPayment']);
Route::get('/vnpay/return', [VnpayController::class, 'vnpayReturn']);


// routes/api.php
Route::put('/orders/{order}/cancel', function ($orderId) {
    $order = \App\Models\Order::where('order_code', $orderId)->first();
    if ($order) {
        $order->update(['status' => 7]);
        return response()->json(['status' => true, 'message' => 'Đơn hàng đã được hủy']);
    }
    return response()->json(['status' => false, 'message' => 'Không tìm thấy đơn hàng'], 404);
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| File này định nghĩa tất cả các API endpoint cho ứng dụng.
| Mỗi nhóm (user, product, category, v.v...) đều có route riêng và RESTful.
| Các route đều trả về JSON và dùng prefix /api (theo mặc định của Laravel).
|--------------------------------------------------------------------------
*/

// ✅ Kiểm tra API hoạt động hay chưa
Route::get('/check-api', function () {
    return response()->json(['status' => true, 'message' => 'API OK']);
});

// ✅ Kiểm tra kết nối Database (DB test)
Route::get('/db-test', function () {
    try {
        $result = DB::select('SELECT NOW() as current_time');
        return response()->json([
            'status' => '✅ Database connected successfully!',
            'server_time' => $result[0]->current_time,
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => '❌ Database connection failed!',
            'error' => $e->getMessage(),
        ], 500);
    }
});

/* ------------------ DASHBOARD ------------------ */
Route::get('dashboard/summary', [DashboardController::class, 'summary']);
Route::get('dashboard/report/{date}', [DashboardController::class, 'getReportByDate']);

/* ------------------ AUTH (Đăng nhập / Đăng ký) ------------------ */
// ✅ Auth public
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/admin/login', [AuthController::class, 'adminLogin']); // admin login riêng

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Thông tin admin hiện tại
    Route::get('/me', [AuthController::class, 'adminMe']);

    // Đăng xuất admin
    Route::post('/logout', [AuthController::class, 'adminLogout']);

    // Dashboard
    Route::get('/dashboard/summary', [DashboardController::class, 'summary']);
    Route::get('/dashboard/report/{date}', [DashboardController::class, 'getReportByDate']);

    // Quản lý hệ thống
    Route::apiResources([
        'user' => UserController::class,
        'product' => ProductController::class,
        'category' => CategoryController::class,
        'post' => PostController::class,
        'topic' => TopicController::class,
        'banner' => BannerController::class,
        'brand' => BrandController::class,
        'menu' => MenuController::class,
        'order' => OrderController::class,
        'stock' => StockController::class,
    ]);
});




// 🔒 Các route yêu cầu token Sanctum (user đã đăng nhập)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/order/checkout', [OrderController::class, 'checkout']);
    Route::get('user/{id}/purchaseHistory', [UserController::class, 'purchaseHistory']);
});

/* ------------------ USER ------------------ */
Route::prefix('user')->group(function () {
    Route::get('trash', [UserController::class, 'trash'])->name('user.trash');
    Route::get('delete/{user}', [UserController::class, 'delete'])->name('user.delete');
    Route::get('restore/{user}', [UserController::class, 'restore'])->name('user.restore');
    Route::get('status/{user}', [UserController::class, 'status'])->name('user.status');
});
Route::resource('user', UserController::class);

// Lịch sử mua hàng theo người dùng


/* ------------------ PRODUCT ------------------ */
Route::get('/product/category/slug/{slug}', [ProductController::class, 'getByCategorySlug']);
Route::get('/product/search', [ProductController::class, 'search']);
Route::get('product/newest', [ProductController::class, 'newest']);
Route::get('product/salediscount', [ProductController::class, 'salediscount']);
Route::get('product/slug/{slug}', [ProductController::class, 'getProductBySlug']);
Route::get('/product/all', [ProductController::class, 'getAllProductUser']);
Route::post('/product/filter', [ProductController::class, 'filter']);
Route::get('/product/category', [ProductController::class, 'categoryhome']);
Route::get('/product/related/{categoryId}', [ProductController::class, 'related']);
Route::get('/product/lowstock', [ProductController::class, 'lowstock']);
Route::prefix('product')->group(function () {
    Route::get('trash', [ProductController::class, 'trash'])->name('product.trash');
    Route::get('delete/{product}', [ProductController::class, 'delete'])->name('product.delete');
    Route::get('restore/{product}', [ProductController::class, 'restore'])->name('product.restore');
    Route::get('status/{product}', [ProductController::class, 'status'])->name('product.status');
});
Route::resource('product', ProductController::class);

/* ------------------ CATEGORY ------------------ */
Route::get('/category/parents', [CategoryController::class, 'getParents']);
Route::get('/category/parentsWithChildren', [CategoryController::class, 'parentsWithChildren']);
Route::get('/category/all', [CategoryController::class, 'getAll']);

Route::prefix('category')->group(function () {
    Route::get('trash', [CategoryController::class, 'trash'])->name('category.trash');
    Route::get('delete/{category}', [CategoryController::class, 'delete'])->name('category.delete');
    Route::get('restore/{category}', [CategoryController::class, 'restore'])->name('category.restore');
    Route::get('status/{category}', [CategoryController::class, 'status'])->name('category.status');
});
Route::resource('category', CategoryController::class);

/* ------------------ CONTACT ------------------ */
Route::prefix('contact')->group(function () {
    Route::get('trash', [ContactController::class, 'trash'])->name('contact.trash');
    Route::get('delete/{contact}', [ContactController::class, 'delete'])->name('contact.delete');
    Route::get('restore/{contact}', [ContactController::class, 'restore'])->name('contact.restore');
    Route::get('status/{contact}', [ContactController::class, 'status'])->name('contact.status');
});
Route::resource('contact', ContactController::class);

/* ------------------ POST ------------------ */
Route::get('/post/slug/{slug}', [PostController::class, 'getPostSlug']);
Route::get('/post/newest', [PostController::class, 'newest']);

Route::get('/post/all', [PostController::class, 'getAll']);
Route::prefix('post')->group(function () {
    Route::get('trash', [PostController::class, 'trash'])->name('post.trash');
    Route::get('delete/{post}', [PostController::class, 'delete'])->name('post.delete');
    Route::get('restore/{post}', [PostController::class, 'restore'])->name('post.restore');
    Route::get('status/{post}', [PostController::class, 'status'])->name('post.status');
});
Route::resource('post', PostController::class);

/* ------------------ TOPIC ------------------ */
Route::get('topic/all', [TopicController::class, 'getAll']);
Route::prefix('topic')->group(function () {
    Route::get('trash', [TopicController::class, 'trash'])->name('topic.trash');
    Route::get('delete/{topic}', [TopicController::class, 'delete'])->name('topic.delete');
    Route::get('restore/{topic}', [TopicController::class, 'restore'])->name('topic.restore');
    Route::get('status/{topic}', [TopicController::class, 'status'])->name('topic.status');
});
Route::resource('topic', TopicController::class);

/* ------------------ ORDER ------------------ */
Route::get('/orders/{id}/invoice', [OrderController::class, 'exportInvoice']);
Route::prefix('order')->group(function () {
    Route::get('trash', [OrderController::class, 'trash'])->name('order.trash');
    Route::get('delete/{order}', [OrderController::class, 'delete'])->name('order.delete');
    Route::get('restore/{order}', [OrderController::class, 'restore'])->name('order.restore');
    Route::get('status/{order}', [OrderController::class, 'status'])->name('order.status');
});
Route::resource('order', OrderController::class);

// Checkout chỉ cho người dùng đã đăng nhập

/* ------------------ MENU ------------------ */
Route::prefix('menu')->group(function () {
    Route::get('trash', [MenuController::class, 'trash'])->name('menu.trash');
    Route::get('delete/{menu}', [MenuController::class, 'delete'])->name('menu.delete');
    Route::get('restore/{menu}', [MenuController::class, 'restore'])->name('menu.restore');
    Route::get('status/{menu}', [MenuController::class, 'status'])->name('menu.status');
});
Route::resource('menu', MenuController::class);

/* ------------------ BANNER ------------------ */
Route::prefix('banner')->group(function () {
    Route::get('trash', [BannerController::class, 'trash'])->name('banner.trash');
    Route::get('delete/{banner}', [BannerController::class, 'delete'])->name('banner.delete');
    Route::get('restore/{banner}', [BannerController::class, 'restore'])->name('banner.restore');
    Route::get('status/{banner}', [BannerController::class, 'status'])->name('banner.status');
});
Route::resource('banner', BannerController::class);

/* ------------------ BRAND ------------------ */
Route::prefix('brand')->group(function () {
    Route::get('trash', [BrandController::class, 'trash'])->name('brand.trash');
    Route::get('delete/{brand}', [BrandController::class, 'delete'])->name('brand.delete');
    Route::get('restore/{brand}', [BrandController::class, 'restore'])->name('brand.restore');
    Route::get('status/{brand}', [BrandController::class, 'status'])->name('brand.status');
});
Route::resource('brand', BrandController::class);

/* ------------------ STOCK (Tồn kho) ------------------ */
// CRUD chính cho bảng tồn kho
Route::apiResource('stock', StockController::class);

// Các thao tác nhập / xuất / điều chỉnh / trả hàng
Route::prefix('inventory')->group(function () {
    Route::get('/', [StockController::class, 'index']);      // Danh sách tồn kho
    Route::post('/import', [StockController::class, 'import']); // Nhập kho
    Route::post('/export', [StockController::class, 'export']); // Xuất kho
    Route::post('/adjust', [StockController::class, 'adjust']); // Điều chỉnh tồn kho
    Route::post('/return', [StockController::class, 'return']); // Trả hàng
});
