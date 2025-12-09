const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

interface LoginCredentials {
  username: string
  password: string
}

interface RegisterData extends LoginCredentials {
  email: string
  role?: string
}

interface AuthResponse {
  token: string
  user: {
    id: string
    username: string
    email: string
    role: string
  }
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to login')
  }

  return response.json()
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to register')
  }

  return response.json()
}

export async function validateToken(token: string): Promise<{ valid: boolean }> {
  const response = await fetch(`${API_URL}/auth/validate`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    return { valid: false }
  }

  return { valid: true }
}