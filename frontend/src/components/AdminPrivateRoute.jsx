import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiAdmin from "../api/apiAdmin";

export default function AdminPrivateRoute({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLoading(false);
      return;
    }

    apiAdmin
      .getMe()
      .then((res) => {
        if (res.data.status && res.data.user.roles === "admin") {
          setIsAuth(true);
        } else {
          localStorage.removeItem("adminToken");
        }
      })
      .catch(() => localStorage.removeItem("adminToken"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center p-6">Đang kiểm tra đăng nhập...</div>;

  return isAuth ? children : <Navigate to="/admin/login" replace />;
}
