const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

if (codespaceName && !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(codespaceName)) {
  throw new Error('VITE_CODESPACE_NAME must be a valid Codespaces name.')
}

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getCollection(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, total: payload.length }
  }

  const items = Array.isArray(payload?.results)
    ? payload.results
    : Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.data?.results)
        ? payload.data.results
        : null

  if (!items) {
    throw new TypeError('The API response must be an array or a paginated collection.')
  }
  if (!items.every((item) => item && typeof item === 'object' && !Array.isArray(item))) {
    throw new TypeError('The API collection must contain record objects.')
  }

  return {
    items,
    total: Number.isFinite(payload.count) ? payload.count : items.length,
  }
}

export async function fetchCollection(path, { signal } = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, { signal })
  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload?.error || `Request failed with status ${response.status}.`)
  }

  return getCollection(payload)
}
