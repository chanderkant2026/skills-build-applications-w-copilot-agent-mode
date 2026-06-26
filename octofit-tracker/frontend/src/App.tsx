import { Routes, Route, Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p>Modern multi-tier fitness tracker with React, Vite, Express, and MongoDB.</p>
      <Link to="/about" className="btn btn-primary">
        About
      </Link>
    </div>
  )
}

function About() {
  return (
    <div className="container py-5">
      <h1>About OctoFit</h1>
      <p>Track workouts, teams, and progress securely in a modern web app.</p>
      <Link to="/" className="btn btn-secondary">
        Home
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}
