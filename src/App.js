import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/context/CartContext';
import { SearchProvider } from './components/context/searchContext';
import { AuthProvider } from './components/context/AuthContext';
import './App.css';

// Import components
import Navbar from './components/navbar/navs/navbar/Navbar';
import Sidebar from './components/navbar/navs/Navside/Sidebar';
import BottomNavbar from './components/navbar/navs/Navside/BottomNavbar';
import Footer from './components/footer/Footer';
import Cart from './components/pages/cart/cart'; // Update to match your directory structure
import CartBuy from './components/cart/CartBuy';
import NavRoutes from './components/routes/NavRoutes'; // Assuming this component contains its own Routes logic
import PageRoutes from './components/routes/PageRoutes'; 
import BlogRoutes from './components/routes/BlogRoutes'; 
import ProductRoutes from './components/routes/productRoutes';
import OtherRoutes from './components/routes/OtherRoutes';
import DashRoutes from './components/routes/DashRoutes';

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

  const handleAddToCart = (item) => {
    // Logic to add the item to the cart
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
                <Routes>
                  {/* Define your routes here */}
                  <Route path="/product/:id" element={<CartBuy onAddToCart={handleAddToCart} />} />
                </Routes>
                {/* Call your route components outside of the Routes context */}
                <NavRoutes />
                <BlogRoutes />
                <PageRoutes />
                <ProductRoutes />
                <OtherRoutes />
                <DashRoutes />
              </main>
              <BottomNavbar toggleCart={toggleCart} />
              {isCartVisible && <Cart closeCart={closeCart} />}
              <Footer /> {/* Include the Footer component here */}
            </div>
          </Router>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  );
};

export default App;
