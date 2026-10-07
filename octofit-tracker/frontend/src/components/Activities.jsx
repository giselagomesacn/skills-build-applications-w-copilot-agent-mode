import ResourceList from './ResourceList.jsx'

const columns = [
  { key: 'user', label: 'User' },
  { key: 'type', label: 'Activity' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'distanceKilometers', label: 'Distance (km)' },
  { key: 'points', label: 'Points' },
  {
    key: 'completedAt',
    label: 'Completed',
    format: (value) => (value ? new Date(value).toLocaleString() : '—'),
  },
]

export default function Activities() {
  return <ResourceList title="Activities" endpoint="/api/activities/" columns={columns} />
}
