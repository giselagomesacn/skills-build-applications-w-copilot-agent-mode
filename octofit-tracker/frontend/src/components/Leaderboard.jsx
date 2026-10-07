import ResourceList from './ResourceList.jsx'

const columns = [
  { key: 'user', label: 'User' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
  { key: 'period', label: 'Period' },
]

export default function Leaderboard() {
  return <ResourceList title="Leaderboard" endpoint="/api/leaderboard/" columns={columns} />
}
