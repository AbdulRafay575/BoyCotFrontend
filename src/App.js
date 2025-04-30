import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProductUser from './components/AddProductUser';
import AdminUserProducts from './components/AdminUserProducts';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/suggest" element={<AddProductUser />} />
        <Route path="/admin/user-products" element={<AdminUserProducts />} />
      </Routes>
    </Router>
  );
};

export default App;
