import { gql } from "@apollo/client";

export const GET_PURCHASES = gql`
  query GetPurchases {
    purchases {
      id
      invoiceNumber
      supplierId
      totalAmount

      items {
        id
        productId
        quantity
        price
      }
    }
  }
`;

export const GET_PURCHASE = gql`
  query GetPurchase($purchaseId: Int!) {
    purchase(purchaseId: $purchaseId) {
      id
      invoiceNumber
      supplierId
      totalAmount

      items {
        id
        productId
        quantity
        price
      }
    }
  }
`;