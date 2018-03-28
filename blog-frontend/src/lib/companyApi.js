import axios from 'axios'
import queryString from 'query-string'

export const writeCompany = ({ code }) => axios.post('/api/company', { code })
export const listCompany = ({ type, sortType, searchKeyword }) => axios.get(`/api/company/?${queryString.stringify({ type, sortType, searchKeyword })}`)