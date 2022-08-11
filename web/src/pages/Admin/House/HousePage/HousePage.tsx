import HouseCell from 'src/components/Admin/House/HouseCell'

type HousePageProps = {
  id: number
}

const HousePage = ({ id }: HousePageProps) => {
  return <HouseCell id={id} />
}

export default HousePage
