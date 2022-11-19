import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Products from './Pages/Products';
import Categories from './Pages/Categories';
import Login from './Pages/Login';
import ProductsIndex from './components/Products/ProductsIndex';
import Collections from './components/Collections/Collections';
import ProductView from './components/Home/ProductView';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="shop" element={<Products />} />
          <Route path="products" element={<ProductsIndex />} />
          <Route path="categories" element={<Categories />} />
          <Route path="collections" element={<Collections />} />
          <Route path={`view/:id`} element={<ProductView />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
