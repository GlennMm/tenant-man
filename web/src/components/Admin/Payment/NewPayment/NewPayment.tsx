import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PaymentForm from 'src/components/Admin/Payment/PaymentForm'

const CREATE_PAYMENT_MUTATION = gql`
  mutation CreatePaymentMutation($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      id
    }
  }
`

const NewPayment = () => {
  const [createPayment, { loading, error }] = useMutation(CREATE_PAYMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Payment created')
      navigate(routes.adminPayments())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, { invoiceId: parseInt(input.invoiceId), houseId: parseInt(input.houseId), userId: parseInt(input.userId), })
    createPayment({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Payment</h2>
      </header>
      <div className="rw-segment-main">
        <PaymentForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPayment
