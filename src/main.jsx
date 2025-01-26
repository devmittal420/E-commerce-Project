import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "./Pages/Products/Products.Layout";
import Cart from "./Pages/Cart/Cart.Layout";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import Signin from "./Pages/Authentication/SignIn/SignIn";
import Signup from "./Pages/Authentication/SignUp/SignUp";
import HighComp from "./HOC/Hoc";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/product",
    element: (
      <ProtectedRoutes>
        <Product />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoutes>
        <Cart />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/signin",
    element: (
      <HighComp>
        <Signin />
      </HighComp>
    ),
  },
  {
    path: "/",
    element: (
      <HighComp>
        <Signup />
      </HighComp>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer autoClose="2000" pauseOnHover={false} />
  </>
);
