import Home from "../pages/user/home.jsx";
import ProductDetail from "../pages/user/Detail.jsx";
import Products from "../pages/user/Products.jsx";
import Posts from "../pages/user/post.jsx";
import Registered from "../pages/user/Registered.jsx";
import Contact from "../pages/user/Contact.jsx";
import About from "../pages/user/About.jsx";
import Cart from "../pages/user/Cart.jsx";
import System from "../pages/user/system.jsx";
import Request from "../pages/user/request.jsx";
import Checkout from "../pages/user/Checkout.jsx";
import ProductByCat from "../pages/user/ProductByCat.jsx";
import Profile from "../pages/user/Profile.jsx";
import HistoryBought from "../pages/user/HistoryBought.jsx";
const Userroute = [
  { path: "", component: Home },
  { path: "/products", component: Products },
  { path: "/products/:page?", component: Products },
  { path: "/products/category/:slug", component: ProductByCat },
  { path: "product/:slug", component: ProductDetail },
  { path: "/registered", component: Registered },
  { path: "/posts/:page?", component: Posts },
  { path: "/contact", component: Contact },
  { path: "/about", component: About },
  { path: "/cart", component: Cart },
  { path: "/system", component: System },
  { path: "/request", component: Request },
  { path: "/checkout", component: Checkout },
  { path: "/category/:slug", component: Products },
  { path: "/profile", component: Profile },
  { path: "/history-bought/:page?", component: HistoryBought },
];

export default Userroute;
