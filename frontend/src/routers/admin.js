import ListCat from "../pages/admin/Category/ListCat";
import DelCat from "../pages/admin/Category/DelCat";
import AddCat from "../pages/admin/Category/AddCat";
import EditCat from "../pages/admin/Category/EditCat";
import ListProduct from "../pages/admin/Product/ListProduct";
import DelProduct from "../pages/admin/Product/DelProduct";
import EditProduct from "../pages/admin/Product/Editproduct";
import AddProduct from "../pages/admin/Product/AddProduct";

import Dashboard from "../pages/admin/Dashboard";

import ListBrand from "../pages/admin/Brand/listBrand";



const AdminRoute = [
  { path: "categories/:page?", component: ListCat },
  { path: "/admin/addCat", component: AddCat },
  { path: "/admin/delCat/", component: DelCat },
  { path: "/admin/editCat/:id", component: EditCat },

  { path: "dashboard", component: Dashboard },
  { path: "", component: Dashboard },
  { path: "products/:page?", component: ListProduct },
  { path: "/admin/products/:page", component: ListProduct },
  { path: "/admin/delProduct", component: DelProduct },
  // { path: "/admin/editProduct/:slug", component: EditProduct },
  { path: "/admin/editProduct/:id", component: EditProduct },

  { path: "/admin/addProduct", component: AddProduct },

  { path: "brands", component: ListBrand },

 
];

export default AdminRoute;
