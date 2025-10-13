<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $list = Post::orderBy('id', 'asc')->paginate(6);
        return response()->json([
            'status' => true,
            'message' => 'Danh sách bài viết',
            'data' => $list
        ]);
    }


    //
    public function getAll()
    {
        $list = Post::orderBy('id', 'asc')->paginate(5);
        return response()->json([
            'status' => true,
            'message' => 'Danh sách bài viết',
            'data' => $list
        ]);
    }




    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $post = new Post();
        $post->title = $request->title;
        $post->slug = Str::of($request->title)->slug('-');
        $post->detail = $request->detail;
        $post->description = $request->description;
        $post->type = $request->type;

        // Xử lý upload ảnh
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $extension = $file->getClientOriginalExtension();
            $filename = $post->slug . '.' . $extension;
            $file->move(public_path('assets/images/post'), $filename);
            $post->thumbnail =  $filename; // Lưu đường dẫn chính xác
        }
        // Lưu vào cơ sở dữ liệu
        $post->created_at = now(); // Lưu thời gian hiện tại
        $post->created_by = Auth::id() ?? 1; // Lưu ID người dùng hiện tại
        $post->status = $request->status;
        $post->topic_id = $request->topic_id;
        $post->save();
        return response()->json([
            'status' => true,
            'message' => 'Thêm bài viết thành công',
            'data' => $post
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json([
                'status' => false,
                'message' => "Không tìm thấy  bài viết có id = $id",
                'data' => []
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => "Chi tiết bài viết $id",
            'data' => $post
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $post = Post::find($id);
        if ($post == null) {
            return redirect()->route('post.index')->with('error', 'Bài viết không tồn tại');
        }

        $post->title = $request->title;
        $post->slug = Str::of($request->title)->slug('-');
        $post->detail = $request->detail;
        $post->description = $request->description;
        $post->type = $request->type;

        // Xử lý upload ảnh
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $extension = $file->getClientOriginalExtension();
            $filename = $post->slug . '.' . $extension;
            $file->move(public_path('assets/images/post'), $filename);
            $post->thumbnail =  $filename; // Lưu đường dẫn chính xác
        }
        // Lưu vào cơ sở dữ liệu
        $post->created_at = now(); // Lưu thời gian hiện tại
        $post->created_by = Auth::id() ?? 1; // Lưu ID người dùng hiện tại
        $post->status = $request->status;
        $post->topic_id = $request->topic_id;
        $post->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
