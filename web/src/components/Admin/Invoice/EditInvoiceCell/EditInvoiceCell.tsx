import type { EditInvoiceById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import InvoiceForm from 'src/components/Admin/Invoice/InvoiceForm'

export const QUERY = gql`
  query EditInvoiceById($id: Int!) {
    invoice: invoice(id: $id) {
      id
      amount
      mounth
      year
      userId
    }
  }
`
const UPDATE_INVOICE_MUTATION = gql`
  mutation UpdateInvoiceMutation($id: Int!, $input: UpdateInvoiceInput!) {
    updateInvoice(id: $id, input: $input) {
      id
      amount
      mounth
      year
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ invoice }: CellSuccessProps<EditInvoiceById>) => {
  const [updateInvoice, { loading, error }] = useMutation(UPDATE_INVOICE_MUTATION, {
    onCompleted: () => {
      toast.success('Invoice updated')
      navigate(routes.adminInvoices())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { userId: parseInt(input.userId), })
    updateInvoice({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Invoice {invoice.id}</h2>
      </header>
      <div className="rw-segment-main">
        <InvoiceForm invoice={invoice} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
