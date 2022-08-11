import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import HouseForm from 'src/components/Admin/House/HouseForm'

const CREATE_HOUSE_MUTATION = gql`
  mutation CreateHouseMutation($input: CreateHouseInput!) {
    createHouse(input: $input) {
      id
    }
  }
`

const NewHouse = () => {
  const [createHouse, { loading, error }] = useMutation(CREATE_HOUSE_MUTATION, {
    onCompleted: () => {
      toast.success('House created')
      navigate(routes.adminHouses())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createHouse({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New House</h2>
      </header>
      <div className="rw-segment-main">
        <HouseForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewHouse
