import React, { createContext, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export const Context = createContext();

export default function StateContext({ children }) {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(0);

    let foundProduct;
    let index;

    const incQty = () => {
        setQty(qty + 1)
    }

    const decQty = () => {
        setQty((qty == 0) ? 0 : (qty - 1));
    }

    const onAdd = (product, quantity) => {
        if (quantity < 1) {
            toast.error(`${product.name} quantity should be bigger than 0`);
        } else {
            const checkProductInCart = cartItems.find((item) => item._id === product._id);

            if (checkProductInCart) {
                setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
                setTotalQuantities(totalQuantities + quantity);

                const updatedCartItems = cartItems.map((cartProduct) => {
                    if (cartProduct._id === product._id) return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity
                    }
                });

                setCartItems(updatedCartItems);
            } else {
                setTotalPrice(totalPrice + (product.price * quantity));
                setTotalQuantities(totalQuantities + quantity);

                product.quantity = quantity;
                setCartItems([...cartItems, { ...product }]);
            }
            toast.success(`${qty} ${product.name} added to the cart`);
        }
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id)

        if (value === 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setTotalPrice(totalPrice + foundProduct.price);
            setTotalQuantities(totalQuantities + 1);
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                setTotalPrice(totalPrice + foundProduct.price);
                setTotalQuantities(totalQuantities - 1);
            }
        }
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice(totalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(totalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    return (
        <Context.Provider value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            decQty,
            incQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove
        }}>
            {children}
        </Context.Provider>
    )
}
