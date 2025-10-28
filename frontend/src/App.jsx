import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "./Redux/store";

import Userroute from "./routers/user.js";
import LayoutUser from "./components/LayoutUser.jsx";
import Adminroute from "./routers/admin.js";
import LayoutAdmin from "./components/LayoutAdmin.jsx";
import AdminPrivateRoute from "./components/AdminPrivateRoute.jsx";
import AdminLogin from "./pages/admin/AdminLogin"; // 👈 THÊM DÒNG NÀY

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* USER */}
          <Route path="/" element={<LayoutUser />}>
            {Userroute.map((router, index) => {
              const Page = router.component;
              return <Route key={index} path={router.path} element={<Page />} />;
            })}
          </Route>

          {/* ADMIN LOGIN (Public) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ADMIN (Protected) */}
          <Route
            path="/admin"
            element={
              <AdminPrivateRoute>
                <LayoutAdmin />
              </AdminPrivateRoute>
            }
          >
            {Adminroute.map((router, index) => {
              const Page = router.component;
              return <Route key={index} path={router.path} element={<Page />} />;
            })}
          </Route>
        </Routes>

        {/* ✅ ToastContainer đặt sau BrowserRouter để hoạt động toàn cục */}
        <ToastContainer
          position="top-right"
          autoClose={1500} // thời gian toast hiển thị 0.8s
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;


