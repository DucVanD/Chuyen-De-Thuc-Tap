import { useState } from "react";
import apiStock from "../../../api/apiStock";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormNhapKho = () => {
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
      const res = await apiStock.import(form);
      if (res.data.status) {
        toast.success("✅ Nhập kho thành công!");
        setForm({ product_id: "", quantity: "", note: "" });
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Lỗi khi nhập kho!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl border border-gray-100">
      <h2 className="text-xl font-bold text-green-700 mb-4">➕ Nhập hàng vào kho</h2>
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
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Nhập kho"}
        </button>
      </form>
    </div>
  );
};

export default FormNhapKho;
