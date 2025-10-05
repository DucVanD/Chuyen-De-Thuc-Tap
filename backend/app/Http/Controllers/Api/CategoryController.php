<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

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
        $list = Category::orderBy('id', 'desc')->get();
        return response()->json([
            'status' => true,
            'message' => 'Danh sách tất cả danh mục',
            'data' => $list
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $category = new Category();
        $category->name = $request->name;

        //

        $category->slug = Str::of($request->name)->slug('-');
        //

        $category->sort_order = $request->sort_order;
        $category->parent_id = $request->parent_id;
        // Upload file


        $category->description = $request->description;


        $category->status = $request->status;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = $category->slug . '.' . $extension;
            $file->move(public_path('assets/images/category'), $filename);
            $category->image = $filename;
        }
        $category->created_at = now();
        $category->created_by = Auth::id() ?? 1;



        $category->save();
        // echo ($category);
        return response()->json([
            'status' => true,
            'message' => 'Thêm danh mục thành công',
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
                'message' => "Không tìm thấy sản phẩm có id = $id",
                'data' => []
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => "Chi tiết sản phẩm $id",
            'data' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = Category::find($id);
        if ($category == null) {
            return redirect()->route('category.index')->with('error', 'Danh mục không tồn tại');
        }
        $category->name = $request->name;

        $category->slug = Str::of($request->name)->slug('-');
        //
        $category->sort_order = $request->sort_order;
        $category->parent_id = $request->parent_id;
        // Upload file
        $category->description = $request->description;


        $category->status = $request->status;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = $category->slug . '.' . $extension;
            $file->move(public_path('assets/images/category'), $filename);
            $category->image = $filename;
        }
        $category->created_at = now();
        $category->created_by = Auth::id() ?? 1;



        $category->save();
        // echo ($category);
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật danh mục thành công',
            'data' => $category
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

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
}
