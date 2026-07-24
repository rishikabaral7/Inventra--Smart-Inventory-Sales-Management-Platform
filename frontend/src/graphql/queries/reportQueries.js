import { gql } from "@apollo/client";

export const GET_DASHBOARD = gql`
  query GetDashboard {
    dashboard {
      totalProducts
      totalSuppliers
      totalSales
      totalPurchases
      revenue
      purchaseAmount
      inventoryValue

      lowStockProducts {
        id
        name
        quantity
      }
    }
  }
`;