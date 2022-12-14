import apiClient from "./api";

export const login = async (email, password) => {
  return await apiClient.post('/login', {
    email,
    password
  })
}

export const register = async (data) => {
  return await apiClient.post('/register', data)
}

export const checkAuth = async (token) => {
  return await apiClient.get('/user', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const resetPassword = async (data, token) => {
  return await apiClient.post('/reset-password', data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}