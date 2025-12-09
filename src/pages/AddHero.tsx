import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeroForm from '../components/HeroForm'
import { useAuth } from '../hooks/useAuth'
import * as heroApi from '../api/heroApi'

export default function AddHero() {
  const navigate = useNavigate()
  const { token } = useAuth()

  const handleSubmit = async (formData: FormData) => {
    try {
      await heroApi.createHero(formData, token || undefined)
      navigate('/')
    } catch (err) {
      console.error('Failed to create hero:', err)
      // TODO: Show error to user
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Ajouter un héros</h1>
      <HeroForm onSubmit={handleSubmit} />
    </div>
  )
}