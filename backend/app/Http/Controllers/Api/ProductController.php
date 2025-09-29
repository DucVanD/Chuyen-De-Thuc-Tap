<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Http\Requests\StoreProductRequest;
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

    public function store(Request  $request)
    {



        $product = new Product();
        $product->name = $request->name;


        $product->slug = Str::of($request->name)->slug('-');
        $product->detail = $request->detail;
        $product->price_root = $request->price_root;
        $product->price_sale = $request->price_sale;
        $product->qty = $request->qty;
        $product->description = $request->description;
        // Upload filex
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $extension = $file->getClientOriginalExtension();
            $filename = $product->slug . '.' . $extension;
            $file->move(public_path('assets/images/product'), $filename);
            $product->thumbnail =  $filename; // Lưu đường dẫn chính xác
        }


        $product->status = $request->status;
        $product->created_at = now();
        $product->created_by = Auth::id() ?? 1;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;

        $product->save();
        return response()->json([
            'status' => true,
            'message' => "Thêm sản phẩm $product->name thành công",
            'data' => $product
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
        $products = Product::orderBy('created_at', 'desc')->take(5)->get();;

        return response()->json([
            'status' => true,
            'message' => '5 sản phẩm mới nhất',
            'data' => $products
        ]);
    }
}
