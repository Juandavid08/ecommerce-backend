import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    name: String
    lastName: String
    email: String
    userType: String
    createdAt: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type VTEXImage {
    imageUrl: String
    imageText: String
  }

  type VTEXItem {
    itemId: String
    name: String
    images: [VTEXImage]
  }

  type VTEXProduct {
    productId: String
    productName: String
    brand: String
    items: [VTEXItem]
  }

  type Query {
    getUser(id: ID!): User
    login(username: String!, password: String!): AuthPayload
    getVTEXProducts: [VTEXProduct]
  }

  type Mutation {
    registerUser(
      username: String!
      password: String!
      name: String
      lastName: String
      email: String
      userType: String
    ): User

    updateUser(id: ID!, name: String, lastName: String, email: String): User

    logout: String
  }
`;
