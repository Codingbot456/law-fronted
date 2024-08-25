import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import '../cart/cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
    const [isCartVisible, setIsCartVisible] = useState(true);
    const navigate = useNavigate(); // Add useNavigate for navigation

    // Log cart items
    console.log("Cart Items:", cartItems); // Log the entire cart

    // Calculate the total amount based on the cart items
    const totalAmount = Array.isArray(cartItems) ? cartItems.reduce((total, item) => {
        const itemPrice = Number(item.price);

        // Calculate the total price for this item based on selected sizes
        const sizesTotalPrice = Object.entries(item.selectedSizes || {}).reduce((sizeTotal, [size, count]) => {
            return sizeTotal + (itemPrice * count); // Total for sizes
        }, 0);

        // Total price for this item including quantity
        const totalItemPrice = (sizesTotalPrice * item.quantity) + (itemPrice * item.quantity);

        return total + totalItemPrice; // Accumulate total
    }, 0) : 0; // Default to 0 if cartItems is not an array

    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };

    const handleCheckout = () => {
        console.log("Checkout initiated with items:", JSON.stringify(cartItems, null, 2)); // Log items being sent to checkout
        navigate('/checkout'); // Navigate to checkout
    };

    return (
        <>
            {isCartVisible && (
                <div className="cart">
                    <div className="cart-header">
                        <h2>Your Cart</h2>
                        <button onClick={toggleCartVisibility} className="close-cart-btn">X</button>
                    </div>
                    <ul>
                        {Array.isArray(cartItems) && cartItems.length > 0 ? (
                            cartItems.map((item, index) => {
                                const itemPrice = Number(item.price); // Ensure price is a number

                                // Calculate total price for selected sizes
                                const sizesTotalPrice = Object.entries(item.selectedSizes || {}).reduce((sizeTotal, [size, count]) => {
                                    return sizeTotal + (itemPrice * count); // Total for sizes
                                }, 0);

                                // Total price for this item
                                const totalItemPrice = (sizesTotalPrice * item.quantity) + (itemPrice * item.quantity);

                                return (
                                    <li key={index} className="cart-item">
                                        <img src={item.image_url} alt={item.name} className="cart-item-image" />
                                        <div className="cart-item-details">
                                            <h4>{item.name}</h4>
                                            <p>Price: ${itemPrice.toFixed(2)}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            {/* Display the total price for this item */}
                                            <p>Total Price: ${totalItemPrice.toFixed(2)}</p>
                                            <p>Color: <span className="color-box" style={{ backgroundColor: item.selectedColor }}></span></p>
                                            <p>Sizes: {
                                                Object.entries(item.selectedSizes || {}).map(([size, count]) => `${size} (x${count})`).join(', ') || 'None'
                                            }</p>
                                        </div>
                                        <div className="cart-item-actions">
                                            <div className="quantity-controls">
                                                <button onClick={() => incrementQuantity(item.id)} className="quantity-btn">+</button>
                                                <button onClick={() => decrementQuantity(item.id)} className="quantity-btn" disabled={item.quantity <= 1}>-</button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="remove-item">Remove</button>
                                        </div>
                                    </li>
                                );
                            })
                        ) : (
                            <div className='empty'>
                                <p className="empty-cart">Your cart is empty</p>
                            </div>
                        )}
                    </ul>
                    {Array.isArray(cartItems) && cartItems.length > 0 && (
                        <div className="total-amount">
                            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
                            <div className="cart-actions">
                                <button onClick={clearCart} className="clear-cart">Clear Cart</button>
                                <Link to="/checkout" className="checkout-link" onClick={handleCheckout}>
                                    <button className="checkout-btn">Checkout</button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Cart;
