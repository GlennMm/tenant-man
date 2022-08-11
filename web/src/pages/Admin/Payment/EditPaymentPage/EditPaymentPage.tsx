import EditPaymentCell from 'src/components/Admin/Payment/EditPaymentCell'

type PaymentPageProps = {
  id: number
}

const EditPaymentPage = ({ id }: PaymentPageProps) => {
  return <EditPaymentCell id={id} />
}

export default EditPaymentPage
