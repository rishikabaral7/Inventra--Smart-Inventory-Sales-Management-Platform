import { gql } from "@apollo/client";

export const CREATE_SUPPLIER = gql`
  mutation CreateSupplier($supplierInput: SupplierInput!) {
    createSupplier(supplierInput: $supplierInput) {
      id
      name
      email
      phone
      address
    }
  }
`;

export const UPDATE_SUPPLIER = gql`
  mutation UpdateSupplier(
    $supplierId: Int!
    $supplierInput: SupplierInput!
  ) {
    updateSupplier(
      supplierId: $supplierId
      supplierInput: $supplierInput
    ) {
      id
      name
      email
      phone
      address
    }
  }
`;

export const DELETE_SUPPLIER = gql`
  mutation DeleteSupplier($supplierId: Int!) {
    deleteSupplier(supplierId: $supplierId)
  }
`;