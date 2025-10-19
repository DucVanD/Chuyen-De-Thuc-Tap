import { useState } from "react";
import apiStock from "../../../api/apiStock";
import { toast } from "react-toastify";

const FormDieuChinh = () => {
  const [form, setForm] = useState({
    product_id: "",
    quantity: "",
    adjust_sign: "plus",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await apiStock.adjust(form);
      if (res.data.status) {
        toast.success("✅ Điều chỉnh tồn kho thành công!");
        setForm({ product_id: "", quantity: "", adjust_sign: "plus", note: "" });
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Lỗi khi điều chỉnh!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl border border-gray-100">
      <h2 className="text-xl font-bold text-yellow-700 mb-4">⚙️ Điều chỉnh tồn kho</h2>
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
          placeholder="Số lượng điều chỉnh"
          value={form.quantity}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />
        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="adjust_sign"
              value="plus"
              checked={form.adjust_sign === "plus"}
              onChange={handleChange}
            />
            Tăng
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="adjust_sign"
              value="minus"
              checked={form.adjust_sign === "minus"}
              onChange={handleChange}
            />
            Giảm
          </label>
        </div>
        <textarea
          name="note"
          placeholder="Ghi chú"
          value={form.note}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Điều chỉnh"}
        </button>
      </form>
    </div>
  );
};

export default FormDieuChinh;
