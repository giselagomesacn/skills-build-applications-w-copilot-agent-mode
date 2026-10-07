import ResourceList from './ResourceList.jsx'

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'description', label: 'Description' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'activities', label: 'Activities' },
  { key: 'durationMinutes', label: 'Duration (min)' },
]

export default function Workouts() {
  return <ResourceList title="Workouts" endpoint="/api/workouts/" columns={columns} />
}
