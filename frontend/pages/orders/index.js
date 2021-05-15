import React from "react";
import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import ErrorMessage from "../../components/ErrorMessage";
import OrderStyles from "../../components/styles/OrderStyles";
import OrderItemStyles from "../../components/styles/OrderItemStyles";
import Head from "next/head";
import {formatMoney} from "../../lib/formatMoney";
import styled from "styled-components";
import Link from "next/link";

const USER_ORDERS_QUERY = gql`
    query USER_ORDERS_QUERY {
        allOrders {
            id
            charge
            total
            items {
                id
                name
                description
                price
                quantity
                photo {
                    image {
                        publicUrlTransformed
                    }
                }
            }
        }
    }
`

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 4rem;
`

const countItemsInAnOrder = (order) => order.items.reduce((rez, item) => rez += item.quantity ,0)

const OrdersPage = () => {
    const {data, error, loading} = useQuery(USER_ORDERS_QUERY)

    if (loading) return <p>Loading...</p>;
    if (error) return <ErrorMessage error={error}/>;

    const {allOrders} = data

    return (
        <OrderStyles>
            <Head>
                <title>Your orders - {allOrders.length} - Sick Fits</title>
            </Head>

            <h2>You have {allOrders.length} orders</h2>
            <OrderUl>
                {allOrders.map(order => (
                    <OrderItemStyles key={order.id}>
                        <Link href={`/orders/${order.id}`}>
                            <a>
                                <div className="order-meta">
                                    <p>{countItemsInAnOrder(order)} Items</p>
                                    <p>{order.items.length} Product{order.items.length > 1 ? 's' : ''}</p>
                                    <p>{formatMoney(order.total)}</p>
                                </div>
                                <div className="images">
                                    {order.items.map(item => <img keu={`image-${item.id}`} src={item.photo.image.publicUrlTransformed} alt={item.name}/>)}
                                </div>
                            </a>
                        </Link>
                    </OrderItemStyles>
                ))}
            </OrderUl>
        </OrderStyles>
    )
}

export default OrdersPage