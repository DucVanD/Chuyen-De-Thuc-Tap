<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use Illuminate\Support\Facades\File;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $list = Category::orderBy('id', 'asc')->paginate(6);
        return response()->json([
            'status' => true,
            'message' => 'Danh sách danh mục',
            'data' => $list
        ]);
    }

    public function getAll()
    {
        // Thêm điều kiện where('status', 1) vào truy vấn
        $list = Category::where('status', 1)
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Danh sách tất cả danh mục đang hoạt động', // Có thể cập nhật lại message
            'data' => $list
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 🧩 Bước 1: Validate dữ liệu đầu vào
        $request->validate([
            'name' => 'required|string|max:255|unique:category,name',
            'description' => 'nullable|string|max:1000',
            'sort_order' => 'required|integer|min:0', // ✅ bắt buộc nhập và >= 0
            'parent_id' => 'nullable|integer|min:0|exists:category,id',
            'status' => 'required|in:0,1',
            'image' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
        ], [
            // 🔹 Tên danh mục
            'name.required' => 'Tên danh mục không được để trống.',
            'name.unique' => 'Tên danh mục đã tồn tại.',
            'name.max' => 'Tên danh mục không được vượt quá 255 ký tự.',

            // 🔹 Thứ tự
            'sort_order.required' => 'Bạn phải nhập thứ tự sắp xếp.',
            'sort_order.integer' => 'Thứ tự sắp xếp phải là số nguyên.',
            'sort_order.min' => 'Thứ tự sắp xếp không được nhỏ hơn 0.',

            // 🔹 Danh mục cha
            'parent_id.required' => 'Vui lòng chọn danh mục cha.',
            'parent_id.exists' => 'Danh mục cha không hợp lệ.',
            'parent_id.integer' => 'Danh mục cha phải là số.',

            // 🔹 Trạng thái
            'status.required' => 'Trạng thái là bắt buộc.',
            'status.in' => 'Trạng thái chỉ được là 0 hoặc 1.',

            // 🔹 Ảnh
            'image.file' => 'Tệp tải lên phải là hình ảnh.',
            'image.mimes' => 'Ảnh phải có định dạng jpg, jpeg, png hoặc webp.',
            'image.max' => 'Kích thước ảnh tối đa là 2MB.',
        ]);

        // 🧩 Bước 2: Tạo mới Category
        $category = new Category();
        $category->name = $request->name;
        $category->slug = Str::of($request->name)->slug('-');
        $category->description = $request->description;
        $category->sort_order = $request->sort_order;
        $category->parent_id = $request->parent_id ?? 0;
        $category->status = $request->status;
        $category->created_at = now();
        $category->created_by = Auth::id() ?? 1;

        // 🧩 Bước 3: Upload ảnh (nếu có)
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = $category->slug . '.' . $extension;
            $file->move(public_path('assets/images/category'), $filename);
            $category->image = $filename;
        }

        $category->save();

        return response()->json([
            'status' => true,
            'message' => '✅ Thêm danh mục thành công!',
            'data' => $category
        ]);
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => "Không tìm thấy danh mục có id = $id",
                'data' => []
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => "Chi tiết danh mục $id",
            'data' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Danh mục không tồn tại'
            ], 404);
        }

        // 🧩 Validate dữ liệu đầu vào
        $request->validate([
            'name' => 'required|string|max:255|unique:category,name,' . $id,
            'description' => 'nullable|string|max:1000',
            'sort_order' => 'nullable|integer|min:0',
            'parent_id' => 'nullable|exists:category,id|not_in:' . $id, // tránh chọn chính nó làm cha
            'status' => 'required|in:0,1',
            'image' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
        ], [
            'name.required' => 'Tên danh mục không được để trống.',
            'name.string' => 'Tên danh mục phải là chuỗi ký tự.',
            'name.max' => 'Tên danh mục không được vượt quá 255 ký tự.',
            'name.unique' => 'Tên danh mục đã tồn tại trong hệ thống.',

            'sort_order.integer' => 'Thứ tự sắp xếp phải là số nguyên.',
            'sort_order.min' => 'Thứ tự sắp xếp không được nhỏ hơn 0.',

            'parent_id.exists' => 'Danh mục cha không hợp lệ.',
            'parent_id.not_in' => 'Danh mục cha không được là chính nó.',

            'status.required' => 'Trạng thái là bắt buộc.',
            'status.in' => 'Trạng thái chỉ được là 0 hoặc 1.',

            'image.file' => 'Tệp tải lên phải là hình ảnh.',
            'image.mimes' => 'Ảnh phải có định dạng jpg, jpeg, png hoặc webp.',
            'image.max' => 'Kích thước ảnh tối đa là 2MB.',
        ]);

        // 🧩 Cập nhật thông tin
        $category->name = $request->name;
        $category->slug = Str::of($request->name)->slug('-');
        $category->description = $request->description;
        $category->sort_order = $request->sort_order;
        $category->parent_id = $request->parent_id;
        $category->status = $request->status;
        $category->created_by = Auth::id() ?? 1;
        $category->created_at = now();

        // 🧩 Upload ảnh mới (nếu có)
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = $category->slug . '.' . $extension;
            $file->move(public_path('assets/images/category'), $filename);
            $category->image = $filename;
        }

        $category->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật danh mục thành công',
            'data' => $category
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */


    // lấy danh mục cha
    public function getParents()
    {
        $list = Category::where('parent_id', 0)
            ->orderBy('sort_order', 'asc')
            ->get();
        return response()->json([
            'status' => true,
            'message' => 'Danh sách danh mục cha',
            'data' => $list
        ]);
    }


    public function parentsWithChildren()
    {
        $categories = Category::with(['children' => function ($query) {
            $query->where('status', 1);
        }])
            ->where('parent_id', 0)
            ->where('status', 1)
            ->orderBy('sort_order', 'ASC')
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Danh mục cha và con',
            'data' => $categories,
        ]);
    }

    // xóa danh mục
    public function delete($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Danh mục không tồn tại'
            ], 404);
        }

        if ($category->products()->exists()) {
            return response()->json([
                'status' => false,
                'message' => 'Danh mục đang có sản phẩm, không thể xóa'
            ], 400);
        }

        $category->delete();

        return response()->json([
            'status' => true,
            'message' => 'Xóa danh mục thành công'
        ]);
    }

    // Xóa vĩnh viễn danh mục trong Trash
    public function destroy($id)
    {
        $category = Category::onlyTrashed()->find($id);

        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Danh mục không tồn tại trong Thùng rác'
            ], 404);
        }

        // Kiểm tra xem danh mục có sản phẩm (kể cả bị xóa mềm) không
        if (Product::withTrashed()->where('category_id', $category->id)->exists()) {
            return response()->json([
                'status' => false,
                'message' => 'Danh mục đang có sản phẩm, không thể xóa vĩnh viễn'
            ], 400);
        }

        // Nếu danh mục có hình ảnh (nếu bạn có trường thumbnail)
        $image_path = public_path('assets/images/category/' . $category->image);
        if (!empty($category->image) && File::exists($image_path)) {
            File::delete($image_path);
        }

        $category->forceDelete(); // Xóa vĩnh viễn
        return response()->json([
            'status' => true,
            'message' => 'Xóa danh mục vĩnh viễn thành công'
        ]);
    }

    // Khôi phục danh mục từ Trash
    public function restore($id)
    {
        $category = Category::onlyTrashed()->find($id);

        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Danh mục không tồn tại trong Thùng rác'
            ], 404);
        }

        $category->restore();
        return response()->json([
            'status' => true,
            'message' => 'Khôi phục danh mục thành công'
        ]);
    }


    public function trash()
    {
        $list = Category::onlyTrashed()
            ->orderBy('id', 'asc')
            ->paginate(6);

        return response()->json([
            'status' => true,
            'message' => 'Danh sách danh mục trong thùng rác',
            'categories' => $list
        ]);
    }
}
