import type { FindPayments } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Payments from 'src/components/Admin/Payment/Payments'

export const QUERY = gql`
  query FindPayments {
    payments {
      id
      amount
      invoiceId
      houseId
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No payments yet. '}
      <Link
        to={routes.adminNewPayment()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ payments }: CellSuccessProps<FindPayments>) => {
  return <Payments payments={payments} />
}
