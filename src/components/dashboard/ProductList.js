import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateForm from './createForm';
import './productList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch the list of products
    axios.get('http://localhost:4000/api/products')
      .then(response => {
        console.log("Fetched products:", response.data); // Log the entire response data

        // Log details for each fetched product
        response.data.forEach(product => {
          console.log("Product details:", {
            id: product.product_id,
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            subcategory: product.subcategory,
            status: product.status,
            sizes: product.sizes,
            colors: product.colors,
            images: product.images
          });
        });

        setProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    // Fetch product details when a product is selected for editing
    if (selectedProductId) {
      axios.get(`http://localhost:4000/api/products/${selectedProductId}`)
        .then(response => {
          console.log("Fetched product details:", response.data); // Log the detailed product data
          setSelectedProduct(response.data);
        })
        .catch(error => console.error('Error fetching product details:', error));
    }
  }, [selectedProductId]);

  const handleEdit = (productId) => {
    console.log("Selected product ID for editing:", productId); // Log the ID of the selected product
    setSelectedProductId(productId);
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => {
          // Ensure price is a number
          const price = Number(product.price);

          return (
            <li key={product.product_id}>
              <div>
                <h3>{product.name}</h3>
                <p><strong>Price:</strong> ${!isNaN(price) ? price.toFixed(2) : 'N/A'}</p>
                <p><strong>Description:</strong> {product.description || 'No description available'}</p>

                {/* Display category, subcategory, and status details if available */}
                <p><strong>Category:</strong> {product.category || 'N/A'}</p>
                <p><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</p>
                <p><strong>Status:</strong> {product.status || 'N/A'}</p>

                {/* Display sizes */}
                <p><strong>Sizes:</strong> {product.sizes && product.sizes.length > 0 ? product.sizes.map(size => size.size_name).join(', ') : 'No sizes available'}</p>

                {/* Display colors */}
                <p><strong>Colors:</strong> {product.colors && product.colors.length > 0 ? product.colors.map(color => color.color_name).join(', ') : 'No colors available'}</p>

                {/* Display images if available */}
                <div>
                  <strong>Images:</strong>
                  {product.images && product.images.length > 0 ? (
                    product.images.map((url, index) => (
                      <img 
                        key={index} 
                        src={url} 
                        alt={`product-image-${index}`} 
                        width="100" 
                        height="100" 
                        style={{ margin: '5px' }}
                      />
                    ))
                  ) : (
                    <p>No images available</p>
                  )}
                </div>

                <button onClick={() => handleEdit(product.product_id)}>Edit</button>
              </div>
            </li>
          );
        })}
      </ul>

      {selectedProduct && (
        <div className="product-details">
          <h3>Editing Product</h3>
          <CreateForm product={selectedProduct} />
        </div>
      )}
    </div>
  );
}

export default ProductList;
