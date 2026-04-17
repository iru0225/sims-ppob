import axios from "axios"

const host = 'https://take-home-test-api.nutech-integrasi.com'

export const post = async <T>(path: string, payload: T, token?: string) => (await axios.post(
  `${host}/${path}`,
  payload,
  {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined
    }
  }
)).data

export const put = async <T>(path: string, payload: T, token?: string) => (await axios.post(
  `${host}/${path}`,
  payload,
  {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined
    }
  }
)).data

export const get = async <T>(path: string, options?: T) => (await axios.get(
  `${host}/${path}`,
  {
    ...options
  }
)).data