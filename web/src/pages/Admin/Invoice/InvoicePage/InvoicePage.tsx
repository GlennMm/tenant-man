import InvoiceCell from 'src/components/Admin/Invoice/InvoiceCell'

type InvoicePageProps = {
  id: number
}

const InvoicePage = ({ id }: InvoicePageProps) => {
  return <InvoiceCell id={id} />
}

export default InvoicePage
