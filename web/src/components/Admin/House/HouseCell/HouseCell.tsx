import type { FindHouseById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import House from 'src/components/Admin/House/House'

export const QUERY = gql`
  query FindHouseById($id: Int!) {
    house: house(id: $id) {
      id
      address
      no_rooms
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>House not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ house }: CellSuccessProps<FindHouseById>) => {
  return <House house={house} />
}
