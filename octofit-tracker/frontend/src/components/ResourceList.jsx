import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function displayValue(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (Array.isArray(value)) return value.map(displayValue).join(', ')
  if (typeof value === 'object') {
    return value.name ?? value.email ?? value._id ?? value.id ?? '[record]'
  }
  return String(value)
}

export default function ResourceList({ title, endpoint, columns }) {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(endpoint, { signal: controller.signal })
      .then((collection) => {
        setItems(collection.items)
        setTotal(collection.total)
        setError('')
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load this resource.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [endpoint])

  return (
    <main className="container py-4 py-lg-5">
      <div className="d-flex flex-wrap align-items-baseline justify-content-between gap-2 mb-4">
        <h1 className="h2 mb-0">{title}</h1>
        {!loading && !error && (
          <span className="text-secondary">
            {items.length === total ? `${total} records` : `${items.length} of ${total} records`}
          </span>
        )}
      </div>
      {loading && <p role="status">Loading {title.toLowerCase()}…</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}
      {!loading && !error && items.length === 0 && (
        <div className="alert alert-light border" role="status">
          No {title.toLowerCase()} found.
        </div>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive bg-white border rounded">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                {columns.map(({ key, label }) => <th key={key} scope="col">{label}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? `${endpoint}-${index}`}>
                  {columns.map(({ key, format }) => {
                    const value = item[key]
                    return (
                      <td key={key}>
                        {format ? format(value) : displayValue(value)}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
