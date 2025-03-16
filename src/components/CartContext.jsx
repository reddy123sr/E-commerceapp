import { createContext, useContext, useState } from "react";
//import Checkout from "./Checkout";
const CartContext=createContext()

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
  };

export const CartProvider=({children})=>{
    const[cart,setCart]=useState([])
    const[wishlist,setWishlist]=useState([])
    
    const addToCart = (item) => {
        setCart((prevCart) => {
          const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      
          if (existingItem) {
            // If item exists, increase quantity
            return prevCart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          } else {
            // If item does not exist, add with quantity 1
            return [...prevCart, { ...item, quantity: 1 }];
          }
        });
      };
      const toggleWishlist = (product) => {
        setWishlist((prevWishlist) => {
          console.log("Previous Wishlist:", prevWishlist); // Debugging step
          let updatedWishlist;
      
          if (prevWishlist.some((item) => item.id === product.id)) {
            updatedWishlist = prevWishlist.filter((item) => item.id !== product.id); // Remove product
          } else {
            updatedWishlist = [...prevWishlist, product]; // Add new product while keeping previous ones
          }
      
          console.log("Updated Wishlist:", updatedWishlist); // Debugging step
          return updatedWishlist;
        });
      };
    const removeItem=(id)=>{
        setCart((prev)=>prev.filter((item)=>item.id!==id))
    }
    const clearCart = () => {
        setCart([]); // Clears the cart
      };
    
    const DecreaseQuantity=(id)=>{
      setCart((prev)=>
      prev.map(item=>
        item.id===id && item.quantity>1?
        {...item,quantity:item.quantity-1}: item
      ))
    };
    const cartCount = cart.reduce((total, item) => total + item.quantity, null);
    
    return(
        <CartContext.Provider value={{cart,addToCart,removeItem,clearCart,cartCount,DecreaseQuantity,wishlist,toggleWishlist}}>
            {children}
        </CartContext.Provider>
    )
}
