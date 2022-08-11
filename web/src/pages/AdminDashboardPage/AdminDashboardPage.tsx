import { MetaTags } from '@redwoodjs/web'

import { StatsGrid } from '../../components/Admin/TopDashboardStats'

const AdminDashboardPage = () => {
  const data = [
    {
      title: 'Revenue',
      icon: 'receipt',
      value: '13,456',
      diff: 34,
    },
    {
      title: 'Profit',
      icon: 'coin',
      value: '4,145',
      diff: -13,
    },
    {
      title: 'Coupons usage',
      icon: 'discount',
      value: '745',
      diff: 18,
    },
    {
      title: 'New customers',
      icon: 'user',
      value: '188',
      diff: -30,
    },
  ]

  return (
    <>
      <MetaTags title="AdminDashboard" description="AdminDashboard page" />

      <StatsGrid data={data} />
    </>
  )
}

export default AdminDashboardPage
