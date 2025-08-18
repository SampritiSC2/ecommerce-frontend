import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import ProductDetailPage from './pages/ProductDetail';
import RootLayout from './pages/RootLayout';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import Cart from './pages/Cart';
import Login from './pages/Login';
import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import { getProfileThunk } from './store/thunk/auth';
import { getCartByIdThunk, getCurrentUserCartThunk } from './store/thunk/cart';
import { CARTID_KEY } from './constants/cart.constants';
import Checkout from './pages/Checkout';
import CheckAuth from './components/guards/CheckAuth';
import { authActions } from './store/slice/authSlice';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'products',
        children: [{ path: ':slug', element: <ProductDetailPage /> }],
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: (
          <CheckAuth>
            <Checkout />,
          </CheckAuth>
        ),
      },
    ],
  },
]);

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem('accessToken');
      const anonymousCartId = localStorage.getItem(CARTID_KEY);
      try {
        // If accessToken is present, then make API calls to get logged in users profile and cart
        if (accessToken) {
          await Promise.all([dispatch(getProfileThunk()).unwrap(), dispatch(getCurrentUserCartThunk()).unwrap()]);
          localStorage.removeItem(CARTID_KEY);
          return;
        } else {
          // Reset loading flag to false if user is not fetched in get profile call
          dispatch(authActions.reset());
        }
        if (anonymousCartId) {
          // only when not logged in, fetch anonymous cart details
          await dispatch(getCartByIdThunk(anonymousCartId)).unwrap();
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
};

export default App;
