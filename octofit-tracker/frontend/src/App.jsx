import { Link, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl } from './api.js'
import './App.css'

const sections = [
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function Overview() {
  return (
    <main className="container py-5">
      <section className="overview-intro">
        <p className="text-uppercase fw-semibold text-success mb-3">OctoFit Tracker</p>
        <h1 className="display-4 fw-bold mb-3">Make every session count.</h1>
        <p className="lead text-secondary mb-0">
          Track activity, team progress, and personalized workouts in one place.
        </p>
        <div className="api-status mt-4">
          <span className="status-dot" aria-hidden="true" />
          <span className="fw-semibold">API tier</span>
          <code>{apiBaseUrl}</code>
        </div>
        <nav aria-label="Tracker sections" className="overview-links mt-4">
          {sections.map(({ label, path }) => (
            <Link className="btn btn-success me-2 mb-2" key={path} to={path}>
              View {label}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg bg-white border-bottom px-3 px-lg-5 py-3">
        <Link className="navbar-brand d-flex align-items-center gap-3 mb-0" to="/">
          <img src={octofitLogo} alt="" width="42" height="42" />
          <span className="fw-bold">OctoFit Tracker</span>
        </Link>
        <nav aria-label="Main navigation" className="navbar-nav flex-row flex-wrap ms-lg-auto">
          {sections.map(({ label, path }) => (
            <NavLink
              className={({ isActive }) =>
                `nav-link px-2${isActive ? ' active fw-semibold' : ''}`
              }
              key={path}
              to={path}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
