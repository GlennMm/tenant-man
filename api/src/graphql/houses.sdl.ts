export const schema = gql`
  type House {
    id: Int!
    address: String!
    no_rooms: Int!
    users: [User]!
    payments: [Payment]!
  }

  type Query {
    houses: [House!]! @requireAuth
    house(id: Int!): House @requireAuth
  }

  input CreateHouseInput {
    address: String!
    no_rooms: Int!
  }

  input UpdateHouseInput {
    address: String
    no_rooms: Int
  }

  type Mutation {
    createHouse(input: CreateHouseInput!): House! @requireAuth
    updateHouse(id: Int!, input: UpdateHouseInput!): House! @requireAuth
    deleteHouse(id: Int!): House! @requireAuth
  }
`
