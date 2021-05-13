import gql from "graphql-tag";
import {useQuery} from "@apollo/client";
import styled from 'styled-components'
import Product from "./Product";
import {perPage} from "../config";

export const ALL_PRODUCTS_QUERY = gql`
    query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
        allProducts(
            skip: $skip
            first: $first
        ) {
            id
            name
            description
            price
            photo {
                id
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`

const ProductListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

const Products = ({page}) => {
    const {data, error, loading} = useQuery(ALL_PRODUCTS_QUERY, {
        variables: {
            skip: (page - 1) * perPage,
            first: perPage
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error {error.message} :(</p>;

    return (
        <div>
            <h2>Products data</h2>
            <ProductListStyles>
                {data?.allProducts?.map(product => <Product key={product.id} product={product}/>)}
            </ProductListStyles>
        </div>
    )
}

export default Products