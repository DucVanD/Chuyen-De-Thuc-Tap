<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Topic;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class TopicController extends Controller
{
    // Danh sách topic (phân trang)
    public function index()
    {
        $list = Topic::orderBy('id', 'asc')->paginate(6);
        return response()->json([
            'status' => true,
            'message' => 'Danh sách chủ đề',
            'data' => $list
        ]);
    }

    // Lấy tất cả topic (không phân trang)
    public function getAll()
    {
        $list = Topic::orderBy('id', 'asc')->get();
        return response()->json([
            'status' => true,
            'message' => 'Danh sách tất cả chủ đề',
            'data' => $list
        ]);
    }


    // Thêm topic
    public function store(Request $request)
    {
        $topic = new Topic();
        $topic->name = $request->name;

        // Tự động tạo slug từ name
        $topic->slug = Str::slug($request->name, '-');
        $topic->description = $request->description ?? '';
        $topic->status = $request->status ?? 1; // Giá trị status từ form là chuỗi, Laravel sẽ tự ép kiểu
         $topic->created_at = now();
        $topic->created_by = Auth::id() ?? 1;
        $topic->save();

        return response()->json([
            'status' => true,
            'message' => 'Thêm chủ đề thành công',
            'data' => $topic
        ]);
    }

    // Lấy 1 topic
   public function show(string $id)
    {
        $topic = Topic::find($id);
        if (!$topic) {
            return response()->json([
                'status' => false,
                'message' => "Không tìm thấy chủ đề có id = $id",
                'data' => []
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => "Chi tiết chủ đề $id",
            'data' => $topic
        ]);
    }

    // Cập nhật topic
    public function update(Request $request, $id)
    {
        $topic = Topic::find($id);
        if (!$topic) {
            return response()->json([
                'status' => false,
                'message' => 'Chủ đề không tồn tại'
            ], 404);
        }

        $topic->name = $request->name;
        $topic->slug = $request->slug;
        $topic->description = $request->description ?? '';
        $topic->status = $request->status ?? 1;
        $topic->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật chủ đề thành công',
            'data' => $topic
        ]);
    }

    // Xóa mềm topic
    public function delete($id)
    {
        $topic = Topic::find($id);
        if (!$topic) {
            return response()->json([
                'status' => false,
                'message' => 'Chủ đề không tồn tại'
            ], 404);
        }

        $topic->delete();
        return response()->json([
            'status' => true,
            'message' => 'Đã chuyển vào Trash'
        ]);
    }

    // Danh sách Trash (đã xóa mềm)
    public function trash()
    {
        $list = Topic::onlyTrashed()->orderBy('id', 'asc')->paginate(6);
        return response()->json([
            'status' => true,
            'message' => 'Danh sách chủ đề trong thùng rác',
            'data' => $list
        ]);
    }

    // Khôi phục
    public function restore($id)
    {
        $topic = Topic::onlyTrashed()->find($id);
        if (!$topic) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy chủ đề trong Trash'
            ], 404);
        }

        $topic->restore();
        return response()->json([
            'status' => true,
            'message' => 'Khôi phục chủ đề thành công'
        ]);
    }

    // Xóa vĩnh viễn
    public function destroy($id)
    {
        $topic = Topic::onlyTrashed()->find($id);
        if (!$topic) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy chủ đề trong Trash'
            ], 404);
        }

        $topic->forceDelete();
        return response()->json([
            'status' => true,
            'message' => 'Xóa chủ đề vĩnh viễn thành công'
        ]);
    }
}
