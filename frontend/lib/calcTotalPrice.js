import React from "react";

const calcTotalPrice = cart => {
    return cart.reduce((rez, item) => {
        if(!item.product) return rez
        return rez+=item.product.price*item.quantity
    }, 0)
}

export default calcTotalPrice