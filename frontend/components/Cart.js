import React, {useRef} from "react";
import CartStyles from "./styles/CartStyles";
import {useUser} from "./User";
import Supreme from "./styles/Supreme";
import CartItem from "./CartItem";
import {formatMoney} from "../lib/formatMoney";
import calcTotalPrice from "../lib/calcTotalPrice";
import {useCart} from "../lib/CartStateProvider";
import styled from "styled-components";
import CloseButton from "./styles/CloseButton";
import RemoveFromCart from "./RemoveFromCart";
import CheckoutForm from "./Checkout";
import Checkout from "./Checkout";

const Backdrop = styled.button`
  cursor: pointer;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  z-index: 2;
  transform: translateX(100%);
  ${(props) => props.open && `transform: translateX(0);`};
`

const Cart = props => {
    const {user} = useUser()
    const {open, openCart, closeCart} = useCart()
    const cart = useRef()

    if (!user) return null

    return (
        <div>
            <CartStyles ref={cart} open={open} aria-hidden={!open} id="cart" aria-labelledby="my-cart">
                <header>
                    <Supreme>{user.name}'s Cart</Supreme>
                    <CloseButton onClick={closeCart}>&times;</CloseButton>
                </header>
                <ul>
                    {user.cart.map(item => <CartItem key={item.id} cartItem={item}/>)}
                </ul>

                <footer>
                    <p>{formatMoney(calcTotalPrice(user.cart))}</p>
                    <Checkout />
                </footer>
            </CartStyles>
            <Backdrop onClick={closeCart} open={open}/>
        </div>

    )
}

export default Cart