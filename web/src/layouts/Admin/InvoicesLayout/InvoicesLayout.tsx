import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type InvoiceLayoutProps = {
  children: React.ReactNode
}

const InvoicesLayout = ({ children }: InvoiceLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.adminInvoices()}
            className="rw-link"
          >
            Invoices
          </Link>
        </h1>
        <Link
          to={routes.adminNewInvoice()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Invoice
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default InvoicesLayout
