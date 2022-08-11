import type { EditHouseById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import HouseForm from 'src/components/Admin/House/HouseForm'

export const QUERY = gql`
  query EditHouseById($id: Int!) {
    house: house(id: $id) {
      id
      address
      no_rooms
    }
  }
`
const UPDATE_HOUSE_MUTATION = gql`
  mutation UpdateHouseMutation($id: Int!, $input: UpdateHouseInput!) {
    updateHouse(id: $id, input: $input) {
      id
      address
      no_rooms
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ house }: CellSuccessProps<EditHouseById>) => {
  const [updateHouse, { loading, error }] = useMutation(UPDATE_HOUSE_MUTATION, {
    onCompleted: () => {
      toast.success('House updated')
      navigate(routes.adminHouses())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateHouse({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit House {house.id}</h2>
      </header>
      <div className="rw-segment-main">
        <HouseForm house={house} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
