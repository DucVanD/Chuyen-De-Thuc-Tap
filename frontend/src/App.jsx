import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Userroute from "./routers/user.js";
import LayoutUser from "./components/LayoutUser.jsx";
import Adminroute from "./routers/admin.js";
import LayoutAdmin from "./components/LayoutAdmin.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutUser />}>
          {Userroute.map((router, index) => {
            const Page = router.component;
            return <Route key={index} path={router.path} element={<Page />} />;
          })}
        </Route>

        <Route path="/admin" element={<LayoutAdmin />}>
          {Adminroute.map((router, index) => {
            const Page = router.component;
            return <Route key={index} path={router.path} element={<Page />} />;
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
