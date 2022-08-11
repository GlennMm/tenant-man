import { Navbar, Group, ScrollArea, createStyles } from '@mantine/core'
import {
  IconGauge,
  IconChartInfographic,
  IconFileInvoice,
  IconCurrencyDollar,
  IconHome,
  IconUsers,
} from '@tabler/icons'

import { Logo } from '../../components/Util/Logo'
import { LinksGroup } from '../../components/Util/NavbarLinksGroup'
import { UserButton } from '../../components/Util/UserButton'

const mockdata = [
  {
    label: 'Dashboard',
    icon: IconGauge,
    initiallyOpened: true,
    links: [{ label: 'Home', link: '/admin/dashboard' }],
  },
  {
    label: 'Tenants',
    icon: IconUsers,
    links: [
      { label: 'Create User', link: '/admin/users/new' },
      { label: 'Users List', link: '/admin/users' },
    ],
  },
  {
    label: 'Houses',
    icon: IconHome,
    links: [
      { label: 'Create House', link: '/admin/houses/new' },
      { label: 'Houses List', link: '/admin/houses' },
    ],
  },
  {
    label: 'Payments',
    icon: IconCurrencyDollar,
    links: [
      { label: 'Add Payment', link: '/admin/payments/new' },
      { label: 'Payment Records', link: '/admin/payments' },
    ],
  },
  {
    label: 'Invoices',
    icon: IconFileInvoice,
    links: [
      { label: 'Create Invoice', link: '/admin/invoices/new' },
      { label: 'Invoices', link: '/admin/invoices' },
    ],
  },
  {
    label: 'Reports',
    icon: IconChartInfographic,
    links: [
      { label: 'Tenants', link: '/admin/invoices/new' },
      { label: 'Houses', link: '/admin/invoices' },
      { label: 'Payments', link: '/admin/invoices' },
      { label: 'Invoices', link: '/admin/invoices' },
    ],
  },
  // { label: 'Analytics', icon: IconPresentationAnalytics },
  // { label: 'Contracts', icon: IconFileAnalytics },
  // { label: 'Settings', icon: IconAdjustments },
]

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}))

type DashLayoutProps = {
  children: React.ReactNode
}

const HousesLayout = ({ children }: DashLayoutProps) => {
  const { classes } = useStyles()
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ))

  return (
    <div style={{ display: 'flex' }}>
      <Navbar
        style={{ height: 100 + 'vh' }}
        width={{ sm: 300 }}
        p="md"
        className={classes.navbar}
      >
        <Navbar.Section className={classes.header}>
          <Group position="apart">
            <Logo width={120} />
            {/* <Code sx={{ fontWeight: 700 }}>v3.1.2</Code> */}
          </Group>
        </Navbar.Section>

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{links}</div>
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <UserButton
            image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            name="Ann Nullpointer"
            email="anullpointer@yahoo.com"
          />
        </Navbar.Section>
      </Navbar>
      <main
        style={{
          flex: 1,
          backgroundColor: '#fff',
          padding: 10 + 'px',
          height: 100 + '%',
        }}
      >
        {children}
      </main>
    </div>
  )
}

export default HousesLayout
