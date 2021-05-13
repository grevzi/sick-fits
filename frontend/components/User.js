import {useQuery} from "@apollo/client";
import {gql} from "@apollo/client/core";

export const CURRENT_USER_QUERY = gql`
    query {
        authenticatedItem {
            ... on User {
                id
                name
                email
#                TODO query the cart
            }
        }
     }
`

export const useUser = () => {
    const {data} = useQuery(CURRENT_USER_QUERY);

    return data?.authenticatedItem;
}