import axios from 'axios'
import { API_ROOT } from 'utillities/constants'

export const register = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/users/register`, data)
  return request.data
}

export const login = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/users/login`, data)
  return request.data
}

export const loginWithGoogle = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/users/auth/google`, data)
  return request.data
}

export const loginWithFaceBook = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/users/auth/facebook`, data)
  return request.data
}

export const getDashBoardUser = async (id) => {
  const request = await axios.get(`${API_ROOT}/v1/users/${id}/getDashBoard`)
  return request.data
}

export const createNewBoard = async (data) => {
  console.log(data)
  const request = await axios.post(`${API_ROOT}/v1/boards`, data)
  return request.data
}

export const updateBoard = async (id, data) => {
  const request = await axios.put(`${API_ROOT}/v1/boards/${id}`, data)
  return request.data
}

export const fetchBoardDetails = async (id) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${id}`)
  return request.data
}

export const createNewColumn = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/columns`, data)
  return request.data
}

// Update or remove a column
export const updateColumn = async (id, data) => {
  const request = await axios.put(`${API_ROOT}/v1/columns/${id}`, data)
  return request.data
}

export const createNewCard = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/cards`, data)
  return request.data
}

// Update or remove a card
export const updateCard = async (id, data) => {
  const request = await axios.put(`${API_ROOT}/v1/cards/${id}`, data)
  return request.data
}
