<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Hóa đơn bán hàng #{{ $order->id }}</title>
  <style>
    body { font-family: DejaVu Sans, sans-serif; font-size: 13px; color: #333; }
    .header { text-align: center; margin-bottom: 20px; }
    .header img { width: 80px; }
    .section { margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
    th { background-color: #f3f3f3; }
    .right { text-align: right; }
    .total { margin-top: 20px; font-weight: bold; text-align: right; }
    .sign-area { margin-top: 50px; width: 100%; }
    .sign-area td { text-align: center; vertical-align: top; }
  </style>
</head>
<body>

  {{-- ==== 1. THÔNG TIN NGƯỜI BÁN ==== --}}
  <div class="header">
    {{-- <img src="{{ public_path('logo.png') }}" alt="Logo"> --}}
    <h2>Siêu thị Mini BBEAN FARM!</h2>
    <p>Số 123, Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
    <p>📞 09xx.xxx.xxx — ✉️ support@sieuthimini.vn</p>
    <p>Mã số thuế: 0312345678</p>
  </div>

  {{-- ==== 2. THÔNG TIN HÓA ĐƠN ==== --}}
  <div class="section">
    <h3 style="text-align:center; margin-bottom:10px;">HÓA ĐƠN BÁN HÀNG</h3>
    <p><strong>Mã hóa đơn:</strong> INV-{{ str_pad($order->id, 5, '0', STR_PAD_LEFT) }}</p>
    <p><strong>Mã đơn hàng:</strong> #{{ $order->id }}</p>
    <p><strong>Ngày đặt hàng:</strong> {{ $order->created_at->format('d/m/Y H:i') }}</p>
    <p><strong>Ngày xuất hóa đơn:</strong> {{ now()->format('d/m/Y H:i') }}</p>
  </div>

  {{-- ==== 3. THÔNG TIN NGƯỜI MUA ==== --}}
  <div class="section">
    <h4>Thông tin khách hàng</h4>
    <p><strong>Tên khách hàng:</strong> {{ $order->name }}</p>
    <p><strong>Địa chỉ nhận hàng:</strong> {{ $order->address }}, {{ $order->ward }}, {{ $order->district }}, {{ $order->province }}</p>
    <p><strong>Điện thoại:</strong> {{ $order->phone }}</p>
    <p><strong>Email:</strong> {{ $order->email }}</p>
    <p><strong>Phương thức thanh toán:</strong> {{ strtoupper($order->payment) }}</p>
  </div>

  {{-- ==== 4. BẢNG CHI TIẾT SẢN PHẨM ==== --}}
  <table>
    <thead>
      <tr>
        <th>STT</th>
        <th>Tên sản phẩm / Dịch vụ</th>
        <th>Mã SP (SKU)</th>
        <th>Số lượng</th>
        <th>Đơn giá</th>
        <th>Thành tiền</th>
      </tr>
    </thead>
    <tbody>
      @foreach($order->orderDetails as $index => $detail)
      <tr>
        <td>{{ $index + 1 }}</td>
        <td>{{ $detail->product->name ?? 'Sản phẩm đã xóa' }}</td>
        <td>{{ $detail->product->sku ?? '-' }}</td>
        <td>{{ $detail->qty }}</td>
        <td class="right">{{ number_format($detail->price_buy, 0, ',', '.') }}₫</td>
        <td class="right">{{ number_format($detail->amount, 0, ',', '.') }}₫</td>
      </tr>
      @endforeach
    </tbody>
  </table>

  {{-- ==== 5. TỔNG KẾT THANH TOÁN ==== --}}
  <div class="total">
    <p>Tạm tính: {{ number_format($order->subtotal ?? $order->total_amount, 0, ',', '.') }}₫</p>
    @if(!empty($order->discount))
      <p>Giảm giá: -{{ number_format($order->discount, 0, ',', '.') }}₫</p>
    @endif
    @if(!empty($order->shipping_fee))
      <p>Phí vận chuyển: {{ number_format($order->shipping_fee, 0, ',', '.') }}₫</p>
    @endif
    <p><strong>Tổng cộng: {{ number_format($order->total_amount, 0, ',', '.') }}₫</strong></p>
    {{-- <p><em>Bằng chữ: {{ \App\Helpers\NumberHelper::convertToWords($order->total_amount) }} đồng.</em></p> --}}
    <p><strong>Trạng thái thanh toán:</strong> {{ $order->status == 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán' }}</p>
  </div>

  {{-- ==== 6. CHỮ KÝ ==== --}}
  <table class="sign-area">
    <tr>
      <td><strong>Người mua hàng</strong><br><br><br><br>(Ký, ghi rõ họ tên)</td>
      <td><strong>Người bán hàng</strong><br><br><br><br>(Ký, ghi rõ họ tên)</td>
    </tr>
  </table>

</body>
</html>
