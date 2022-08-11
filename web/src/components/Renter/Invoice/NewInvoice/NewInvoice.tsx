import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import InvoiceForm from 'src/components/Renter/Invoice/InvoiceForm'

const CREATE_INVOICE_MUTATION = gql`
  mutation CreateInvoiceMutation($input: CreateInvoiceInput!) {
    createInvoice(input: $input) {
      id
    }
  }
`

const NewInvoice = () => {
  const [createInvoice, { loading, error }] = useMutation(CREATE_INVOICE_MUTATION, {
    onCompleted: () => {
      toast.success('Invoice created')
      navigate(routes.renterInvoices())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId), })
    createInvoice({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Invoice</h2>
      </header>
      <div className="rw-segment-main">
        <InvoiceForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewInvoice