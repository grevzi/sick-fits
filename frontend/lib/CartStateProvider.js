import React, {createContext, useContext, useState} from "react";

const CartContext = createContext()
const CartProvider = CartContext.Provider

export const useCart = () => {
    return useContext(CartContext)
}

const CartStateProvider = ({children}) => {

    const [open, setOpen] = useState(false)

    const openCart = () => setOpen(true)
    const closeCart = () => setOpen(false)
    const toggleCart = () => setOpen(prev => !prev)

    return (
        <CartProvider value={{
            open,
            setOpen,
            openCart,
            closeCart,
            toggleCart,
        }}>{children}</CartProvider>
    )
}

export default CartStateProvider