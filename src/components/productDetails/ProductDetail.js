import React, { useState, useEffect } from 'react';
import useProductDetails from '../hooks/useProductImages';

const ProductDetail = ({ product, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('#000000'); // Default color or a placeholder
    const [selectedSizes, setSelectedSizes] = useState({});
    const { details, loading, error } = useProductDetails(product.id);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (details.images && details.images.length > 0) {
            setSelectedImage(details.images[0].image_url);
        }
    }, [details.images]);

    if (!product) {
        return null;
    }

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    const handleSizeSelect = (size) => {
        setSelectedSizes(prevSizes => ({
            ...prevSizes,
            [size]: (prevSizes[size] || 0) + 1
        }));
    };

    // Calculate total price based on selected sizes and their counts
    const totalPrice = details.product.price * quantity + Object.keys(selectedSizes).reduce((total, size) => {
        return total + (details.product.price * selectedSizes[size]);
    }, 0);

    const handleAddToCartClick = () => {
        const finalImageUrl = selectedImage || (details.images.length > 0 ? details.images[0].image_url : '');
        onAddToCart({
            ...details.product,
            quantity: 1, // Always set quantity to 1 when adding to the cart
            totalPrice, // Pass total price to the cart
            selectedColor,
            selectedSizes,
            image_url: finalImageUrl
        });
        onClose();
    };

    const handleImageClick = (image) => {
        setSelectedImage(image.image_url);
    };

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
                                            src={image.image_url}
                                            alt={image.caption}
                                            className={`thumbnail-image ${selectedImage === image.image_url ? 'selected' : ''}`}
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
                                    <p><strong>Sub-Subcategory:</strong> {details.product.sub_subcategory_name || 'N/A'}</p>
                                    <p><strong>Timeline:</strong> {details.product.timeline_name || 'N/A'}</p>
                                    <p><strong>Brand:</strong> {details.product.brand_name || 'N/A'}</p>
                                    <p><strong>Color:</strong> {details.product.color_name || 'N/A'}</p>
                                    <p><strong>Material:</strong> {details.product.material_name || 'N/A'}</p>
                                    <p><strong>Selected Sizes:</strong> {Object.entries(selectedSizes).map(([size, count]) => `${size} (x${count})`).join(', ') || 'None'}</p>
                                    <p><strong>Selected Color:</strong> <span style={{ backgroundColor: selectedColor, padding: '5px 10px', color: '#fff', borderRadius: '4px' }}>{selectedColor}</span></p>
                                    <h5>Total Price: ${totalPrice.toFixed(2)}</h5>
                                </div>

                                <div className="product-detail-info2">
                                    <div className="sizes">
                                        {details.product.sizes && details.product.sizes.length > 0 ? (
                                            details.product.sizes.map(size => (
                                                <button
                                                    key={size}
                                                    className={`size-btn ${selectedSizes[size] ? 'selected' : ''}`}
                                                    onClick={() => handleSizeSelect(size)}
                                                >
                                                    {size}
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
                                                    key={color}
                                                    className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                                                    style={{ backgroundColor: color }}
                                                    onClick={() => handleColorSelect(color)}
                                                >
                                                    {color}
                                                </button>
                                            ))

                                        ) : (
                                            <p>No color available</p>
                                        )}
                                        </div>
                                    </div>
                                    <div className="quantity1">
                                        <button onClick={handleDecrement} className="quantity-btn">-</button>
                                        <div className="quantity-value">{quantity}</div>
                                        <button onClick={handleIncrement} className="quantity-btn">+</button>
                                    </div>
                                    <button onClick={handleAddToCartClick} className="add-to-cart-btn">Add to Cart</button>
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
