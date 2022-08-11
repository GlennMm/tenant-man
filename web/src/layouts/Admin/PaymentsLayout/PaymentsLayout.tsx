import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type PaymentLayoutProps = {
  children: React.ReactNode
}

const PaymentsLayout = ({ children }: PaymentLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.adminPayments()}
            className="rw-link"
          >
            Payments
          </Link>
        </h1>
        <Link
          to={routes.adminNewPayment()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Payment
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default PaymentsLayout
