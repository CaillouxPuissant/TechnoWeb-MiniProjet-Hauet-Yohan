import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import HeroDetails from './pages/HeroDetails'
import NavBar from './components/NavBar'

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/hero/:id" element={<HeroDetails />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  )
}
