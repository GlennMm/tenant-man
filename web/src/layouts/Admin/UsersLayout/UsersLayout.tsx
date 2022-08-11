import { Button } from '@mantine/core'

import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type UserLayoutProps = {
  children: React.ReactNode
}

const UsersLayout = ({ children }: UserLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: 15 + 'px',
        }}
      >
        <h2 className="">Tenants List</h2>
        <Link
          to={routes.adminNewUser()}
          style={{ display: 'flex', textDecoration: 'none' }}
        >
          <Button>
            <div className="rw-button-icon">+</div> New User
          </Button>
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default UsersLayout
