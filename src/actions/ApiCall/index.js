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

export const getFullUser= async (id) => {
  const request = await axios.get(`${API_ROOT}/v1/users/${id}`)
  return request.data
}

export const searchUsers= async (key) => {
  const request = await axios.get(`${API_ROOT}/v1/users/search/${key}`)
  return request.data
}

export const createNewWorkspace = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/workspaces`, data)
  return request.data
}

export const getFullWorkspace = async (wordspaceId, userId) => {
  const request = await axios.get(`${API_ROOT}/v1/workspaces/${wordspaceId}/${userId}`)
  return request.data
}

export const updateWorkspace = async (id, data) => {
  const request = await axios.put(`${API_ROOT}/v1/workspaces/${id}`, data)
  return request.data
}

export const getAllCardWorkpace = async (data) => {
  const request = await axios.post(`${API_ROOT}/v1/cards/getmany`, data)
  return request.data
}

export const createNewBoard = async (data) => {
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
