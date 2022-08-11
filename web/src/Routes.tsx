// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import DashboardLayout from 'src/layouts/Admin/DashboardLayout'
import HousesLayout from 'src/layouts/Admin/HousesLayout'
import InvoicesLayout from 'src/layouts/Admin/InvoicesLayout'
import PaymentsLayout from 'src/layouts/Admin/PaymentsLayout'
import UsersLayout from 'src/layouts/Admin/UsersLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={DashboardLayout}>
        <Route path="/admin/dashboard" page={AdminDashboardPage} name="admin/dashboard" />
        <Set wrap={PaymentsLayout}>
          <Route path="/admin/payments/new" page={AdminPaymentNewPaymentPage} name="adminNewPayment" />
          <Route path="/admin/payments/{id:Int}/edit" page={AdminPaymentEditPaymentPage} name="adminEditPayment" />
          <Route path="/admin/payments/{id:Int}" page={AdminPaymentPaymentPage} name="adminPayment" />
          <Route path="/admin/payments" page={AdminPaymentPaymentsPage} name="adminPayments" />
        </Set>
        <Set wrap={InvoicesLayout}>
          <Route path="/admin/invoices/new" page={AdminInvoiceNewInvoicePage} name="adminNewInvoice" />
          <Route path="/admin/invoices/{id:Int}/edit" page={AdminInvoiceEditInvoicePage} name="adminEditInvoice" />
          <Route path="/admin/invoices/{id:Int}" page={AdminInvoiceInvoicePage} name="adminInvoice" />
          <Route path="/admin/invoices" page={AdminInvoiceInvoicesPage} name="adminInvoices" />
        </Set>
        <Set wrap={HousesLayout}>
          <Route path="/admin/houses/new" page={AdminHouseNewHousePage} name="adminNewHouse" />
          <Route path="/admin/houses/{id:Int}/edit" page={AdminHouseEditHousePage} name="adminEditHouse" />
          <Route path="/admin/houses/{id:Int}" page={AdminHouseHousePage} name="adminHouse" />
          <Route path="/admin/houses" page={AdminHouseHousesPage} name="adminHouses" />
        </Set>
        <Set wrap={UsersLayout}>
          <Route path="/admin/users/new" page={AdminUserNewUserPage} name="adminNewUser" />
          <Route path="/admin/users/{id:Int}/edit" page={AdminUserEditUserPage} name="adminEditUser" />
          <Route path="/admin/users/{id:Int}" page={AdminUserUserPage} name="adminUser" />
          <Route path="/admin/users" page={AdminUserUsersPage} name="adminUsers" />
        </Set>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
