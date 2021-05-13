import {gql} from "@apollo/client/core";
import {useQuery} from "@apollo/client";
import DisplayError from "./ErrorMessage";
import PriceTag from "./styles/PriceTag";
import {formatMoney} from "../lib/formatMoney";
import ItemStyles from "./styles/ItemStyles";
import Head from "next/head";
import styled from "styled-components";

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  align-items: flex-start;
  max-width: var(--maxWidth);
  gap: 2rem;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const SINGLE_PRODUCT_QUERY = gql`
    query SINGLE_PRODUCT_QUERY(
        $id: ID!
    ) {
        Product(where: {id: $id}) {
            id
            name
            description
            price
            photo {
                image {
                    publicUrlTransformed
                }
            }

        }
    }
`

const SingleProduct = ({id}) => {
    const {data, error, loading} = useQuery(SINGLE_PRODUCT_QUERY, {
        variables: {id}
    })

    console.log({data, error, loading});

    if (loading) return <p>Loading...</p>;
    if (error) return <DisplayError error={error}/>;

    const {Product} = data

    return (
        <ProductStyles>
            <Head>
                <title>{Product.name} | Sick Fits</title>
                <meta name="description" content={Product.description} />
            </Head>
            <img src={Product?.photo?.image?.publicUrlTransformed} alt={Product?.photo?.altText}/>

            <div className="details">
                <h2>{Product.name}</h2>
                <p>{Product.description}</p>
                <PriceTag>{formatMoney(Product.price)}</PriceTag>
            </div>
        </ProductStyles>
    )
}

export default SingleProduct;