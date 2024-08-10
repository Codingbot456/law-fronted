import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavRoutes from './components/routes/NavRoutes';
import PageRoutes from './components/routes/PageRoutes';
import BlogRoutes from './components/routes/BlogRoutes';
import ProductRoutes from './components/routes/productRoutes';
import OtherRoutes from './components/routes/OtherRoutes';
import { CartProvider } from './components/context/CartContext';
import { SearchProvider } from './components/context/searchContext';
import { AuthProvider } from './components/context/AuthContext';
import './App.css';

// Import components
import Navbar from './components/navbar/navs/navbar/Navbar';
import Sidebar from './components/navbar/navs/Navside/Sidebar';
import BottomNavbar from './components/navbar/navs/Navside/BottomNavbar';
import Cart from './components/pages/cart/cart'; // Update to match your directory structure

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [isCartVisible, setCartVisible] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleCart = () => {
    setCartVisible(prev => !prev);
  };

  const closeCart = () => {
    setCartVisible(false);
  };

  return (
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <Router>
            <div className="app">
              <Navbar toggleSidebar={toggleSidebar} toggleCart={toggleCart} />
              <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
              <main className="main-content">
                <NavRoutes />
                <BlogRoutes />
                <PageRoutes />
                <ProductRoutes />
                <OtherRoutes /> 
              </main>
              <BottomNavbar toggleCart={toggleCart} />
              {isCartVisible && <Cart closeCart={closeCart} />}
            </div>
          </Router>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  );
};

export default App;
