import { useState } from 'react'

import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  ActionIcon,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconEdit,
  IconTrash,
  IconListDetails,
} from '@tabler/icons'
import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/User/UsersCell'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

// INFO: Mantine stuff

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}))

interface RowData {
  name: string
  email: string
  address: string
}

interface TableSortProps {
  data: RowData[]
}

interface ThProps {
  children: React.ReactNode
  reversed: boolean
  sorted: boolean
  onSort(): void
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles()
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  )
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) =>
      typeof item[key] == 'string'
        ? item[key].toLowerCase().includes(query)
        : false
    )
  )
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload

  if (!sortBy) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy])
      }

      return a[sortBy].localeCompare(b[sortBy])
    }),
    payload.search
  )
}

const UsersList = ({ users }) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  const info = users.map((o) => ({
    id: o.id,
    name: o.name,
    email: o.email,
    address: o.house?.address || 'not assigned',
  }))

  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(info)
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(info, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(
      sortData(info, { sortBy, reversed: reverseSortDirection, search: value })
    )
  }

  const rows = sortedData.map((row) => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td>{row.email}</td>
      <td>{row.address}</td>
      <td>
        <nav className="rw-table-actions">
          <Link
            to={routes.adminUser({ id: row.id })}
            title={'Show user ' + row.id + ' detail'}
          >
            <ActionIcon style={{ marginRight: 20 + 'px' }}>
              <IconListDetails />
            </ActionIcon>
          </Link>
          <Link
            to={routes.adminEditUser({ id: row.id })}
            title={'Edit user ' + row.id}
          >
            <ActionIcon style={{ marginRight: 20 + 'px' }}>
              <IconEdit />
            </ActionIcon>
          </Link>
          <ActionIcon
            style={{ marginRight: 20 + 'px' }}
            type="button"
            title={'Delete user ' + row.id}
            onClick={() => onDeleteClick(row.id)}
          >
            <IconTrash color="red" />
          </ActionIcon>
        </nav>
      </td>
    </tr>
  ))

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={16} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'email'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('email')}
            >
              Email
            </Th>
            <Th
              sorted={sortBy === 'address'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('address')}
            >
              Address
            </Th>
            <Th sorted={sortBy === 'name'}>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(users[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  )

  // return (
  //   <div className="rw-segment rw-table-wrapper-responsive">
  //     <table className="rw-table">
  //       <thead>
  //         <tr>
  //           <th>Id</th>
  //           <th>Email</th>
  //           <th>Name</th>
  //           <th>House id</th>
  //           <th>&nbsp;</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {users.map((user) => (
  //           <tr key={user.id}>
  //             <td>{truncate(user.id)}</td>
  //             <td>{truncate(user.email)}</td>
  //             <td>{truncate(user.name)}</td>
  //             <td>{truncate(user.houseId)}</td>
  //             <td>
  // <nav className="rw-table-actions">
  //   <Link
  //     to={routes.adminUser({ id: user.id })}
  //     title={'Show user ' + user.id + ' detail'}
  //     className="rw-button rw-button-small"
  //   >
  //     Show
  //   </Link>
  //   <Link
  //     to={routes.adminEditUser({ id: user.id })}
  //     title={'Edit user ' + user.id}
  //     className="rw-button rw-button-small rw-button-blue"
  //   >
  //     Edit
  //   </Link>
  //   <button
  //     type="button"
  //     title={'Delete user ' + user.id}
  //     className="rw-button rw-button-small rw-button-red"
  //     onClick={() => onDeleteClick(user.id)}
  //   >
  //     Delete
  //   </button>
  // </nav>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // )
}

export default UsersList
