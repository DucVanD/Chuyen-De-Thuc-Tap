import Home from "../pages/user/home.jsx";
import Detail from "../pages/user/Detail.jsx";
import Products from "../pages/user/products.jsx";

const Userroute = [
  { path: "", component: Home },
  { path: "/products", component: Products },
  { path: "/detail", component: Detail },
];

export default Userroute;
