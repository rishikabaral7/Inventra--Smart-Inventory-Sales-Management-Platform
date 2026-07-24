import { gql } from "@apollo/client";

export const GET_DASHBOARD = gql`
  query GetDashboard {
    dashboard {
      totalProducts
      totalCategories
      totalSales
      totalInventoryQuantity
      totalInventoryValue

      recentSales {
        id
        invoiceNumber
        totalAmount
      }

      lowStockProducts {
        id
        name
        quantity
      }
    }
  }
`;