import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetCurrentUserQuery,
  useGetProductsQuery,
} from './features/services/RTK/Api';
import { Products } from './features/Slices/ProductSlice';
import { User } from './features/Slices/AppSlice';
import OrderIndex from './Pages/Orders/OrderIndex';

const Home = React.lazy(() => import('./Pages/Home'));
const ProductsIndex = React.lazy(
  () => import('./Pages/Products/ProductsIndex')
);
const YourProducts = React.lazy(() => import('./Pages/Admin/YourProducts'));
const ProductView = React.lazy(() => import('./Pages/Products/ProductView'));
const Login = React.lazy(() => import('./Pages/Register/Login'));
const Register = React.lazy(() => import('./Pages/Register/Register'));
const ProductCreate = React.lazy(
  () => import('./Pages/Products/ProductCreate')
);
const Profile = React.lazy(() => import('./Pages/Admin/Profile'));

function App() {
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const { data: ProductPayload } = useGetProductsQuery('');
  const { data: currentUser } = useGetCurrentUserQuery('');
  React.useEffect(() => {
    dispatch(Products(ProductPayload?.products ?? []));
    if (user?.isLoggedIn) {
      dispatch(User(currentUser?.user));
    }
  }, [currentUser, ProductPayload?.products]);

  console.log('current user:', currentUser?.user);
  console.log('products in app.tsx', ProductPayload);
  return (
    <React.Fragment>
      <Navbar />
      <div className="mt-20">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="products"
              element={
                <ProtectedRoute>
                  <ProductsIndex />
                </ProtectedRoute>
              }
            />
            <Route path="your-products" element={<YourProducts />} />
            <Route path={`view/:id`} element={<ProductView />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="upload-product" element={<ProductCreate />} />
            <Route path="profile" element={<Profile />} />
            <Route path="order-form" element={<OrderIndex />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
