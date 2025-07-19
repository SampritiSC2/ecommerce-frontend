import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductDetailPage from "./pages/ProductDetail";
import RootLayout from "./pages/RootLayout";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

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
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />;
    </>
  );
};

export default App;
