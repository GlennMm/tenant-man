import EditHouseCell from 'src/components/Admin/House/EditHouseCell'

type HousePageProps = {
  id: number
}

const EditHousePage = ({ id }: HousePageProps) => {
  return <EditHouseCell id={id} />
}

export default EditHousePage
