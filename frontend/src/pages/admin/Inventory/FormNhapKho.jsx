import { useEffect, useState } from "react";
import apiStock from "../../../api/apiStock";
import apiProduct from "../../../api/apiProduct";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormNhapKho = () => {
  const [form, setForm] = useState({
    product_id: "",
    quantity: "",
    note: "Bổ sung tồn kho cho sản phẩm sắp hết",
  });
  const [loading, setLoading] = useState(false);
  const [lowStock, setLowStock] = useState([]); // ✅ danh sách hàng sắp hết
  const [showForm, setShowForm] = useState(false); // ✅ ẩn/hiện form

  // 🔹 Lấy danh sách sản phẩm sắp hết
  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const res = await apiProduct.lowstock();
        if (res.status && Array.isArray(res.data)) {
          setLowStock(res.data);
        }
      } catch (err) {
        console.error("Lỗi khi tải danh sách hàng sắp hết:", err);
      }
    };
    fetchLowStock();
  }, []);

  // 🧩 Xử lý thay đổi input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🧩 Gửi form nhập kho
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.product_id || !form.quantity) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      setLoading(true);
      const res = await apiStock.import(form);
      if (res.data.status) {
        toast.success("✅ Nhập kho thành công!");

        // 🧩 Reset form
        setForm({ product_id: "", quantity: "", note: "" });

        // 🧭 Quay lại danh sách sau khi nhập thành công
        setShowForm(false);

        // 🔄 Gọi lại API để cập nhật danh sách hàng sắp hết
        const reload = await apiProduct.lowstock();
        if (reload.status && Array.isArray(reload.data)) {
          setLowStock(reload.data);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Lỗi khi nhập kho!");
    } finally {
      setLoading(false);
    }
  };


  // 🧭 Nút quay lại danh sách sắp hết
  if (!showForm) {
    return (
      <div className="p-6 bg-white shadow rounded-xl border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-red-600">
            ⚠️ Danh sách sản phẩm sắp hết hàng
          </h2>

          {/* 🔙 Nút quay lại danh sách tồn kho */}
          <button
            onClick={() => window.location.href = "/admin/inventory"} // hoặc navigate("/admin/inventory") nếu dùng react-router
            className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
          >
            ⬅ Quay về danh sách kho
          </button>
        </div>


        {lowStock.length > 0 ? (
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-3 text-left">ID</th>
                <th className="py-2 px-3 text-left">Tên sản phẩm</th>
                <th className="py-2 px-3 text-center">Tồn kho</th> {/* ✅ thêm cột này */}
                <th className="py-2 px-3 text-center">Nhập thêm</th>
              </tr>
            </thead>
            <tbody>
              {lowStock.map((p) => (
                <tr
                  key={p.id}
                  className="border-t hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="py-2 px-3">{p.id}</td>
                  <td className="py-2 px-3 text-green-700 font-medium">{p.name}</td>

                  {/* ✅ hiển thị số lượng tồn */}
                  <td className="py-2 px-3 text-center text-red-600 font-semibold">
                    {p.qty}
                  </td>

                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => {
                        setShowForm(true);
                        setForm({ ...form, product_id: p.id });
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded transition"
                    >
                      ➕ Nhập hàng
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">Hiện không có sản phẩm nào sắp hết hàng.</p>
        )}

      </div>
    );
  }

  // ✅ Giao diện form nhập kho
  return (
    <div className="p-6 bg-white shadow rounded-xl border border-gray-100">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        ➕ Nhập hàng vào kho
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="number"
          name="product_id"
          placeholder="ID sản phẩm"
          value={form.product_id}
          onChange={handleChange}
          className="border rounded-lg p-2"
          readOnly
        />
        <input
          type="number"
          name="quantity"
          placeholder="Số lượng nhập"
          value={form.quantity}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />
        <textarea
          name="note"
          placeholder="Ghi chú (nếu có)"
          value={form.note}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Nhập kho"}
          </button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
          >
            ⬅ Quay lại danh sách
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormNhapKho;
