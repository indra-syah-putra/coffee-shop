<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->get('start_date', Carbon::now()->startOfMonth()->format('Y-m-d'));
        $endDate = $request->get('end_date', Carbon::now()->format('Y-m-d'));

        $orders = Order::with(['items', 'user'])
            ->whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59'])
            ->orderBy('created_at', 'desc')
            ->get();

        $totalRevenue = $orders->sum('total');
        $totalOrders = $orders->count();
        $totalDiscount = $orders->sum('discount');

        $itemSales = OrderItem::whereHas('order', function ($q) use ($startDate, $endDate) {
            $q->whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59']);
        })->get()->groupBy('name')->map(function ($items) {
            return [
                'name' => $items->first()->name,
                'quantity' => $items->sum('quantity'),
                'revenue' => $items->sum(function ($i) { return $i->price * $i->quantity; }),
            ];
        })->sortByDesc('quantity')->values();

        return Inertia::render('Admin/Reports', [
            'startDate' => $startDate,
            'endDate' => $endDate,
            'stats' => [
                'totalRevenue' => $totalRevenue,
                'totalOrders' => $totalOrders,
                'totalDiscount' => $totalDiscount,
            ],
            'itemSales' => $itemSales,
        ]);
    }

    public function exportCsv(Request $request)
    {
        $startDate = $request->get('start_date', Carbon::now()->startOfMonth()->format('Y-m-d'));
        $endDate = $request->get('end_date', Carbon::now()->format('Y-m-d'));

        $orders = Order::with(['items', 'user'])
            ->whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59'])
            ->orderBy('created_at', 'desc')
            ->get();

        $filename = "laporan_penjualan_{$startDate}_to_{$endDate}.csv";

        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $filename . '"');

        $output = fopen('php://output', 'w');
        fprintf($output, chr(0xEF) . chr(0xBB) . chr(0xBF));

        fputcsv($output, ['No', 'Order ID', 'Pelanggan', 'Tanggal', 'Item', 'Jumlah', 'Harga', 'Subtotal', 'Diskon', 'Total', 'Status']);

        $no = 1;
        foreach ($orders as $order) {
            foreach ($order->items as $item) {
                fputcsv($output, [
                    $no++,
                    $order->id,
                    $order->user->name ?? 'Guest',
                    $order->created_at->format('d/m/Y H:i'),
                    $item->name,
                    $item->quantity,
                    $item->price,
                    $item->price * $item->quantity,
                    $order->discount > 0 && $order->items->count() === 1 ? $order->discount : 0,
                    $order->total,
                    $order->status,
                ]);
            }
        }

        fclose($output);
        exit;
    }
}
