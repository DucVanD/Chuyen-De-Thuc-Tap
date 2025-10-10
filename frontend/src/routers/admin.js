// dashboard
import Dashboard from "../pages/admin/Dashboard";
// category
import ListCat from "../pages/admin/Category/ListCat";
import DelCat from "../pages/admin/Category/DelCat";
import AddCat from "../pages/admin/Category/AddCat";
import EditCat from "../pages/admin/Category/EditCat";
import TrashCat from "../pages/admin/Category/TrashCat";
// product
import ListProduct from "../pages/admin/Product/ListProduct";
import DelProduct from "../pages/admin/Product/DelProduct";
import EditProduct from "../pages/admin/Product/Editproduct";
import AddProduct from "../pages/admin/Product/AddProduct";
import TrashProduct from "../pages/admin/Product/TrashProduct";
// post
import ListPost from "../pages/admin/post/ListPost";
import EditPost from "../pages/admin/post/EditPost";
import AddPost from "../pages/admin/post/AddPost";
// topic
import ListTopic from "../pages/admin/Topic/ListTopic";
import EditTopic from "../pages/admin/Topic/EditTopic";
import AddTopic from "../pages/admin/Topic/Addtopic";
// brand

import ListBrand from "../pages/admin/Brand/listBrand";
// order
import listOrder from "../pages/admin/Order/listOrder";
import EditOrder from "../pages/admin/Order/EditOrder";
import OrderDetail from "../pages/admin/Order/detailOrder";
// user
import ListUser from "../pages/admin/UserAdmin/ListUser";
import UserDetail from "../pages/admin/UserAdmin/UserDetail";

// định nghĩa các route cho trang admin

import LoginAmin from "../pages/admin/Login";

const AdminRoute = [
  //  category
  { path: "categories/:page?", component: ListCat },
  { path: "/admin/addCat", component: AddCat },
  { path: "/admin/delCat/", component: DelCat },
  { path: "/admin/editCat/:id", component: EditCat },
  {path: "/admin/trashCat/:page?", component: TrashCat},

  //  dashboard
  { path: "dashboard", component: Dashboard },
  { path: "", component: Dashboard },

  //  product
  { path: "products", component: ListProduct },
  { path: "/admin/products/:page?", component: ListProduct },
  { path: "/admin/delProduct", component: DelProduct },
  { path: "/admin/editProduct/:id", component: EditProduct },
  { path: "/admin/addProduct", component: AddProduct },
  { path: "/admin/trashProduct/:page?", component: TrashProduct },
  // brand
  { path: "brands/:page?", component: ListBrand },



  //  post
  { path: "posts", component: ListPost },
  { path: "/admin/addPost", component: AddPost },
  { path: "/admin/editPost/:id", component: EditPost },
  // topic
  { path: "topics/:page?", component: ListTopic },
  { path: "/admin/addTopic", component: AddTopic },
  { path: "/admin/editTopic/:id", component: EditTopic },


  //  order
  { path: "orders/:page?", component: listOrder },
  { path: "orders", component: listOrder },
  { path: "editOrder/:id", component: EditOrder }, // chỉnh sửa đơn hàng
  { path: "orderDetail/:id", component: OrderDetail }, // chi tiết đơn hàng
  //  user
  {path: "users/:page?", component: ListUser },
  {path: "userDetail/:id", component: UserDetail },
  // login
  { path: "login", component: LoginAmin }
];

export default AdminRoute;
