import { gql } from "@apollo/client";

export const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($userId: Int!, $role: String!) {
    updateUserRole(userId: $userId, role: $role) {
      id
      fullName
      email
      role
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($fullName: String!, $email: String!, $password: String!, $role: String!) {
    createUser(fullName: $fullName, email: $email, password: $password, role: $role) {
      id
      fullName
      email
      role
    }
  }
`;
