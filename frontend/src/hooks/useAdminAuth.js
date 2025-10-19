import { useState, useEffect } from "react";
import apiAdmin from "../api/apiAdmin";

export default function useAdminAuth() {
  const [admin, setAdmin] = useState(null);
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
        if (res.status && res.user.roles === "admin") {
          setAdmin(res.user);
        } else {
          localStorage.removeItem("adminToken");
        }
      })
      .catch(() => localStorage.removeItem("adminToken"))
      .finally(() => setLoading(false));
  }, []);

  return { admin, loading };
}
