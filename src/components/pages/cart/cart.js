import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import '../cart/cart.css';


const Cart = () => {
    const { cartItems, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
    const [isCartVisible, setIsCartVisible] = useState(true);

    // Calculate the total amount based on the cart items
    const totalAmount = cartItems.reduce((total, item) => {
        const itemPrice = Number(item.price);

        // Calculate the total price for this item based on selected sizes
        const sizesTotalPrice = Object.entries(item.selectedSizes || {}).reduce((sizeTotal, [size, count]) => {
            return sizeTotal + (itemPrice * count); // Total for sizes
        }, 0);

        // Total price for this item including quantity
        const totalItemPrice = (sizesTotalPrice * item.quantity) + (itemPrice * item.quantity);

        return total + totalItemPrice; // Accumulate total
    }, 0);

    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };

    return (
        <>
            {isCartVisible && (
                <div className="cart">
                    <div className="cart-header">
                        <h2>Your Cart</h2>
                        <button onClick={toggleCartVisibility} className="close-cart-btn accent">X</button>
                    </div>
                    <ul>
                        {cartItems && cartItems.length > 0 ? (
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
                                            <p>Color: <span style={{ backgroundColor: item.selectedColor, display: 'inline-block', width: '20px', height: '20px', border: '1px solid #000' }}></span></p>
                                            <p>Sizes: {
                                                Object.entries(item.selectedSizes || {}).map(([size, count]) => `${size} (x${count})`).join(', ') || 'None'
                                            }</p>
                                        </div>
                                        <div className="cart-item-actions">
                                            <div className="quantity-controls">
                                                <button onClick={() => incrementQuantity(item.id)} className="quantity-btn accent">+</button>
                                                <button onClick={() => decrementQuantity(item.id)} className="quantity-btn accent" disabled={item.quantity <= 1}>-</button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="remove-item accent">Remove</button>
                                        </div>
                                    </li>
                                );
                            })
                        ) : (
                            <div className='empty'>
                                <li className="empty-cart">Your cart is empty</li>
                              
                            </div>
                        )}
                    </ul>
                    {cartItems.length > 0 && (
                        <div className="total-amount">
                            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
                            <div className="cart-actions2">
                                <button onClick={clearCart} className="clear-cart secondary">Clear Cart</button>
                                <Link to="/checkout" className="checkout-link">
                                    <button className='primary'>Checkout</button>
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
