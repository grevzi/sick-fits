import React from "react";
import {gql} from "@apollo/client/core";
import {useMutation} from "@apollo/client";
import styled from "styled-components";


const Button = styled.button`
  cursor: pointer;
`
const DELETE_PRODUCT = gql`
    mutation DELETE_PRODUCT($id: ID!) {
        deleteProduct(id: $id) {
            id
            name
            description
        }
    }
`

const update = (cache, payload) => {
    cache.evict(cache.identify(payload.data.deleteProduct))
}

const DeleteProductButton = ({id, children}) => {
    const [deleteProduct, {data, error, loading}] = useMutation(DELETE_PRODUCT, {
        variables: {id},
        update: update
    })

    return (
        <Button type="button" disabled={loading} onClick={async () => {
            if (confirm('Are you sure you want to delete this product?')) {
                const rez = await deleteProduct()
            }
        }}>
            {children}
        </Button>
    )
}

export default DeleteProductButton