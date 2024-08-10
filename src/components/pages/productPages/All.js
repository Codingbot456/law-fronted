import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SellingProducts from '../products/onselling';
import NewProducts from '../products/newArrival';
import FeaturedProducts from '../products/featured';
import Filter from '../components/filters/filters';
import "../pages/all.css";

export const All = () => {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false); // State to manage filter visibility
  const [sortOption, setSortOption] = useState(''); // State to manage sorting
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // State to manage screen size

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowFilters(true); // Ensure filters are shown on larger screens
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  const sortProducts = (products) => {
    switch (sortOption) {
      case 'newest':
        return [...products].sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'popularity':
        return [...products].sort((a, b) => b.popularity - a.popularity);
      case 'low-high':
        return [...products].sort((a, b) => a.price - b.price);
      case 'high-low':
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const sortedFeaturedProducts = sortProducts(FeaturedProducts);
  const sortedSellingProducts = sortProducts(SellingProducts);
  const sortedNewProducts = sortProducts(NewProducts);

  return (
    <div className='all'>
      <div className='filters' style={{ display: isMobile && !showFilters ? 'none' : 'block' }}>
        <div className='filter-actions'>
          <div className='all-nav'>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/search">Search</Link></li>
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
          {isMobile && <button className='toggle' onClick={toggleFilters}>Open Filters</button>}
          <select className='sorts' onChange={handleSortChange}>
            <option value="">Sort Products</option>
            <option value="newest">Newest</option>
            <option value="popularity">Popularity</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        <div className='all-prods'> 
        <FeaturedProducts filters={filters} products={sortedFeaturedProducts} />
        <SellingProducts filters={filters} products={sortedSellingProducts} />
        <NewProducts filters={filters} products={sortedNewProducts} />
        </div>
        
      </div>
    </div>
  );
};
