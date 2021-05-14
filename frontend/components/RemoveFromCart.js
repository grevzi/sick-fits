import React from "react";
import styled from "styled-components";
import {gql} from "@apollo/client/core";
import {useMutation} from "@apollo/client";

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: var(--red);
  }
`

const REMOVE_FROM_CART_MUTATION = gql`
    mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
        deleteCartItem(id: $id) {
            id
        }
    }
`
function update(cache, payload) {
    cache.evict(cache.identify(payload.data.deleteCartItem))
}

const RemoveFromCart = ({id}) => {
    const [removeFromCart, {loading}] = useMutation(REMOVE_FROM_CART_MUTATION, {
        variables: {id},
        update
    })
    return (
        <BigButton onClick={removeFromCart} disabled={loading} type="button" title="Remove this item from cart">&times;</BigButton>
    )
}

export default RemoveFromCart