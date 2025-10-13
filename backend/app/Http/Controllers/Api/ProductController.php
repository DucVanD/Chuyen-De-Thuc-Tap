<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Http\Requests\StoreProductRequest;
use Illuminate\Support\Facades\DB;
use App\Models\Category;
use App\Models\Brand;
use App\Models\OrderDetail;


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
            'product.qty',
            'product.price_root as price',
            'category.name as category_name',
            'brand.name as brand_name'
        )
            ->Join('category', 'product.category_id', '=', 'category.id')
            ->Join('brand', 'product.brand_id', '=', 'brand.id')
            ->orderBy('product.id', 'asc')
            ->paginate(8);

        return response()->json([
            'status' => true,
            'message' => 'Danh sách sản phẩm có phân trang',
            'data' => $list
        ]);
    }

    public function getAllProductUser()
    {
        $products = Product::orderBy('id', 'asc')->paginate(12);


        $products->getCollection()->transform(function ($product) {
            return $product->append('discount_percent');
        });

        return response()->json([
            'status' => true,
            'message' => 'Danh sách tất cả sản phẩm',
            'data' => $products
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

    //  form edit
    public function edit(string $id)
    {

        $product = Product::find($id);
        if ($product == null) {
            return redirect()->route('product.index')->with('error', 'Sản phẩm không tồn tại');
        }
        $list_category = Category::select('id', 'name')
            ->orderBy('sort_order', 'asc')
            ->get();
        $list_brand = Brand::select('id', 'name')
            ->orderBy('sort_order', 'asc')
            ->get();
        return response()->json([
            'status' => true,
            'message' => "Chỉnh sửa sản phẩm $id",
            'data' => [
                'product' => $product,
                'list_category' => $list_category,
                'list_brand' => $list_brand,
            ]
        ]);
    }

    public function update(Request $request, string $id)
    {
        $product = Product::find($id);
        if ($product == null) {
            return redirect()->route('product.index')->with('error', 'Sản phẩm không tồn tại');
        }
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
            'message' => "Cập nhật sản phẩm $product->name thành công",
            'data' => $product
        ]);
    }




    public function newest()
    {
        $products = Product::orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($product) {
                // Nếu có giá khuyến mãi và nhỏ hơn giá gốc
                if ($product->price_sale > 0 && $product->price_sale < $product->price_root) {
                    $product->discount_percent = round((($product->price_root - $product->price_sale) / $product->price_root) * 100);
                } else {
                    $product->discount_percent = 0;
                }

                return $product;
            });

        return response()->json([
            'status' => true,
            'message' => '10 sản phẩm mới nhất (có tính % giảm giá)',
            'data' => $products
        ]);
    }



    // san pham giam gia cao
    // Sản phẩm giảm giá cao nhất
    public function salediscount()
    {
        $products = Product::select(
            '*',
            // Giảm theo tiền
            DB::raw('CASE
                    WHEN price_sale IS NULL OR price_sale = 0 THEN 0
                    ELSE (price_root - price_sale)
                 END AS discount'),

            // Giảm theo %
            DB::raw('CASE
                    WHEN price_root > 0
                         AND price_sale > 0
                         AND price_sale < price_root
                    THEN LEAST(FLOOR(((price_root - price_sale) / price_root) * 100), 99)
                    ELSE 0
                 END AS discount_percent')
        )
            ->where('status', 1)
            ->whereNotNull('price_root')
            ->where('price_root', '>', 0)
            ->orderByDesc('discount_percent') // sắp theo % giảm cao nhất
            ->take(6)
            ->get();

        return response()->json([
            'status' => true,
            'message' => '6 sản phẩm giảm giá cao nhất',
            'data' => $products
        ]);
    }


    public function getProductBySlug($slug)
    {
        $product = Product::select(
            'product.id',
            'product.name',
            'product.slug',
            'product.qty',
            'product.detail',
            'product.description',
            'product.thumbnail',
            'product.status',
            'product.price_root as price_root',
            'product.price_sale as price_sale',
            'category.name as category_name',
            'brand.name as brand_name'

        )
            ->join('category', 'product.category_id', '=', 'category.id')
            ->join('brand', 'product.brand_id', '=', 'brand.id')
            ->where('product.slug', $slug)
            ->first();

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => "Không tìm thấy sản phẩm với slug = $slug",
                'data' => null
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => "Chi tiết sản phẩm với slug = $slug",
            'data' => $product
        ]);
    }
    // search
    public function search(Request $request)
    {
        $keyword = $request->input('keyword'); // chỉ nhận 1 keyword thôi

        $products = Product::with('category')
            ->where(function ($query) use ($keyword) {
                $query->where('name', 'LIKE', '%' . $keyword . '%') // tìm theo tên sản phẩm
                    ->orWhereHas('category', function ($q) use ($keyword) {
                        $q->where('name', 'LIKE', '%' . $keyword . '%') // tìm theo tên danh mục
                            ->orWhere('slug', 'LIKE', '%' . $keyword . '%'); // thêm cả slug
                    });
            })
            ->distinct()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => true,
            'data' => $products
        ]);
    }

    public function getByCategorySlug($slug)
    {
        $category = Category::where('slug', $slug)->first();

        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Danh mục không tồn tại'
            ]);
        }

        // Nếu là cha (parent_id = 0) thì lấy cả con
        if ($category->parent_id == 0) {
            $childIds = Category::where('parent_id', $category->id)->pluck('id')->toArray();
            $allIds = array_merge([$category->id], $childIds);

            $products = Product::with('category')
                ->whereIn('category_id', $allIds)
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            // Nếu là con thì chỉ lấy đúng nó
            $products = Product::with('category')
                ->where('category_id', $category->id)
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return response()->json([
            'status' => true,
            'data' => $products,
            'category' => $category
        ]);
    }


    // Soft delete (ẩn sản phẩm)
    public function delete($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Sản phẩm không tồn tại'
            ], 404);
        }

        // Kiểm tra sản phẩm có trong đơn hàng không
        $hasOrder = OrderDetail::where('product_id', $product->id)->exists();
        if ($hasOrder) {
            return response()->json([
                'status' => false,
                'message' => 'Sản phẩm đang được đặt, không thể xóa'
            ], 400);
        }

        $product->delete(); // soft delete
        return response()->json([
            'status' => true,
            'message' => 'Xóa sản phẩm thành công'
        ]);
    }

    // Xóa vĩnh viễn từ Trash
    public function destroy($id)
    {
        $product = Product::onlyTrashed()->find($id);

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Sản phẩm không tồn tại trong Trash'
            ], 404);
        }

        // Xóa ảnh nếu có
        $image_path = public_path('assets/images/product/' . $product->thumbnail);
        if (File::exists($image_path)) File::delete($image_path);

        $product->forceDelete(); // xóa vĩnh viễn
        return response()->json([
            'status' => true,
            'message' => 'Xóa sản phẩm vĩnh viễn thành công'
        ]);
    }

    // Khôi phục sản phẩm từ Trash
    public function restore($id)
    {
        $product = Product::onlyTrashed()->find($id);

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Sản phẩm không tồn tại trong Trash'
            ], 404);
        }

        $product->restore();
        return response()->json([
            'status' => true,
            'message' => 'Khôi phục sản phẩm thành công'
        ]);
    }

    // Lấy danh sách sản phẩm trong Trash
    public function trash()
    {
        $products = Product::onlyTrashed()
            ->select(
                'product.id',
                'product.name',
                'category.name as category_name',
                'brand.name as brand_name',
                'thumbnail',
                'product.status',
                'price_root'
            )
            ->join('category', 'product.category_id', '=', 'category.id')
            ->join('brand', 'product.brand_id', '=', 'brand.id')
            ->orderBy('product.created_at', 'desc')
            ->paginate(8);

        return response()->json([
            'status' => true,
            'data' => $products
        ]);
    }
    // filter
  public function filter(Request $request)
{
    $query = Product::with(['category', 'brand']);

    $query->when($request->category_ids, function ($q, $ids) {
        $idArray = is_array($ids) ? $ids : explode(',', $ids);
        $q->whereIn('category_id', $idArray);
    });
    $query->when($request->brand_ids, function ($q, $ids) {
        $idArray = is_array($ids) ? $ids : explode(',', $ids);
        $q->whereIn('brand_id', $idArray);
    });
    $query->when($request->name, fn($q, $name) => $q->where('name', 'LIKE', "%$name%"));
    $query->when($request->min_price, fn($q, $min) => $q->where('price_root', '>=', $min));
    $query->when($request->max_price, fn($q, $max) => $q->where('price_root', '<=', $max));

    $allowedSort = ['created_at', 'price_root', 'name', 'price_sale'];
    $sortBy = in_array($request->input('sort_by'), $allowedSort) ? $request->input('sort_by') : 'created_at';
    $sortOrder = $request->input('sort_order', 'desc');

    if ($sortBy === 'price_sale') {
        $query->orderByRaw('CASE WHEN price_sale > 0 THEN price_sale ELSE price_root END ' . $sortOrder);
    } else {
        $query->orderBy($sortBy, $sortOrder);
    }

    $products = $query->paginate($request->input('limit', 12));

    $products->getCollection()->transform(function ($p) {
        $p->discount_percent = ($p->price_root > 0 && $p->price_sale > 0)
            ? round((($p->price_root - $p->price_sale) / $p->price_root) * 100)
            : 0;
        return $p;
    });

    return response()->json([
        'status' => true,
        'message' => 'Kết quả lọc sản phẩm',
        'data' => $products
    ]);
}

    // category home

    public function categoryhome()
    {
        $categories = Category::whereIn('name', ['Nước ngọt', 'Sữa tươi', 'Hải sản'])
            ->with(['products' => function ($q) {
                $q->take(3)
                    ->select('id', 'name', 'thumbnail', 'price_root', 'price_sale', 'category_id', 'slug');
            }])
            ->get();

        // Duyệt qua từng sản phẩm để thêm % giảm giá
        $categories->each(function ($category) {
            $category->products->each(function ($product) {
                if ($product->price_root > 0 && $product->price_sale < $product->price_root) {
                    $product->discount_percent = round(100 - ($product->price_sale / $product->price_root * 100));
                } else {
                    $product->discount_percent = 0;
                }
            });
        });

        return response()->json([
            'status' => true,
            'message' => 'Danh mục chọn lọc cùng sản phẩm',
            'data' => $categories
        ]);
    }
}
