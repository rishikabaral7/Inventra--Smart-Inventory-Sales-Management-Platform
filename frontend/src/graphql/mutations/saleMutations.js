import { gql } from "@apollo/client";


export const CREATE_SALE = gql`

    mutation CreateSale(
        $saleInput: SaleInput!
    ){

        createSale(
            saleInput: $saleInput
        ){

            id

            invoiceNumber

            totalAmount

        }

    }

`;