import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductDetailPage from "./pages/ProductDetail";
import RootLayout from "./pages/RootLayout";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { getProfileThunk } from "./store/thunk/auth";
import { getCurrentUserCartThunk } from "./store/thunk/cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "products",
        children: [{ path: ":slug", element: <ProductDetailPage /> }],
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("accessToken")) {
        await dispatch(getProfileThunk()).unwrap();
        await dispatch(getCurrentUserCartThunk()).unwrap();
        localStorage.removeItem("cartId");
      }
    })();
  }, []);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />;
    </>
  );
};

export default App;
