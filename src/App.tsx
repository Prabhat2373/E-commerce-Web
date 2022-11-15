import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Products from './Pages/Products';
import Categories from './Pages/Categories';
import Collections from './Pages/Collections';
import Login from './Pages/Login';

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="collections" element={<Collections />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;