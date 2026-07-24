import { gql } from "@apollo/client";


export const GET_SALES = gql`
    query GetSales {

        sales {

            id

            invoiceNumber

            totalAmount

        }

    }
`;


export const GET_SALE_BY_ID = gql`

    query GetSaleById(
        $id: Int!
    ){

        sale(
            id:$id
        ){

            id

            invoiceNumber

            totalAmount

            items{

                id

                quantity

                price

            }

        }

    }

`;