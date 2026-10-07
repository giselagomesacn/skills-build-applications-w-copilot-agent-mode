import { Link, Navigate, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import './App.css'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

function Overview() {
  return (
    <main className="container-fluid px-4 px-lg-5 py-5">
      <section className="overview-intro">
        <p className="text-uppercase fw-semibold text-success mb-3">OctoFit Tracker</p>
        <h1 className="display-4 fw-bold mb-3">Make every session count.</h1>
        <p className="lead text-secondary mb-0">
          Your training dashboard is ready to connect to the OctoFit API.
        </p>
        <div className="api-status mt-5">
          <span className="status-dot" aria-hidden="true" />
          <span className="fw-semibold">API tier</span>
          <code>{apiBaseUrl}</code>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      <header className="navbar bg-white border-bottom px-4 px-lg-5 py-3">
        <Link className="navbar-brand d-flex align-items-center gap-3 mb-0" to="/">
          <img src={octofitLogo} alt="" width="42" height="42" />
          <span className="fw-bold">OctoFit Tracker</span>
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
