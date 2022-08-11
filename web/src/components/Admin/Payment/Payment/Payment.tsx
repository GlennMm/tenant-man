import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_PAYMENT_MUTATION = gql`
  mutation DeletePaymentMutation($id: Int!) {
    deletePayment(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Payment = ({ payment }) => {
  const [deletePayment] = useMutation(DELETE_PAYMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Payment deleted')
      navigate(routes.adminPayments())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete payment ' + id + '?')) {
      deletePayment({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Payment {payment.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{payment.id}</td>
            </tr><tr>
              <th>Amount</th>
              <td>{payment.amount}</td>
            </tr><tr>
              <th>Invoice id</th>
              <td>{payment.invoiceId}</td>
            </tr><tr>
              <th>House id</th>
              <td>{payment.houseId}</td>
            </tr><tr>
              <th>User id</th>
              <td>{payment.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditPayment({ id: payment.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(payment.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Payment
