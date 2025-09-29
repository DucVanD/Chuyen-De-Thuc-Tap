import Home from "../pages/user/home.jsx";
import ProductDetail from "../pages/user/Detail.jsx";
import Products from "../pages/user/products.jsx";
import Posts from "../pages/user/post.jsx";
import Registered from "../pages/user/Registered.jsx";
import Contact from "../pages/user/Contact.jsx";
import About from "../pages/user/About.jsx";
import Cart from "../pages/user/Cart.jsx";
import System from "../pages/user/system.jsx";
import Request from "../pages/user/request.jsx";
const Userroute = [
  { path: "", component: Home },
  { path: "/products", component: Products },
  { path: "product-detail/:slug", component: ProductDetail },
  {path: "/registered", component: Registered},
  {path: "/posts", component: Posts},
  {path: "/contact", component: Contact},
  {path: "/about", component: About},
  {path: "/cart", component: Cart},
  {path: "/system", component: System},
  {path: "/request", component: Request},
];

export default Userroute;
