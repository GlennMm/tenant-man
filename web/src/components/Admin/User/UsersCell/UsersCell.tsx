import type { FindUsers } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Users from 'src/components/Admin/User/Users'

export const QUERY = gql`
  query FindUsers {
    users {
      id
      email
      name
      house {
        address
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No users yet. '}
      <Link to={routes.adminNewUser()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error, errorCode }: CellFailureProps) => {
  console.log(error, errorCode)
  return <div className="rw-cell-error">{error.message}</div>
}

export const Success = ({ users }: CellSuccessProps<FindUsers>) => {
  return <Users users={users} />
}
