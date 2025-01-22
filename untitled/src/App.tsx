import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customers from './components/Customers';
import Bills from './components/Bills';
import BillDetails from './components/BillDetails';
import Products from './components/Products';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/bills/:customerId" element={<Bills />} />
          <Route path="/bill-details/:id" element={<BillDetails />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
  );
}

export default App;