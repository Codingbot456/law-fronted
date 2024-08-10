import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Filter from '../../components/filters/filters';
import CartBuy from '../../components/cart/CartBuy';
import ProductCard from '../../components/productCards/ProductCard-grid';
import "./all.css";
import Feature from '../../components/assets/productImages/Feature';
import sortProducts from '../../utils/sortProducts';
import  filterProducts  from '../../utils/filterProducts';
import useWindowResize from '../../hooks/useWindowResize';
import { CiFilter } from "react-icons/ci";

const Trending = () => {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const isMobile = useWindowResize();
  const { addToCart } = useContext(CartContext);

  const [products] = useState(Feature);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const closeFilters = () => {
    setShowFilters(false);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const filteredProducts = products.filter(product => filterProducts(product, filters, searchQuery));
  const filteredAndSortedProducts = sortProducts(filteredProducts, sortOption);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className='all'>
      <div className='filters' style={{ display: isMobile && !showFilters ? 'none' : 'block' }}>
        <div className='filter-actions'>
          <div className='all-nav'>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
          <h3>Filters</h3>
          <div>
            <Filter onFilterChange={handleFilterChange} />
          </div>
          {isMobile && <button className='close-toggle' onClick={closeFilters}>Close Filters</button>}
        </div>
      </div>

      <div className='all-items'>
        <div className='sort'>
          {isMobile &&  <CiFilter  className='toggle' onClick={toggleFilters}/> }
          <select className='sorts' onChange={handleSortChange}>
            <option value="">Sort Products</option>
            <option value="newest">Newest</option>
            <option value="popularity">Popularity</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        <div className='all-prods'> 
          <div className={`home-prods4 ${selectedProduct ? 'dimmed' : ''}`}>
            <h2>Our Featured Clothes</h2>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="search-input"
            />
            <div className="item-content4">
              {filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    addToCart={addToCart}
                    setSelectedProduct={handleSelectProduct}
                  />
                ))
              ) : (
                <p>No products available.</p>
              )}
            </div>
            {selectedProduct && (
              <div className="overlay">
                <CartBuy
                  product={selectedProduct}
                  onClose={() => setSelectedProduct(null)}
                  onAddToCart={addToCart}
                />
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Trending;
