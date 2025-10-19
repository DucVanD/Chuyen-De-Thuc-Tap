<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{DB, Auth, Log, Validator};
use App\Models\Product;

class StockController extends Controller
{


    public function index(Request $request)
    {
        // 🔹 Lấy các tham số lọc từ request
        $type = $request->input('type');           // import/export/adjustment/return
        $productName = $request->input('product_name');
        $date = $request->input('date');           // YYYY-MM-DD
        $userName = $request->input('user_name');  // nếu có user thao tác
        $perPage = $request->input('limit', 9);    // mặc định 6 bản ghi/trang

        // 🔹 Query cơ bản
        $query = StockMovement::query()->orderBy('id', 'desc');

        // 🔹 Áp dụng bộ lọc
        if ($type) {
            $query->where('type', $type);
        }

        if ($productName) {
            $query->where('product_name', 'like', "%{$productName}%");
        }

        if ($date) {
            $query->whereDate('created_at', $date);
        }

        if ($userName) {
            // Nếu bạn có quan hệ `user()` trong model StockMovement
            $query->whereHas('user', function ($q) use ($userName) {
                $q->where('name', 'like', "%{$userName}%");
            });
        }

        // 🔹 Phân trang
        $list = $query->paginate($perPage);

        return response()->json([
            'status' => true,
            'message' => 'Danh sách lịch sử tồn kho (đã lọc)',
            'data' => $list
        ]);
    }


    public function import(Request $request)
    {
        return $this->handleMovement($request, 'import');
    }

    public function export(Request $request)
    {
        return $this->handleMovement($request, 'export');
    }


    public function return(Request $request)
    {
        return $this->handleMovement($request, 'return');
    }



    public function adjust(Request $request)
    {
        // Expect payload: product_id, quantity (positive integer), note, adjust_sign (optional: "plus"/"minus")
        $request->validate([
            'product_id' => 'required|exists:product,id',
            'quantity' => 'required|integer|min:0',
            'adjust_sign' => 'nullable|in:plus,minus',
            'note' => 'nullable|string',
        ]);

        // If adjust_sign provided, convert to type and quantity_change
        $sign = $request->input('adjust_sign');
        $quantity = (int) $request->input('quantity');

        // If sign not provided, we will attempt to infer by comparing new_qty? But here we assume sign present
        if (!$sign) {
            // fallback: if quantity === 0 -> no-op
            return response()->json(['error' => 'Thiếu thông tin điều chỉnh (adjust_sign).'], 400);
        }

        $type = 'adjustment';
        $change = ($sign === 'plus') ? $quantity : -$quantity;

        // Build a pseudo-request to reuse handleMovement
        $fake = new Request([
            'product_id' => $request->product_id,
            'quantity_change' => $change,
            'note' => $request->note ?? null,
        ]);

        return $this->handleMovement($fake, $type, true);
    }

    /**
     * handleMovement: xử lý chung cho import/export/adjustment
     * @param Request $request - expects product_id and either 'quantity' (for import/export) or 'quantity_change' (for adjust)
     * @param string $type - import/export/adjustment
     * @param bool $isAdjustAlreadySigned - if true, request has 'quantity_change' (signed)
     */
    private function handleMovement(Request $request, string $type, $isAdjustAlreadySigned = false)
    {
        $rules = [
            'product_id' => 'required|exists:product,id',
        ];
        if ($isAdjustAlreadySigned) {
            $rules['quantity_change'] = 'required|integer';
        } else {
            $rules['quantity'] = 'required|integer|min:1';
        }

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        DB::beginTransaction();
        try {
            $product = Product::lockForUpdate()->findOrFail($request->product_id);

            // Determine signed change
            if ($isAdjustAlreadySigned) {
                $change = (int) $request->quantity_change;
            } else {
                $qty = (int) $request->quantity;
                $change = ($type === 'export') ? -$qty : $qty; // import and adjustment routes without sign treat as plus
            }

            $newQty = $product->qty + $change;
            if ($newQty < 0) {
                DB::rollBack();
                return response()->json(['error' => 'Số lượng tồn không đủ để xuất kho.'], 400);
            }

            // Update product qty
            $product->qty = $newQty;
            $product->save();

            // Create stock movement
            $movement = StockMovement::create([
                'product_id' => $product->id,
                'product_name' => $product->name,
                'type' => $type,
                'quantity_change' => $change,
                'qty_after' => $newQty,
                'note' => $request->note ?? null,
                'user_id' => Auth::id() ?? null,
            ]);

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Cập nhật tồn kho thành công',
                'movement' => $movement,
                'product' => $product,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Stock movement error: ' . $e->getMessage());
            return response()->json(['error' => 'Lỗi server khi cập nhật tồn kho'], 500);
        }
    }
}
