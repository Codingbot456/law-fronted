import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load cart items from localStorage if available
        const savedCart = localStorage.getItem('cartItems');
        const parsedCartItems = savedCart ? JSON.parse(savedCart) : [];
        console.log("Cart Items Loaded:", parsedCartItems); // Log cartItems when loaded from localStorage
        return parsedCartItems;
    });

    const [isCartVisible, setIsCartVisible] = useState(false); // State for cart visibility

    useEffect(() => {
        // Save cart items to localStorage whenever they change
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log("Cart Items Updated:", cartItems); // Log cartItems whenever they are updated
    }, [cartItems]);

    const addToCart = (newItem) => {
        const existingItem = cartItems.find(item => item.id === newItem.id);
        const newQuantity = Number(newItem.quantity);
        const newTotalPrice = Number(newItem.price) * newQuantity;
        
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === newItem.id ? 
                { ...item, quantity: item.quantity + newQuantity, totalPrice: item.totalPrice + newTotalPrice } 
                : item
            ));
        } else {
            setCartItems([...cartItems, { ...newItem, totalPrice: newTotalPrice }]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const incrementQuantity = (id) => {
        setCartItems(cartItems.map(item => 
            item.id === id ? 
            { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + Number(item.price) } 
            : item
        ));
    };

    const decrementQuantity = (id) => {
        setCartItems(cartItems.map(item => 
            item.id === id && item.quantity > 1 ? 
            { ...item, quantity: item.quantity - 1, totalPrice: item.totalPrice - Number(item.price) } 
            : item
        ));
    };

    const toggleCart = () => {
        setIsCartVisible(prev => !prev); // Toggle cart visibility
    };

    const closeCart = () => {
        setIsCartVisible(false); // Close the cart
    };

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            clearCart, 
            incrementQuantity, 
            decrementQuantity, 
            isCartVisible, 
            toggleCart, 
            closeCart 
        }}>
            {children}
        </CartContext.Provider>
    );
};
