import React, { useState, useEffect } from 'react';
import './product-detail.css';
import useProductDetails from '../hooks/useProductImages'; // Adjust import as necessary

const ProductDetail = ({ product, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('#000000'); // Default color
    const [selectedSizes, setSelectedSizes] = useState({});
    const { details, loading, error } = useProductDetails(product.id);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (details && details.images && details.images.length > 0) {
            setSelectedImage(details.images[0]);
        }
    }, [details]);

    if (!product) {
        return null;
    }

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => Math.max(prev - 1, 1));

    const handleColorSelect = color => setSelectedColor(color);
    const handleSizeSelect = size => {
        setSelectedSizes(prev => ({
            ...prev,
            [size]: (prev[size] || 0) + 1
        }));
    };

    const totalPrice = details.product.price * quantity + Object.keys(selectedSizes).reduce((total, size) => {
        return total + (details.product.price * selectedSizes[size]);
    }, 0);

    const handleAddToCartClick = () => {
        const finalImageUrl = selectedImage || (details.images.length > 0 ? details.images[0] : '');
        const cartItem = {
            ...details.product,
            quantity: 1,
            totalPrice,
            selectedColor,
            selectedSizes,
            image_url: finalImageUrl,
        };
        onAddToCart(cartItem);
        onClose();
    };

    const handleImageClick = image => setSelectedImage(image);

    return (
        <div className="product-detail-modal">
            <div className="product-detail-content">
                <button className="close-button" onClick={onClose}>X</button>
                <div className='details-container'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error loading product details: {error.message}</p>
                    ) : (
                        <>
                            <div className='details-images'>
                                <div className="main-image-container">
                                    {selectedImage && <img src={selectedImage} alt="Selected" className="product-detail-main-image" />}
                                </div>
                                <div className="thumbnail-container">
                                    {details.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            className={`thumbnail-image ${selectedImage === image ? 'selected' : ''}`}
                                            onClick={() => handleImageClick(image)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className='details-container1'>
                                <div className="product-detail-info1">
                                    <h2>{details.product.name}</h2>
                                    <h4>Price: ${details.product.price}</h4>
                                    <p className='description'>{details.product.description || 'No description available'}</p>
                                    <p><strong>Category:</strong> {details.product.category_name || 'N/A'}</p>
                                    <p><strong>Subcategory:</strong> {details.product.subcategory_name || 'N/A'}</p>
                                    <p>Status: {details.product?.status || 'N/A'}</p>
                                </div>

                                <div className="product-detail-info2">
                                    <div className="sizes">
                                        {details.product.sizes && details.product.sizes.length > 0 ? (
                                            details.product.sizes.map(size => (
                                                <button
                                                    key={size.size_name}
                                                    className={`size-btn ${selectedSizes[size.size_name] ? 'selected' : ''}`}
                                                    onClick={() => handleSizeSelect(size.size_name)}
                                                >
                                                    {size.size_name}
                                                </button>
                                            ))
                                        ) : (
                                            <p>No sizes available</p>
                                        )}
                                    </div>
                                    <div className="colors">
                                        <div>Color</div>
                                        <div className='color-btn'>
                                            {details.colors && details.colors.length > 0 ? (
                                                details.colors.map(color => (
                                                    <button
                                                        key={color.color_name}
                                                        className={`color-btn ${selectedColor === color.color_name ? 'selected' : ''}`}
                                                        style={{ backgroundColor: color.color_name }}
                                                        onClick={() => handleColorSelect(color.color_name)}
                                                    >
                                                        {color.color_name}
                                                    </button>
                                                ))
                                            ) : (
                                                <p>No colors available</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="quantity1">
                                        <button onClick={handleDecrement} className="quantity-btn">-</button>
                                        <div className="quantity-value">{quantity}</div>
                                        <button onClick={handleIncrement} className="quantity-btn">+</button>
                                    </div>
                                    <div className="details-table">
                                        <h5>Selected Options</h5>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Attribute</th>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Selected Sizes</td>
                                                    <td>
                                                        <ul>
                                                            {Object.entries(selectedSizes).map(([size, count]) => (
                                                                <li key={size}>{size} (x{count})</li>
                                                            ))}
                                                        </ul>
                                                        {Object.keys(selectedSizes).length === 0 && 'None'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Selected Color</td>
                                                    <td>
                                                        <span 
                                                            style={{ 
                                                                backgroundColor: selectedColor, 
                                                                padding: '5px 10px', 
                                                                color: '#fff', 
                                                                borderRadius: '4px' 
                                                            }}
                                                        >
                                                            {selectedColor}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Total Price</td>
                                                    <td>${totalPrice.toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <button onClick={handleAddToCartClick} className="add-to-cart-btn primary-button">Add to Cart</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
