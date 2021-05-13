import React, {useEffect} from "react";
import {useMutation, useQuery} from "@apollo/client";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import Router from "next/router";
import useForm from "../lib/useForm";
import {gql} from "@apollo/client/core";
import {ALL_PRODUCTS_QUERY} from "./Products";

const SINGLE_PRODUCT_QUERY = gql`
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

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION(
        $id: ID!
        $name: String
        $description: String
        $price: Int
    ){
        updateProduct(
            id: $id
            data: {
                name: $name
                description: $description
                price: $price
            }
        ) {
            id
            name
            description
            price
        }
    }
`


const UpdateProduct = ({id}) => {
    const {data, error, loading} = useQuery(SINGLE_PRODUCT_QUERY, {
        variables: {id}
    })

    const [updateProduct, {
        data   : updateDate,
        error  : updateError,
        loading: updateLoading
    }] = useMutation(UPDATE_PRODUCT_MUTATION, {
        refetchQueries: [{query: ALL_PRODUCTS_QUERY}]
    })

    const {inputs, setInputs, handleChange, clearForm} = useForm(data?.Product)

    if (loading) return <p>Loading...</p>;

    return (
        <Form onSubmit={async e => {
            e.preventDefault()
            const res = await updateProduct({
                variables: {
                    id,
                    ...inputs
                }
            })
            clearForm()
            Router.push({
                pathname: `/product/${res.data.updateProduct.id}`
            })

        }}>
            <DisplayError error={error || updateError}/>
            <fieldset disabled={updateLoading} aria-busy={updateLoading}>

                <label htmlFor="name">
                    Name
                    <input type="text"
                           id="name"
                           name="name"
                           placeholder="name"
                           value={inputs.name}
                           onChange={handleChange}
                    />
                </label>

                <label htmlFor="price">
                    Price
                    <input type="number"
                           id="price"
                           name="price"
                           placeholder="price"
                           value={inputs.price}
                           onChange={handleChange}
                    />
                </label>

                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        name="description"
                        placeholder="description"
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Update Product</button>
            </fieldset>

        </Form>
    )
}

export default UpdateProduct