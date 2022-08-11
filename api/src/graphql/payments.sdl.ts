export const schema = gql`
  type Payment {
    id: Int!
    amount: Int!
    invoice: Invoice
    invoiceId: Int
    house: House!
    houseId: Int!
    user: User!
    userId: Int!
  }

  type Query {
    payments: [Payment!]! @requireAuth
    payment(id: Int!): Payment @requireAuth
  }

  input CreatePaymentInput {
    amount: Int!
    invoiceId: Int
    houseId: Int!
    userId: Int!
  }

  input UpdatePaymentInput {
    amount: Int
    invoiceId: Int
    houseId: Int
    userId: Int
  }

  type Mutation {
    createPayment(input: CreatePaymentInput!): Payment! @requireAuth
    updatePayment(id: Int!, input: UpdatePaymentInput!): Payment! @requireAuth
    deletePayment(id: Int!): Payment! @requireAuth
  }
`
