import { gql } from "@apollo/client";


export const GET_PRODUCTS = gql`

    query GetProducts {

        products {

            id

            name

            price

            quantity

            category {

                id

                name

            }

        }

    }

`;


export const GET_PRODUCT_BY_ID = gql`

    query GetProductById(
        $id: Int!
    ) {

        product(
            id: $id
        ) {

            id

            name

            description

            price

            quantity

            category {

                id

                name

            }

        }

    }

`;