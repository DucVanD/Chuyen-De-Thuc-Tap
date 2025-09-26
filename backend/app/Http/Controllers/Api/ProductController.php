<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $list = Product::select(
            'product.id',
            'product.name',
            'product.slug',
            'product.thumbnail',
            'product.status',
            'product.price_root as price',
            'category.name as category_name',
            'brand.name as brand_name'
        )
            ->Join('category', 'product.category_id', '=', 'category.id')
            ->Join('brand', 'product.brand_id', '=', 'brand.id')
            ->orderBy('product.created_at', 'desc')
            ->paginate(8);

        return response()->json([
            'status' => true,
            'message' => 'Danh sách sản phẩm có phân trang',
            'data' => $list
        ]);
    }

    public function store(Request $request)
    {
        return response()->json([
            'status' => true,
            'message' => 'Tạo sản phẩm thành công',
            'data' => $request->all()
        ]);
    }

    public function show(string $id)
    {
        if ($id === "newest") {
            $product = Product::latest()->first();
            return response()->json([
                'status' => true,
                'message' => "Sản phẩm mới nhất",
                'data' => $product
            ]);
        }

        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => "Không tìm thấy sản phẩm có id = $id",
                'data' => []
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => "Chi tiết sản phẩm $id",
            'data' => $product
        ]);
    }



    public function update(Request $request, string $id)
    {
        return response()->json([
            'status' => true,
            'message' => "Cập nhật sản phẩm $id thành công",
            'data' => $request->all()
        ]);
    }

    public function destroy(string $id)
    {
        return response()->json([
            'status' => true,
            'message' => "Xóa sản phẩm $id thành công"
        ]);
    }



    public function newest()
    {
        $products = Product::orderBy('created_at', 'desc')->take(5)->get(); ;

        return response()->json([
            'status' => true,
            'message' => '5 sản phẩm mới nhất',
            'data' => $products
        ]);
    }
}
