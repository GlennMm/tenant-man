export const schema = gql`
  type Invoice {
    id: Int!
    amount: Int!
    mounth: Int!
    year: Int!
    user: User!
    userId: Int!
    payments: [Payment]!
  }

  type Query {
    invoices: [Invoice!]! @requireAuth
    invoice(id: Int!): Invoice @requireAuth
  }

  input CreateInvoiceInput {
    amount: Int!
    mounth: Int!
    year: Int!
    userId: Int!
  }

  input UpdateInvoiceInput {
    amount: Int
    mounth: Int
    year: Int
    userId: Int
  }

  type Mutation {
    createInvoice(input: CreateInvoiceInput!): Invoice! @requireAuth
    updateInvoice(id: Int!, input: UpdateInvoiceInput!): Invoice! @requireAuth
    deleteInvoice(id: Int!): Invoice! @requireAuth
  }
`
