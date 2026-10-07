import ResourceList from './ResourceList.jsx'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
]

export default function Users() {
  return <ResourceList title="Users" endpoint="/api/users/" columns={columns} />
}
