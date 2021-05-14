import React from "react";
import styled from "styled-components";
import {formatMoney} from "../lib/formatMoney";
import calcTotalPrice from "../lib/calcTotalPrice";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGray);
  display: grid;
  grid-template-columns: auto 1fr auto;

  img {
    margin-right: 1rem;
  }

  h3, p {
    margin: 0;
  }
`

const CartItem = ({cartItem}) => {

    console.log(cartItem);
    const {product} = cartItem

    if (!product) return null

    return (
        <CartItemStyles>
            <img
                width="100"
                src={product.photo.image.publicUrlTransformed}
                alt={product.name}/>

            <div>
                <h3>{product.name}</h3>
                <p>
                    {formatMoney(product.price * cartItem.quantity)}
                    &nbsp;-&nbsp;
                    <em>{cartItem.quantity} &times; {formatMoney(product.price)} each</em>
                </p>
            </div>
        </CartItemStyles>
    )
}

export default CartItem