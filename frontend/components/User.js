import {useQuery} from "@apollo/client";
import {gql} from "@apollo/client/core";

export const CURRENT_USER_QUERY = gql`
    query {
        authenticatedItem {
            ... on User {
                id
                name
                email
                cart {
                    id
                    quantity
                    product {
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
            }
        }
    }
`

export const useUser = () => {
    const {data, error, loading} = useQuery(CURRENT_USER_QUERY);

    return {
        user: data?.authenticatedItem,
        error,
        loading
    };
}