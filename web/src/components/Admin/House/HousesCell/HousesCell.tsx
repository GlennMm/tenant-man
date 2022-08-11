import type { FindHouses } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Houses from 'src/components/Admin/House/Houses'

export const QUERY = gql`
  query FindHouses {
    houses {
      id
      address
      no_rooms
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No houses yet. '}
      <Link
        to={routes.adminNewHouse()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ houses }: CellSuccessProps<FindHouses>) => {
  return <Houses houses={houses} />
}
