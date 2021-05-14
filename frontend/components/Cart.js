import React from "react";
import CartStyles from "./styles/CartStyles";
import {useUser} from "./User";
import Supreme from "./styles/Supreme";
import CartItem from "./CartItem";
import {formatMoney} from "../lib/formatMoney";
import calcTotalPrice from "../lib/calcTotalPrice";
import {useCart} from "../lib/CartStateProvider";
import styled from "styled-components";
import CloseButton from "./styles/CloseButton";

const Button = styled.button`
  cursor: pointer;
`

const Cart = props => {
    const {user} = useUser()
    const {open, closeCart} = useCart()

    if (!user) return null

    return (
        <CartStyles open={open}>
            <header>
                <Supreme>{user.name}'s Cart</Supreme>
                <CloseButton onClick={closeCart}>&times;</CloseButton>
            </header>
            <ul>
                {user.cart.map(item => <CartItem key={item.id} cartItem={item} />)}
            </ul>

            <footer>
                <p>{formatMoney(calcTotalPrice(user.cart))}</p>
            </footer>
        </CartStyles>
    )
}

export default Cart