import React, { useState } from 'react';
import './cart-buy.css';
import ProductDetail from '../productDetails/ProductDetail';
import useProductDetails from '../hooks/useProductImages'; // Ensure this points to the correct hook

const CartBuy = ({ product, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [selectedSizes, setSelectedSizes] = useState({}); // Change to an object
    const [showDetails, setShowDetails] = useState(false);
    const { details, loading, error } = useProductDetails(product.id);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    const handleSizeSelect = (size) => {
        setSelectedSizes(prevSizes => {
            const currentCount = prevSizes[size] || 0;
            return {
                ...prevSizes,
                [size]: currentCount + 1 // Increment the count for the selected size
            };
        });
    };

    // Calculate total price based on selected sizes and quantity
    const totalSizeCount = Object.values(selectedSizes).reduce((acc, count) => acc + count, 0);
    const totalPrice = totalSizeCount > 0 
        ? details.product.price * totalSizeCount * quantity 
        : details.product.price * quantity;

    const handleAddToCartClick = () => {
        const firstImageUrl = details.images.length > 0 ? details.images[0].image_url : ''; // Get the first image URL
        onAddToCart({ 
            ...product, 
            quantity, 
            totalPrice, 
            selectedColor, 
            selectedSizes, // Pass selected sizes
            image_url: firstImageUrl // Add the first image URL to the cart item
        });
        onClose();
    };

    const handleViewDetailsClick = () => {
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
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
                        <p>Error loading images</p>
                    ) : details.images.length > 0 ? (
                        <img src={details.images[0].image_url} alt={details.product.name} className="card-image" />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
                <div className="cart-buy-abt2">
                    <div className="card-info">
                        <h4>{details.product.name}</h4>
                        <h5>Price: ${details.product.price}</h5>
                        <p className='description'>{details.product.description}</p>
                        <p>Material: {details.product.material_name}</p>
                        <p>Selected Sizes: {Object.entries(selectedSizes).map(([size, count]) => `${size} (x${count})`).join(', ') || 'None'}</p>
                        <h5>Total Price: ${totalPrice.toFixed(2)}</h5> {/* Display total price */}
                    </div>
                    <div className="sizes">
                        {details.product.sizes.map(size => (
                            <button
                                key={size}
                                className={`size-btn ${size in selectedSizes ? 'selected' : ''}`} // Highlight selected sizes
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    <div className="color-picker">
                        <div>Color</div>
                        <input type="color" value={selectedColor} onChange={handleColorChange} />
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
            {showDetails && <ProductDetail product={details.product} onClose={handleCloseDetails} onAddToCart={onAddToCart} />}
        </div>
    );
};

export default CartBuy;
