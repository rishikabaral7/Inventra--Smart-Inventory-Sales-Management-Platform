import { gql } from "@apollo/client";

export const CREATE_PURCHASE = gql`
  mutation CreatePurchase($purchaseInput: PurchaseInput!) {
    createPurchase(
      purchaseInput: $purchaseInput
    ) {
      id
      invoiceNumber
      supplierId
      totalAmount
    }
  }
`;