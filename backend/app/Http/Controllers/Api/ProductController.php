<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\Category;
use App\Models\Brand;
use App\Models\OrderDetail;
use App\Models\StockMovement;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $categoryId = $request->input('category_id');
        $brandId = $request->input('brand_id');
        $minPrice = $request->input('min_price');
        $maxPrice = $request->input('max_price');
        $lowStock = $request->boolean('low_stock');
        $status = $request->input('status');
        $keyword = $request->input('keyword');
        $sortBy = $request->input('sort_by', 'product.id');
        $sortOrder = $request->input('sort_order', 'desc');
        $limit = $request->input('limit', 8);

        $query = Product::select(
            'product.id',
            'product.name',
            'product.slug',
            'product.thumbnail',
            'product.status',
            'product.qty',
            'product.price_root as price',
            'product.price_sale as sale',
            'category.name as category_name',
            'brand.name as brand_name'
        )
            ->join('category', 'product.category_id', '=', 'category.id')
            ->join('brand', 'product.brand_id', '=', 'brand.id');

        // 🎯 Bộ lọc
        $query->when($categoryId, fn($q) => $q->where('product.category_id', $categoryId));

        $query->when($brandId, fn($q) => $q->where('product.brand_id', $brandId));

        $query->when(
            $minPrice && $maxPrice,
            fn($q) =>
            $q->whereBetween('product.price_root', [$minPrice, $maxPrice])
        );

        $query->when(
            $minPrice && !$maxPrice,
            fn($q) =>
            $q->where('product.price_root', '>=', $minPrice)
        );

        $query->when(
            !$minPrice && $maxPrice,
            fn($q) =>
            $q->where('product.price_root', '<=', $maxPrice)
        );

        // 🧾 Lọc sản phẩm sắp hết hàng
        $query->when($lowStock, fn($q) => $q->where('product.qty', '<=', 10));

        // 🔍 Lọc theo từ khóa
        $query->when(
            $keyword,
            fn($q) =>
            $q->where(function ($sub) use ($keyword) {
                $sub->where('product.name', 'like', "%$keyword%")
                    ->orWhere('product.slug', 'like', "%$keyword%");
            })
        );

        // ⚙️ Lọc theo trạng thái
        $query->when(isset($status), fn($q) => $q->where('product.status', $status));

        // 📅 Sắp xếp
        $query->orderBy($sortBy, $sortOrder);

        // 📄 Phân trang
        $list = $query->paginate($limit);

        return response()->json([
            'status' => true,
            'message' => 'Danh sách sản phẩm có phân trang và lọc (index style như Order)',
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

    public function store(Request $request)
    {
        // 🧩 Bước 1: Validate dữ liệu đầu vào
        $request->validate([
            'name' => 'required|string|max:255|unique:product,name',
            'price_root' => 'required|numeric|min:0',
            'price_sale' => 'nullable|numeric|min:0',
            'qty' => 'required|integer|min:0',
            'status' => 'required|in:0,1',
            'category_id' => 'required|exists:category,id',
            'brand_id' => 'nullable|exists:brand,id',
            'description' => 'nullable|string|max:1000',
            'detail' => 'nullable|string',
            'thumbnail' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
        ], [
            // 🔹 Tên sản phẩm
            'name.required' => 'Tên sản phẩm không được để trống.',
            'name.string' => 'Tên sản phẩm phải là chuỗi ký tự.',
            'name.max' => 'Tên sản phẩm không được vượt quá 255 ký tự.',
            'name.unique' => 'Tên sản phẩm đã tồn tại trong hệ thống.',

            // 🔹 Giá
            'price_root.required' => 'Giá gốc là bắt buộc.',
            'price_root.numeric' => 'Giá gốc phải là số.',
            'price_root.min' => 'Giá gốc không được nhỏ hơn 0.',
            'price_sale.numeric' => 'Giá khuyến mãi phải là số.',
            'price_sale.min' => 'Giá khuyến mãi không được nhỏ hơn 0.',

            // 🔹 Số lượng
            'qty.required' => 'Số lượng là bắt buộc.',
            'qty.integer' => 'Số lượng phải là số nguyên.',
            'qty.min' => 'Số lượng không được nhỏ hơn 0.',

            // 🔹 Trạng thái
            'status.required' => 'Trạng thái sản phẩm là bắt buộc.',
            'status.in' => 'Trạng thái chỉ được là 0 (không xuất bản) hoặc 1 (xuất bản).',

            // 🔹 Danh mục & thương hiệu
            'category_id.required' => 'Danh mục là bắt buộc.',
            'category_id.exists' => 'Danh mục không hợp lệ.',
            'brand_id.exists' => 'Thương hiệu không hợp lệ.',

            // 🔹 Mô tả & chi tiết
            'description.string' => 'Mô tả phải là chuỗi ký tự.',
            'description.max' => 'Mô tả không được vượt quá 1000 ký tự.',
            'detail.string' => 'Chi tiết sản phẩm phải là chuỗi ký tự.',

            // 🔹 Hình ảnh
            'thumbnail.file' => 'Ảnh đại diện phải là tệp hợp lệ.',
            'thumbnail.mimes' => 'Ảnh phải có định dạng jpg, jpeg, png hoặc webp.',
            'thumbnail.max' => 'Kích thước ảnh tối đa là 2MB.',
        ]);

        // 🧩 Bước 2: Tạo mới sản phẩm
        $product = new Product();
        $product->name = $request->name;
        $product->slug = Str::of($request->name)->slug('-');
        $product->detail = $request->detail;
        $product->price_root = $request->price_root;
        $product->price_sale = $request->price_sale ?? 0;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->status = $request->status;
        $product->created_by = Auth::id() ?? 1;
        $product->created_at = now();
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;

        // 🧩 Bước 3: Upload ảnh (nếu có)
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $extension = $file->getClientOriginalExtension();
            $filename = $product->slug . '.' . $extension;
            $file->move(public_path('assets/images/product'), $filename);
            $product->thumbnail = $filename;
        }

        // 🧩 Bước 4: Lưu sản phẩm
        $product->save();

        // 🧩 Bước 5: Trả kết quả
        return response()->json([
            'status' => true,
            'message' => "Thêm sản phẩm {$product->name} thành công.",
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
        // ✅ Bước 1: Kiểm tra dữ liệu đầu vào
        $request->validate([
            'name' => 'required|string|max:255|unique:product,name,' . $id,
            'price_root' => 'required|numeric|min:0',
            'price_sale' => 'nullable|numeric|min:0',
            'qty' => 'required|integer|min:0',
            'status' => 'required|in:0,1',
            'category_id' => 'required|exists:category,id',
            'brand_id' => 'nullable|exists:brand,id',
            'description' => 'nullable|string|max:1000',
            'detail' => 'nullable|string',
            'thumbnail' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048', // tối đa 2MB
        ], [
            // 🔹 Tên sản phẩm
            'name.required' => 'Tên sản phẩm không được để trống.',
            'name.string' => 'Tên sản phẩm phải là chuỗi ký tự.',
            'name.max' => 'Tên sản phẩm không được vượt quá 255 ký tự.',
            'name.unique' => 'Tên sản phẩm đã tồn tại trong hệ thống.',

            // 🔹 Giá gốc & giá khuyến mãi
            'price_root.required' => 'Giá gốc là bắt buộc.',
            'price_root.numeric' => 'Giá gốc phải là số.',
            'price_root.min' => 'Giá gốc không được nhỏ hơn 0.',
            'price_sale.numeric' => 'Giá khuyến mãi phải là số.',
            'price_sale.min' => 'Giá khuyến mãi không được nhỏ hơn 0.',

            // 🔹 Số lượng
            'qty.required' => 'Số lượng là bắt buộc.',
            'qty.integer' => 'Số lượng phải là số nguyên.',
            'qty.min' => 'Số lượng không được nhỏ hơn 0.',

            // 🔹 Trạng thái
            'status.required' => 'Trạng thái sản phẩm là bắt buộc.',
            'status.in' => 'Trạng thái chỉ được là 0 (không xuất bản) hoặc 1 (xuất bản).',

            // 🔹 Danh mục & thương hiệu
            'category_id.required' => 'Danh mục là bắt buộc.',
            'category_id.exists' => 'Danh mục không hợp lệ.',
            'brand_id.exists' => 'Thương hiệu không hợp lệ.',

            // 🔹 Mô tả & chi tiết
            'description.string' => 'Mô tả phải là chuỗi ký tự.',
            'description.max' => 'Mô tả không được vượt quá 1000 ký tự.',
            'detail.string' => 'Chi tiết sản phẩm phải là chuỗi ký tự.',

            // 🔹 Hình ảnh
            'thumbnail.file' => 'Ảnh đại diện phải là tệp hợp lệ.',
            'thumbnail.mimes' => 'Ảnh phải có định dạng jpg, jpeg, png hoặc webp.',
            'thumbnail.max' => 'Kích thước ảnh tối đa là 2MB.',
        ]);


        // ✅ Bước 2: Tìm sản phẩm cần cập nhật
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['status' => false, 'message' => 'Sản phẩm không tồn tại']);
        }

        $oldQty = $product->qty;

        // ✅ Bước 3: Cập nhật dữ liệu sản phẩm
        $product->name = $request->name;
        $product->slug = Str::of($request->name)->slug('-');
        $product->detail = $request->detail;
        $product->price_root = $request->price_root;
        $product->price_sale = $request->price_sale;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->status = $request->status;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->created_by = Auth::id() ?? 1;

        // ✅ Bước 4: Upload ảnh (nếu có)
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $extension = $file->getClientOriginalExtension();
            $filename = $product->slug . '.' . $extension;
            $file->move(public_path('assets/images/product'), $filename);
            $product->thumbnail = $filename;
        }

        $product->save();

        // ✅ Bước 5: Ghi lịch sử tồn kho nếu thay đổi số lượng
        if ($oldQty != $product->qty) {
            $change = $product->qty - $oldQty;
            $type = $change > 0 ? 'import' : 'adjustment';
            $note = $change > 0 ? 'Nhập thủ công bởi Admin' : 'Giảm tồn kho (điều chỉnh)';

            StockMovement::create([
                'product_id' => $product->id,
                'product_name' => $product->name,
                'type' => $type,
                'quantity_change' => $change,
                'qty_after' => $product->qty,
                'note' => $note,
                'user_id' => Auth::id() ?? null,
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => "Cập nhật sản phẩm {$product->name} thành công",
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
            ->take(8)
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
            'category.id as category_id',
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

        // Kiểm tra sản phẩm có trong đơn hàng
        if (OrderDetail::where('product_id', $product->id)->exists()) {
            return response()->json([
                'status' => false,
                'message' => 'Sản phẩm đang được đặt, không thể xóa'
            ], 400);
        }

        $product->delete();

        return response()->json([
            'status' => true,
            'message' => 'Xóa sản phẩm thành công'
        ],); // ✅ thêm HTTP status code rõ ràng
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
            'message' => 'Xóa sản phẩm thành công'
        ], 200);
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


    public function related($categoryId, Request $request)
    {
        $excludeId = $request->query('exclude'); // id sản phẩm đang xem
        $limit = $request->query('limit', 5); // số lượng muốn lấy

        $products = Product::where('category_id', $categoryId)
            ->when($excludeId, fn($q) => $q->where('id', '<>', $excludeId))
            ->where('status', 1)
            // ->orderByDesc('created_at')
            ->inRandomOrder() // ✅ Random ngẫu nhiên mỗi lần gọi
            ->take($limit)
            ->get(['id', 'name', 'slug', 'thumbnail', 'price_root', 'price_sale', 'qty']);

        return response()->json([
            'status' => true,
            'message' => 'Danh sách sản phẩm liên quan',
            'data' => $products
        ]);
    }



    public function lowstock()
    {
        // Lấy các sản phẩm có số lượng tồn kho <= 10 (hoặc mức bạn muốn)
        $products = Product::select(
            'product.id',
            'product.name',
            'product.qty',
        )
            ->where('product.qty', '<=', 20)       // 🎯 điều kiện tồn kho thấp
            ->where('product.status', 1)           // chỉ lấy sản phẩm đang hoạt động
            ->orderBy('product.qty', 'asc')        // sản phẩm sắp hết xếp trên đầu
            ->take(10)                             // giới hạn 10 sản phẩm đầu tiên
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Danh sách sản phẩm sắp hết hàng',
            'data' => $products
        ]);
    }
}
