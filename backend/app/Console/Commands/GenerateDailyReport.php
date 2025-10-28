<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use App\Models\Product;
use App\Models\Visit;
use App\Models\DailyReport;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class GenerateDailyReport extends Command
{
    protected $signature = 'report:daily';
    protected $description = 'Tạo báo cáo tổng hợp hằng ngày và lưu vào database';

    public function handle()
    {
        $this->info('Bắt đầu tạo báo cáo cho ngày hôm nay...');
        $today = Carbon::today();

        // ====== TÍNH TOÁN CÁC CHỈ SỐ ======

        // 1. Doanh thu (chỉ tính đơn hàng đã giao thành công, ví dụ status = 5)
        $totalRevenue = Order::where('status', 1)
            ->whereDate('created_at', $today)
            ->sum('total_amount');

        // 2. Tổng đơn hàng
        $totalOrders = Order::whereDate('created_at', $today)->count();

        // 3. Người dùng mới
        $newUsers = User::whereDate('created_at', $today)->count();

        // 4. Lượt truy cập (từ bảng visits)
        $totalVisits = Visit::whereDate('visited_at', $today)->count();


        // 5. Tỷ lệ chuyển đổi
        $conversionRate = $totalVisits > 0 ? round(($totalOrders / $totalVisits) * 100, 2) : 0;

        // 6. Top 5 sản phẩm bán chạy
        $topProducts = OrderDetail::select('product_id', DB::raw('SUM(qty) as quantity_sold'))
            ->whereHas('order', function ($query) use ($today) {
                $query->whereDate('created_at', $today);
            })
            ->groupBy('product_id')
            ->orderByDesc('quantity_sold')
            ->with('product:id,name')
            ->take(5)
            ->get()
            ->map(fn($item) => [
                'name' => $item->product->name ?? 'Sản phẩm không xác định',
                'quantity_sold' => (int) $item->quantity_sold
            ]);

        // 7. Sản phẩm sắp hết hàng
        $lowStockProducts = Product::where('qty', '<=', 20)->get(['id', 'name', 'qty'])->take(5);

        //        8. Tổng sản phẩm
        $totalProducts = Product::count();

        // 9 Tổng người dùng
        $totalUsers = User::count();


        // ====== LƯU BÁO CÁO VÀO DATABASE ======
        DailyReport::updateOrCreate(
            ['report_date' => $today->toDateString()], // Điều kiện để tìm
            [
                'total_orders' => $totalOrders,
                'total_revenue' => $totalRevenue,
                'new_users' => $newUsers,
                'visits' => $totalVisits,
                'conversion_rate' => $conversionRate,
                'top_products' => json_encode($topProducts),
                'low_stock_products' => json_encode($lowStockProducts),
                'total_products' => $totalProducts,
                'total_users' => $totalUsers,

            ]
        );

        $this->info('✅ Báo cáo hằng ngày đã được tạo và lưu vào database thành công!');
        return 0;
    }
}
