import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { useSelector } from 'react-redux';

const Home = React.lazy(() => import('./Pages/Home'))
const Collections = React.lazy(() => import('./components/Collections/Collections'))
const ProductsIndex = React.lazy(() => import('./components/Products/ProductsIndex'))
const ProductView = React.lazy(() => import('./components/Home/ProductView'));
const Login = React.lazy(() => import('./Pages/Login'));
const Register = React.lazy(() => import('./Pages/Register'));
const ProductCreate = React.lazy(() => import('./Pages/ProductCreate'));
const Profile = React.lazy(() => import('./Pages/Profile'));


function App() {
  console.log("REACT BASE URL", process.env.REACT_APP_DEV_BASE_URL);
  const Test = useSelector((state: any) => state.toast.toast)
  return (
    <>
      <Navbar />
      <div className='mt-20'>
        <Toast title={Test.title} message={Test.message} isOpen={Test.isOpen} />

        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="products" element={<ProductsIndex />} />
            <Route path="collections" element={<Collections />} />
            <Route path={`view/:id`} element={<ProductView />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="upload-product" element={<ProductCreate />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  );
}

export default App;
