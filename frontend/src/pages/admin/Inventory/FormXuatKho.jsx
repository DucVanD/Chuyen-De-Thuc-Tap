import { useState } from "react";
import apiStock from "../../../api/apiStock";
import { toast } from "react-toastify";

const FormXuatKho = () => {
  const [form, setForm] = useState({
    product_id: "",
    quantity: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.product_id || !form.quantity) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      setLoading(true);
      const res = await apiStock.export(form);
      if (res.data.status) {
        toast.success("✅ Xuất kho thành công!");
        setForm({ product_id: "", quantity: "", note: "" });
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Lỗi khi xuất kho!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl border border-gray-100">
      <h2 className="text-xl font-bold text-red-700 mb-4">➖ Xuất hàng khỏi kho</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="number"
          name="product_id"
          placeholder="ID sản phẩm"
          value={form.product_id}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Số lượng xuất"
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
        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Xuất kho"}
        </button>
      </form>
    </div>
  );
};

export default FormXuatKho;
