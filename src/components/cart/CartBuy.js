import React, { useState } from 'react';
import './cart-buy.css';
import ProductDetail from '../productDetails/ProductDetail';
import useProductDetails from '../hooks/useProductImages'; // Ensure this points to the correct hook

const CartBuy = ({ product, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [selectedSizes, setSelectedSizes] = useState({});
    const [showDetails, setShowDetails] = useState(false);
    
    // Log the product prop to verify it's being passed correctly
    console.log("Product prop:", product); // Check the product details

    // Use the correct property for productId
    const { details, loading, error } = useProductDetails(product.product_id); // Use product.product_id

    // Log details to debug
    console.log("Product ID:", product.product_id); // Log the product ID
    console.log("Details fetched:", details); // Log fetched details
    console.log("Quantity:", quantity); // Log current quantity
    console.log("Selected Color:", selectedColor); // Log selected color
    console.log("Selected Sizes:", selectedSizes); // Log selected sizes

    const handleIncrement = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + 1;
            console.log("Incrementing quantity to:", newQuantity); // Log incremented quantity
            return newQuantity;
        });
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => {
            const newQuantity = Math.max(prevQuantity - 1, 1); // Ensure quantity doesn't go below 1
            console.log("Decrementing quantity to:", newQuantity); // Log decremented quantity
            return newQuantity;
        });
    };

    const handleColorChange = (event) => {
        const newColor = event.target.value;
        setSelectedColor(newColor);
        console.log("Selected Color Changed to:", newColor); // Log color change
    };

    const handleSizeSelect = (size) => {
        setSelectedSizes(prevSizes => {
            const currentCount = prevSizes[size] || 0;
            const newSizes = {
                ...prevSizes,
                [size]: currentCount + 1 // Increment the count for the selected size
            };
            console.log("Selected Sizes Updated:", newSizes); // Log updated sizes
            return newSizes;
        });
    };

    // Calculate total price based on selected sizes and quantity
    const totalSizeCount = Object.values(selectedSizes).reduce((acc, count) => acc + count, 0);
    const totalPrice = totalSizeCount > 0 
        ? details.product.price * totalSizeCount * quantity 
        : details.product.price * quantity;

    console.log("Total Size Count:", totalSizeCount); // Log total size count
    console.log("Total Price:", totalPrice.toFixed(2)); // Log total price

    const handleAddToCartClick = () => {
        const firstImageUrl = details.images.length > 0 ? details.images[0] : ''; // Get the first image URL
        const cartItem = { 
            id: Date.now(), // Unique ID for the cart item
            ...product, 
            quantity, 
            totalPrice, 
            selectedColor, 
            selectedSizes, 
            image_url: firstImageUrl 
        };
        console.log("Adding to Cart:", cartItem); // Log cart item details
        onAddToCart(cartItem);
        onClose();
    };

    const handleViewDetailsClick = () => {
        console.log("Viewing details for product:", details.product); // Log details view
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        console.log("Closing product details."); // Log details close action
        setShowDetails(false);
    };

    return (
        <div>
            <div className="buy-card4">
                <button className="close-button" onClick={onClose}>X</button>
                <div className="cart-buy-abt">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error loading product details.</p>
                    ) : details.images && details.images.length > 0 ? (
                        <img src={details.images[0]} alt={details.product.name} className="card-image" />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
                <div className="cart-buy-abt2">
                    <div className="card-info">
                        <h4>{details.product?.name || 'Product Name'}</h4>
                        <h5>Price: ${details.product?.price || 'N/A'}</h5>
                        <p className='description'>{details.product?.description || 'No description available.'}</p>
                       
                        {/* Display selected sizes */}
                        <p>Selected Sizes: {Object.entries(selectedSizes).map(([size, count]) => `${size} (x${count})`).join(', ') || 'None'}</p>

                        {/* Display selected color */}
                        <p>
                            <strong>Selected Color:</strong> 
                            <span style={{ backgroundColor: selectedColor, padding: '5px 10px', color: '#fff', borderRadius: '4px' }}>
                                {selectedColor}
                            </span>
                        </p>

                        <h5>Total Price: ${totalPrice.toFixed(2)}</h5>
                    </div>
                    <div className="sizes">
                        {details.product?.sizes?.map(size => (
                            <button
                                key={size.size_name}
                                className={`size-btn ${size.size_name in selectedSizes ? 'selected' : ''}`}
                                onClick={() => handleSizeSelect(size.size_name)}
                            >
                                {size.size_name}
                            </button>
                        )) || <p>No sizes available</p>}
                    </div>
                    <div className="color-picker">
                        <div>Color</div>
                        {console.log("Available Colors:", details.colors)}  {/* Debugging log */}
                        {details.colors?.map(color => (
                            <button 
                                key={color.color_name}
                                style={{ backgroundColor: color.color_name, color: '#fff' }}
                                className={`color-btn ${selectedColor === color.color_name ? 'selected' : ''}`}
                                onClick={() => setSelectedColor(color.color_name)}
                            >
                                {color.color_name}
                            </button>
                        )) || <p>No colors available</p>}
                    </div>
                    <div className="quantity1">
                        <button onClick={handleDecrement} className="quantity-btn">-</button>
                        <div className="quantity-value">{quantity}</div>
                        <button onClick={handleIncrement} className="quantity-btn">+</button>
                    </div>
                    <div className='cart-actions'>
                        <button onClick={handleAddToCartClick} className="secondary">Add to Cart</button>
                        <button onClick={handleViewDetailsClick} className='primary'>View Details</button>
                    </div>
                </div>
            </div>
            {showDetails && (
                <ProductDetail 
                    product={details.product} 
                    onClose={handleCloseDetails} 
                    onAddToCart={onAddToCart} 
                />
            )}
        </div>
    );
};

export default CartBuy;
