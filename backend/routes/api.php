<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\TopicController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\BannerController;




Route::get('/check-api', function () {
    return response()->json(['status' => true, 'message' => 'API OK']);
});



route::prefix('user')->group(function () {
    route::get('trash', [UserController::class, 'trash'])->name('user.trash');
    route::get('delete/{user}', [UserController::class, 'delete'])->name('user.delete');
    route::get('restore/{user}', [UserController::class, 'restore'])->name('user.restore');
    route::get('status/{user}', [UserController::class, 'status'])->name('user.status');
});
route::resource('user', UserController::class);



// product
Route::get('product/newest', [ProductController::class, 'newest']);

route::prefix('product')->group(function () {
    route::get('trash', [ProductController::class, 'trash'])->name('product.trash');
    route::get('delete/{product}', [ProductController::class, 'delete'])->name('product.delete');
    route::get('restore/{product}', [ProductController::class, 'restore'])->name('product.restore');
    route::get('status/{product}', [ProductController::class, 'status'])->name('product.status');
});
route::resource('product', ProductController::class);

// category
Route::get('/category/all', [CategoryController::class, 'getAll']);
route::prefix('category')->group(function () {
    route::get('trash', [CategoryController::class, 'trash'])->name('category.trash');
    route::get('delete/{category}', [CategoryController::class, 'delete'])->name('category.delete');
    route::get('restore/{category}', [CategoryController::class, 'restore'])->name('category.restore');
    route::get('status/{category}', [CategoryController::class, 'status'])->name('category.status');
});
route::resource('category', CategoryController::class);

// contact

route::prefix('contact')->group(function () {
    route::get('trash', [ContactController::class, 'trash'])->name('contact.trash');
    route::get('delete/{contact}', [ContactController::class, 'delete'])->name('contact.delete');
    route::get('restore/{contact}', [ContactController::class, 'restore'])->name('contact.restore');
    route::get('status/{contact}', [ContactController::class, 'status'])->name('contact.status');
});
route::resource('contact', ContactController::class);

// post

route::prefix('post')->group(function () {
    route::get('trash', [PostController::class, 'trash'])->name('post.trash');
    route::get('delete/{post}', [PostController::class, 'delete'])->name('post.delete');
    route::get('restore/{post}', [PostController::class, 'restore'])->name('post.restore');
    route::get('status/{post}', [PostController::class, 'status'])->name('post.status');
});
route::resource('post', PostController::class);


//

route::prefix('topic')->group(function () {
    route::get('trash', [TopicController::class, 'trash'])->name('topic.trash');
    route::get('delete/{topic}', [TopicController::class, 'delete'])->name('topic.delete');
    route::get('restore/{topic}', [TopicController::class, 'restore'])->name('topic.restore');
    route::get('status/{topic}', [TopicController::class, 'status'])->name('topic.status');
});
route::resource('topic', TopicController::class);
// order
route::prefix('order')->group(function () {
    route::get('trash', [OrderController::class, 'trash'])->name('order.trash');
    route::get('delete/{order}', [OrderController::class, 'delete'])->name('order.delete');
    route::get('restore/{order}', [OrderController::class, 'restore'])->name('order.restore');
    route::get('status/{order}', [OrderController::class, 'status'])->name('order.status');
});
route::resource('order', OrderController::class);

// menu

route::prefix('menu')->group(function () {
    route::get('trash', [MenuController::class, 'trash'])->name('menu.trash');
    route::get('delete/{menu}', [MenuController::class, 'delete'])->name('menu.delete');
    route::get('restore/{menu}', [MenuController::class, 'restore'])->name('menu.restore');
    route::get('status/{menu}', [MenuController::class, 'status'])->name('menu.status');
});
route::resource('menu', MenuController::class);

// banner
route::prefix('banner')->group(function () {
    route::get('trash', [BannerController::class, 'trash'])->name('banner.trash');
    route::get('delete/{banner}', [BannerController::class, 'delete'])->name('banner.delete');
    route::get('restore/{banner}', [BannerController::class, 'restore'])->name('banner.restore');
    route::get('status/{banner}', [BannerController::class, 'status'])->name('banner.status');
});
route::resource('banner', BannerController::class);
// brand
route::prefix('brand')->group(function () {
    route::get('trash', [BrandController::class, 'trash'])->name('brand.trash');
    route::get('delete/{brand}', [BrandController::class, 'delete'])->name('brand.delete');
    route::get('restore/{brand}', [BrandController::class, 'restore'])->name('brand.restore');
    route::get('status/{brand}', [BrandController::class, 'status'])->name('brand.status');
});
route::resource('brand', BrandController::class);

