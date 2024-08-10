// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';

// Import your components and contexts
import Nav from './pages/navbar/Navbar';
import Cart from './pages/cart/cart';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/searchContext';
import { AuthProvider } from './context/AuthContext';

// Import route files
import { AuthRoutes } from './routes/authRoutes';
import { ProductRoutes } from './routes/productRoutes';
import { AdminRoutes } from './routes/adminRoutes';
import { OtherRoutes } from './routes/otherRoutes';

import { getQueryParam } from './utils/getQueryParam';

// Import CartBuy component
import CartBuy from './components/cart/CartBuy';

function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleAddToCart = (item) => {
    console.log('Item added to cart:', item);
    // Your logic to add item to cart
  };

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const source = getQueryParam('source') || 'Website'; // Default source if none provided
        await axios.post('http://localhost:4000/api/track-visitor', { source });
        console.log('Visit tracked successfully');
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    trackVisitor();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <Router>
            <Nav isCartVisible={isCartVisible} setIsCartVisible={setIsCartVisible} />
            <Routes>
              {AuthRoutes()}
              {ProductRoutes()}
              {AdminRoutes()}
              {OtherRoutes()}
              {/* Example route where CartBuy is used */}
              <Route path="/product/:id" element={<CartBuy onAddToCart={handleAddToCart} />} />
            </Routes>
            {isCartVisible && <Cart />}
          </Router>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
