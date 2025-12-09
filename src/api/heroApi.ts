import { Hero } from '../types/Hero'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Helper function to handle errors
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'An error occurred')
  }
  return response.json()
}

// Get all heroes with optional search parameters
export async function getHeroes(
  search?: string,
  page: number = 1,
  limit: number = 10
): Promise<{ heroes: Hero[]; total: number }> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })
  if (search) params.append('search', search)

  const response = await fetch(`${API_URL}/heroes?${params}`)
  return handleResponse(response)
}

// Get a single hero by ID
export async function getHeroById(id: string): Promise<Hero> {
  const response = await fetch(`${API_URL}/heroes/${id}`)
  return handleResponse(response)
}

// Create a new hero
export async function createHero(
  heroData: FormData,
  token: string
): Promise<Hero> {
  const response = await fetch(`${API_URL}/heroes`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: heroData, // FormData for multipart/form-data (file upload)
  })
  return handleResponse(response)
}

// Update a hero
export async function updateHero(
  id: string,
  heroData: FormData,
  token: string
): Promise<Hero> {
  const response = await fetch(`${API_URL}/heroes/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: heroData,
  })
  return handleResponse(response)
}

// Delete a hero
export async function deleteHero(id: string, token: string): Promise<void> {
  const response = await fetch(`${API_URL}/heroes/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  return handleResponse(response)
}

// Toggle favorite status
export async function toggleFavorite(
  heroId: string,
  token: string
): Promise<{ isFavorite: boolean }> {
  const response = await fetch(`${API_URL}/heroes/${heroId}/favorite`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  return handleResponse(response)
}

// Get user's favorite heroes
export async function getFavorites(token: string): Promise<Hero[]> {
  const response = await fetch(`${API_URL}/heroes/favorites`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  return handleResponse(response)
}