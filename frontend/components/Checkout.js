import React, {useState} from "react";
import styled from "styled-components";
import {loadStripe} from "@stripe/stripe-js";
import {CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import SickButton from "./styles/SickButton";
import NProgress from 'nprogress'
import {gql} from "@apollo/client/core";
import {useMutation} from "@apollo/client";
import {useRouter} from "next/router";
import {useCart} from "../lib/CartStateProvider";
import {CURRENT_USER_QUERY} from "./User";

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

const CREATE_ORDER_MUTATION = gql`
    mutation CREATE_ORDER_MUTATION($token: String!) {
        checkout(token: $token) {
            id
            charge
            total
            items {
                id
                name
            }
        }
    }
`

const CheckoutForm = (props) => {
    const [checkout, {error: graphGLError, loading: graphQLLoading}] = useMutation(CREATE_ORDER_MUTATION, {
        refetchQueries: [{query: CURRENT_USER_QUERY}]
    })
    const router = useRouter()
    const {closeCart} = useCart()
    const [errorMessage, setErrorMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        NProgress.start()

        const {error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if (error) {
            setErrorMessage(error)
            NProgress.done()

            return
        }

        const order = await checkout({
            variables: {token: paymentMethod.id}
        })


        router.push({
            pathname: `/orders/[id]`,
            query: {id: order.data.checkout.id}
        })

        closeCart()

        setLoading(false)
        NProgress.done()
    }
    return (
        <CheckoutFormStyles onSubmit={handleSubmit}>
            {errorMessage && <p style={{fontSize: '12px', color: "red"}}>{errorMessage.message}</p>}
            {graphGLError && <p style={{fontSize: '12px', color: "red"}}>{graphGLError.message}</p>}
            <CardElement/>
            <SickButton>Check Out Now</SickButton>
        </CheckoutFormStyles>
    )
};

export default function Checkout() {
    return <Elements stripe={stripeLib}>
        <CheckoutForm/>
    </Elements>
}