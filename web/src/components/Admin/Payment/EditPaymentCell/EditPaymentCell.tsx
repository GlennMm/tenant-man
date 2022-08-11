import type { EditPaymentById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PaymentForm from 'src/components/Admin/Payment/PaymentForm'

export const QUERY = gql`
  query EditPaymentById($id: Int!) {
    payment: payment(id: $id) {
      id
      amount
      invoiceId
      houseId
      userId
    }
  }
`
const UPDATE_PAYMENT_MUTATION = gql`
  mutation UpdatePaymentMutation($id: Int!, $input: UpdatePaymentInput!) {
    updatePayment(id: $id, input: $input) {
      id
      amount
      invoiceId
      houseId
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ payment }: CellSuccessProps<EditPaymentById>) => {
  const [updatePayment, { loading, error }] = useMutation(UPDATE_PAYMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Payment updated')
      navigate(routes.adminPayments())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { invoiceId: parseInt(input.invoiceId), houseId: parseInt(input.houseId), userId: parseInt(input.userId), })
    updatePayment({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Payment {payment.id}</h2>
      </header>
      <div className="rw-segment-main">
        <PaymentForm payment={payment} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
