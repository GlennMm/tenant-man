import type { FindPaymentById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Payment from 'src/components/Admin/Payment/Payment'

export const QUERY = gql`
  query FindPaymentById($id: Int!) {
    payment: payment(id: $id) {
      id
      amount
      invoiceId
      houseId
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Payment not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ payment }: CellSuccessProps<FindPaymentById>) => {
  return <Payment payment={payment} />
}
