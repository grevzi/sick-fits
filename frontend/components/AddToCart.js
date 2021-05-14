import React from "react";
import {useCart} from "../lib/CartStateProvider";
import {useMutation} from "@apollo/client";
import {gql} from "@apollo/client/core";
import {CURRENT_USER_QUERY} from "./User";

const ADD_TO_CART_MUTATION = gql`
    mutation ADD_TO_CART_MUTATION($id: ID!) {
        addToCart(productId: $id) {
            id
        }
    }
`

const AddToCart = ({id, children}) => {
    const [addToCart, {error, loading}] = useMutation(ADD_TO_CART_MUTATION, {
        variables: {id},
        refetchQueries: [{query: CURRENT_USER_QUERY}]
    })
    const {open, openCart} = useCart()

    const handleAddToCart = async () => {
        const res = await addToCart().catch(console.error)
        if(res.data) setTimeout(openCart, 1000)
    }

    if (error) alert(error.message)

    return (
        <button type="button" disabled={loading} onClick={handleAddToCart}>Add{loading && 'ing'} To Cart 🛒</button>
    )
}

export default AddToCart