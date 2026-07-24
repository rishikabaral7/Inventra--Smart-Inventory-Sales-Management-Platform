import { gql } from "@apollo/client";

export const GET_SUPPLIERS = gql`
  query GetSuppliers {
    suppliers {
      id
      name
      email
      phone
      address
    }
  }
`;

export const GET_SUPPLIER = gql`
  query GetSupplier($supplierId: Int!) {
    supplier(supplierId: $supplierId) {
      id
      name
      email
      phone
      address
    }
  }
`;