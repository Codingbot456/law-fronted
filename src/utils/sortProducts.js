// src/utils/sortProducts.js

const sortProducts = (products, sortOption) => {
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
  
  export default sortProducts;
  