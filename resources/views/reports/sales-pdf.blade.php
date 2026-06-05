<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Penjualan</title>
    <style>
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 10px;
            color: #1E110E;
            margin: 20px;
        }
        h1 {
            font-size: 18px;
            text-align: center;
            margin-bottom: 5px;
            color: #2B1814;
        }
        p.subtitle {
            text-align: center;
            font-size: 11px;
            color: #666;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        th {
            background: #2B1814;
            color: #FFFDF9;
            padding: 6px 8px;
            text-align: left;
            font-size: 8px;
            text-transform: uppercase;
        }
        td {
            padding: 5px 8px;
            border-bottom: 1px solid #E1D0BA;
        }
        tr:nth-child(even) td {
            background: #F9F5F0;
        }
        .total-row td {
            font-weight: bold;
            border-top: 2px solid #2B1814;
        }
        .stats {
            margin-bottom: 20px;
        }
        .stats table td {
            border: 1px solid #E1D0BA;
            padding: 8px;
            font-size: 11px;
        }
        .stats table td:first-child {
            font-weight: bold;
            width: 60%;
        }
        .stats table td:last-child {
            text-align: right;
        }
        .footer {
            text-align: center;
            font-size: 8px;
            color: #999;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <h1>Laporan Penjualan</h1>
    <p class="subtitle">Periode: {{ $startDate }} s/d {{ $endDate }}</p>

    <div class="stats">
        <table>
            <tr>
                <td>Total Pendapatan</td>
                <td>Rp {{ number_format($stats['totalRevenue'], 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td>Total Pesanan</td>
                <td>{{ $stats['totalOrders'] }}</td>
            </tr>
            <tr>
                <td>Total Diskon</td>
                <td>Rp {{ number_format($stats['totalDiscount'], 0, ',', '.') }}</td>
            </tr>
        </table>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Menu</th>
                <th style="text-align:right">Terjual</th>
                <th style="text-align:right">Pendapatan</th>
            </tr>
        </thead>
        <tbody>
            @php $no = 1; @endphp
            @foreach($itemSales as $item)
                <tr>
                    <td>{{ $no++ }}</td>
                    <td>{{ $item['name'] }}</td>
                    <td style="text-align:right">{{ $item['quantity'] }}</td>
                    <td style="text-align:right">Rp {{ number_format($item['revenue'], 0, ',', '.') }}</td>
                </tr>
            @endforeach
            @if(count($itemSales) === 0)
                <tr>
                    <td colspan="4" style="text-align:center;color:#999;">Belum ada data penjualan.</td>
                </tr>
            @endif
        </tbody>
    </table>

    <div class="footer">
        Laporan ini digenerate otomatis pada {{ now()->format('d/m/Y H:i') }}
    </div>
</body>
</html>