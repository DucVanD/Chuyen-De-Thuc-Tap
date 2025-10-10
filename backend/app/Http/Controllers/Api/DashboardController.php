<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DailyReport;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function summary()
    {
        $today = Carbon::today()->toDateString();
        $yesterday = Carbon::yesterday()->toDateString();

        // ====== Lấy báo cáo hôm nay ======
        $todayReport = DailyReport::where('report_date', $today)->first();
        $yesterdayReport = DailyReport::where('report_date', $yesterday)->first();

        // ====== Nếu chưa có báo cáo hôm nay, trả về mặc định ======
        $summary = [
            'total_revenue' => '0₫',
            'total_orders' => 0,
            'total_users' => 0,
            'total_products' => 0,
            'LowStockList' => [],
            'new_users' => 0,
            'average_order_value' => '0₫',
        ];

        $analytics = [
            'visits' => 0,
            'conversion_rate' => '0%',
        ];

        $topProducts = [];
        $comparison = [
            'revenue_vs_yesterday' => '+0%',
            'orders_vs_yesterday' => '+0%',
        ];

        if ($todayReport) {
            $summary = [
                'total_revenue' => number_format($todayReport->total_revenue, 0, ',', '.') . '₫',
                'total_orders' => $todayReport->total_orders,
                'total_users' => $todayReport->total_users,
                'total_products' => $todayReport->total_products,
                'LowStockList' => json_decode($todayReport->low_stock_products, true) ?? [],
                'new_users' => $todayReport->new_users,
                'average_order_value' => $todayReport->total_orders > 0
                    ? number_format(round($todayReport->total_revenue / $todayReport->total_orders, 0), 0, ',', '.') . '₫'
                    : '0₫',
            ];

            $analytics = [
                'visits' => $todayReport->visits,
                'conversion_rate' => $todayReport->conversion_rate . '%',
            ];

            $topProducts = json_decode($todayReport->top_products, true) ?? [];
        }

        if ($todayReport && $yesterdayReport) {
            $revenueCompare = $yesterdayReport->total_revenue > 0
                ? round((($todayReport->total_revenue - $yesterdayReport->total_revenue) / $yesterdayReport->total_revenue) * 100, 1)
                : 0;

            $ordersCompare = $yesterdayReport->total_orders > 0
                ? round((($todayReport->total_orders - $yesterdayReport->total_orders) / $yesterdayReport->total_orders) * 100, 1)
                : 0;

            $comparison = [
                'revenue_vs_yesterday' => ($revenueCompare >= 0 ? '+' : '') . $revenueCompare . '%',
                'orders_vs_yesterday' => ($ordersCompare >= 0 ? '+' : '') . $ordersCompare . '%',
            ];
        }

        return response()->json([
            'status' => true,
            'data' => [
                'period' => 'Hôm nay (' . now()->format('d/m/Y') . ')',
                'summary' => $summary,
                'analytics' => $analytics,
                'top_products' => $topProducts,
                'comparison' => $comparison,
            ]
        ]);
    }


    public function getReportByDate($date)
    {
        $date = \Carbon\Carbon::parse($date)->toDateString();
        $previousDate = \Carbon\Carbon::parse($date)->subDay()->toDateString();

        $report = DailyReport::where('report_date', $date)->first();
        $previousReport = DailyReport::where('report_date', $previousDate)->first();

        // Mặc định nếu chưa có báo cáo
        $summary = [
            'total_revenue' => '0₫',
            'total_orders' => 0,
            'total_users' => 0,
            'total_products' => 0,
            'LowStockList' => [],
            'new_users' => 0,
            'average_order_value' => '0₫',
        ];

        $analytics = [
            'visits' => 0,
            'conversion_rate' => '0%',
        ];

        $topProducts = [];
        $comparison = [
            'revenue_vs_previous' => '+0%',
            'orders_vs_previous' => '+0%',
        ];

        if ($report) {
            $summary = [
                'total_revenue' => number_format($report->total_revenue, 0, ',', '.') . '₫',
                'total_orders' => $report->total_orders,
                'total_users' => $report->total_users,
                'total_products' => $report->total_products,
                'LowStockList' => json_decode($report->low_stock_products, true) ?? [],
                'new_users' => $report->new_users,
                'average_order_value' => $report->total_orders > 0
                    ? number_format(round($report->total_revenue / $report->total_orders, 0), 0, ',', '.') . '₫'
                    : '0₫',
            ];

            $analytics = [
                'visits' => $report->visits,
                'conversion_rate' => $report->conversion_rate . '%',
            ];

            $topProducts = json_decode($report->top_products, true) ?? [];
        }

        if ($report && $previousReport) {
            $revenueCompare = $previousReport->total_revenue > 0
                ? round((($report->total_revenue - $previousReport->total_revenue) / $previousReport->total_revenue) * 100, 1)
                : 0;

            $ordersCompare = $previousReport->total_orders > 0
                ? round((($report->total_orders - $previousReport->total_orders) / $previousReport->total_orders) * 100, 1)
                : 0;

            $comparison = [
                'revenue_vs_previous' => ($revenueCompare >= 0 ? '+' : '') . $revenueCompare . '%',
                'orders_vs_previous' => ($ordersCompare >= 0 ? '+' : '') . $ordersCompare . '%',
            ];
        }

        return response()->json([
            'status' => true,
            'data' => [
                'period' => 'Báo cáo ngày ' . \Carbon\Carbon::parse($date)->format('d/m/Y'),
                'summary' => $summary,
                'analytics' => $analytics,
                'top_products' => $topProducts,
                'comparison' => $comparison,
            ]
        ]);
    }
}
