export const schema = gql`
  type User {
    id: Int!
    email: String!
    name: String!
    payments: [Payment]!
    invoices: [Invoice]!
    house: House
    houseId: Int
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String!
    houseId: Int
  }

  input UpdateUserInput {
    email: String
    name: String
    houseId: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
