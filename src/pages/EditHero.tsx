import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HeroForm from '../components/HeroForm'
import { useAuth } from '../hooks/useAuth'
import * as heroApi from '../api/heroApi'
import { Hero } from '../types/Hero'

export default function EditHero() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { token } = useAuth()
  const [hero, setHero] = useState<Hero | null>(null)

  useEffect(() => {
    if (id) {
      heroApi.fetchHero(id).then(setHero)
    }
  }, [id])

  const handleSubmit = async (formData: FormData) => {
    if (!id) return
    try {
      await heroApi.updateHero(id, formData, token || undefined)
      navigate('/')
    } catch (err) {
      console.error('Failed to update hero:', err)
      // TODO: Show error to user
    }
  }

  if (!hero) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Modifier {hero.nom}</h1>
      <HeroForm initialValues={hero} onSubmit={handleSubmit} />
    </div>
  )
}